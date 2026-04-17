/**
 * Mock data layer for the Contra Community demo.
 *
 * Shape mirrors the eventual Supabase schema so the UI components
 * don't change when we swap `mockMembers` for `supabase.from('members').select()`.
 *
 * See /supabase/schema.sql for the corresponding DDL.
 */

// ── Types ──────────────────────────────────────────────────────────

export type MemberRole = 'admin' | 'host' | 'member';
export type MemberStatus = 'active' | 'inactive' | 'at_risk' | 'new';

export interface Member {
  id: string;
  full_name: string;
  initials: string;
  role: MemberRole;
  status: MemberStatus;
  joined_at: string;        // ISO
  last_active_at: string;   // ISO
  interests: string[];      // tag ids
  avatar_variant: 'green' | 'dark' | 'gray';
}

export interface Event {
  id: string;
  title: string;
  starts_at: string;        // ISO
  rsvp_count: number;
  likely_count: number;
  status: 'upcoming' | 'live' | 'past';
}

export interface Interaction {
  id: string;
  kind: 'dm' | 'meet' | 'reply' | 'rsvp';
  member_id: string;
  counterpart_id?: string;
  event_id?: string;
  at: string;               // ISO
  snippet?: string;
}

export interface EventConversation {
  event_id: string;
  event_title: string;
  thread_count: number;
  unanswered_count: number;
}

export interface InterestCluster {
  tag: string;
  label: string;
  member_count: number;
  // pct relative to community size — used to draw the bar width
  share: number;
}

export interface AttentionItem {
  id: string;
  severity: 'red' | 'yellow' | 'green';
  title: string;
  meta: string;
  action_label: string;
  action_prompt: string;
}

// ── Dummy data ──────────────────────────────────────────────────────

export const COMMUNITY = {
  name: 'Lisbon design collective',
  member_count: 1284,
  active_this_week: 412,
  active_delta: +18,
  new_connections: 87,
  events_driving: 3,
  at_risk: 23,
  open_conversations: 149,
  needs_reply: 12,
};

export const mockRecentConnections: Member[] = [
  {
    id: 'm_1',
    full_name: 'Maya Rodriguez',
    initials: 'MR',
    role: 'member',
    status: 'active',
    joined_at: '2024-08-12',
    last_active_at: '2026-04-16T09:22:00Z',
    interests: ['generative_ai', 'brand'],
    avatar_variant: 'green',
  },
  {
    id: 'm_2',
    full_name: 'João Teixeira',
    initials: 'JT',
    role: 'host',
    status: 'active',
    joined_at: '2023-11-02',
    last_active_at: '2026-04-15T18:40:00Z',
    interests: ['type', 'brand'],
    avatar_variant: 'dark',
  },
  {
    id: 'm_3',
    full_name: 'Aisha Khan',
    initials: 'AK',
    role: 'member',
    status: 'active',
    joined_at: '2025-02-20',
    last_active_at: '2026-04-17T08:10:00Z',
    interests: ['freelance_ops'],
    avatar_variant: 'gray',
  },
  {
    id: 'm_4',
    full_name: 'Liam Sørensen',
    initials: 'LS',
    role: 'member',
    status: 'active',
    joined_at: '2025-09-01',
    last_active_at: '2026-04-17T06:05:00Z',
    interests: ['generative_ai'],
    avatar_variant: 'green',
  },
  {
    id: 'm_5',
    full_name: 'Priya Venkatesh',
    initials: 'PV',
    role: 'member',
    status: 'new',
    joined_at: '2026-04-14',
    last_active_at: '2026-04-16T21:15:00Z',
    interests: ['type', 'generative_ai'],
    avatar_variant: 'dark',
  },
];

export const mockInterests: InterestCluster[] = [
  { tag: 'generative_ai', label: 'Generative AI', member_count: 142, share: 0.85 },
  { tag: 'type', label: 'Type design', member_count: 98, share: 0.60 },
  { tag: 'freelance_ops', label: 'Freelance ops', member_count: 71, share: 0.45 },
  { tag: 'brand', label: 'Brand strategy', member_count: 54, share: 0.32 },
];

export const mockConversations: EventConversation[] = [
  { event_id: 'e_1', event_title: 'AI x design meetup', thread_count: 34, unanswered_count: 8 },
  { event_id: 'e_2', event_title: 'Porto portfolio night', thread_count: 19, unanswered_count: 2 },
  { event_id: 'e_3', event_title: 'Freelance pricing AMA', thread_count: 47, unanswered_count: 2 },
  { event_id: 'e_4', event_title: 'Type Thursdays', thread_count: 49, unanswered_count: 0 },
];

export const mockUpcomingEvents: Event[] = [
  { id: 'e_1', title: 'AI x design meetup', starts_at: '2026-04-22T18:00:00Z', rsvp_count: 48, likely_count: 12, status: 'upcoming' },
  { id: 'e_3', title: 'Freelance pricing AMA', starts_at: '2026-04-29T17:00:00Z', rsvp_count: 31, likely_count: 22, status: 'upcoming' },
  { id: 'e_2', title: 'Porto portfolio night', starts_at: '2026-05-06T19:30:00Z', rsvp_count: 19, likely_count: 8, status: 'upcoming' },
];

export const mockAttention: AttentionItem[] = [
  {
    id: 'a_1',
    severity: 'red',
    title: '23 members inactive for 30+ days',
    meta: 'Draft a re-engagement message',
    action_label: 'Draft',
    action_prompt: 'Draft re-engagement message for at-risk members',
  },
  {
    id: 'a_2',
    severity: 'yellow',
    title: '12 messages unanswered > 48h',
    meta: 'Review and reply from the queue',
    action_label: 'Review',
    action_prompt: 'Open unanswered message queue',
  },
  {
    id: 'a_3',
    severity: 'green',
    title: '7 new members joined this week',
    meta: 'Send the welcome sequence',
    action_label: 'Welcome',
    action_prompt: 'Trigger welcome sequence for new members',
  },
];
