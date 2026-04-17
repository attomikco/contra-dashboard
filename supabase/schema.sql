-- ============================================================
-- Contra Community — Supabase schema (v0)
-- Mirrors src/lib/mock-data.ts so the UI layer can swap from
-- mock queries to real queries without component changes.
-- ============================================================

-- Communities (multi-tenant)
create table if not exists communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

-- Members — the core entity
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references communities(id) on delete cascade,
  full_name text not null,
  initials text not null,
  email text,
  role text not null check (role in ('admin','host','member')),
  status text not null check (status in ('active','inactive','at_risk','new')),
  avatar_variant text default 'green' check (avatar_variant in ('green','dark','gray')),
  joined_at timestamptz default now(),
  last_active_at timestamptz default now()
);
create index if not exists idx_members_community on members(community_id);
create index if not exists idx_members_last_active on members(last_active_at desc);
create index if not exists idx_members_status on members(community_id, status);

-- Interest tags (many-to-many)
create table if not exists interests (
  id text primary key,
  label text not null
);

create table if not exists member_interests (
  member_id uuid not null references members(id) on delete cascade,
  interest_id text not null references interests(id) on delete cascade,
  primary key (member_id, interest_id)
);
create index if not exists idx_member_interests_interest on member_interests(interest_id);

-- Events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references communities(id) on delete cascade,
  title text not null,
  starts_at timestamptz not null,
  status text not null check (status in ('upcoming','live','past'))
);
create index if not exists idx_events_community_starts on events(community_id, starts_at);

-- RSVPs
create table if not exists event_rsvps (
  event_id uuid not null references events(id) on delete cascade,
  member_id uuid not null references members(id) on delete cascade,
  likely boolean default false,
  created_at timestamptz default now(),
  primary key (event_id, member_id)
);

-- Interactions — the backbone of the member graph
-- Every DM, reply, meet, RSVP becomes a weighted edge.
create table if not exists interactions (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references communities(id) on delete cascade,
  kind text not null check (kind in ('dm','meet','reply','rsvp')),
  member_id uuid not null references members(id) on delete cascade,
  counterpart_id uuid references members(id) on delete set null,
  event_id uuid references events(id) on delete set null,
  snippet text,
  weight smallint not null default 1,  -- dm=3, reply=2, rsvp=1
  at timestamptz default now()
);
create index if not exists idx_interactions_member_at on interactions(member_id, at desc);
create index if not exists idx_interactions_community_at on interactions(community_id, at desc);

-- Threads (for cross-event conversation tracking)
create table if not exists threads (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  subject text,
  reply_count int default 0,
  unanswered boolean default false,
  last_message_at timestamptz default now()
);
create index if not exists idx_threads_event on threads(event_id);

-- ── Views used by the dashboard ─────────────────────────────────

-- Rolled-up metric view — backs the KPI strip
create or replace view v_community_kpis as
select
  c.id as community_id,
  c.name,
  (select count(*) from members m where m.community_id = c.id) as member_count,
  (select count(*) from members m
    where m.community_id = c.id
      and m.last_active_at > now() - interval '7 days') as active_this_week,
  (select count(distinct i.counterpart_id) from interactions i
    where i.community_id = c.id
      and i.kind = 'meet'
      and i.at > now() - interval '7 days') as new_connections,
  (select count(*) from members m
    where m.community_id = c.id
      and m.last_active_at < now() - interval '30 days') as at_risk,
  (select count(*) from threads t
    join events e on e.id = t.event_id
    where e.community_id = c.id
      and t.unanswered = true) as needs_reply
from communities c;

-- Per-event thread summary — backs "Across events" column
create or replace view v_event_conversations as
select
  e.id as event_id,
  e.title as event_title,
  e.community_id,
  count(t.id) as thread_count,
  count(t.id) filter (where t.unanswered) as unanswered_count
from events e
left join threads t on t.event_id = e.id
group by e.id, e.title, e.community_id;

-- Interest distribution — backs the "Shared interests" column
create or replace view v_interest_clusters as
select
  m.community_id,
  i.id as tag,
  i.label,
  count(distinct mi.member_id) as member_count
from interests i
join member_interests mi on mi.interest_id = i.id
join members m on m.id = mi.member_id
group by m.community_id, i.id, i.label
order by member_count desc;
