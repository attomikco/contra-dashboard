# Contra — Community Manager Dashboard

A Next.js + Supabase demo of the Contra community operations dashboard,
built on the **Attomik design system** (no hardcoded styles, all Attomik tokens and classes).

## What's in here

```
src/
├── app/
│   ├── globals.css          # imports theme.css + components.css, adds a few local helpers
│   ├── layout.tsx           # loads Barlow + DM Mono from Google Fonts
│   └── page.tsx             # the dashboard — composes all modules
├── components/
│   ├── Sidebar.tsx          # black sidebar with nav-item active states
│   ├── Topbar.tsx           # sticky topbar with search + CTAs
│   ├── KpiStrip.tsx         # 4 kpi-cards (first one uses .kpi-card.accent)
│   ├── SyncCommunityModule.tsx   # THE CENTERPIECE — 3-column sync view
│   ├── AttentionPanel.tsx   # "Needs your attention" triage list
│   └── UpcomingEventsPanel.tsx
├── lib/
│   └── mock-data.ts         # dummy data, shaped like the Supabase schema
└── styles/
    ├── theme.css            # Attomik tokens (single source of truth)
    └── components.css       # Attomik component classes
supabase/
└── schema.sql               # matching DDL + views for v_community_kpis, etc.
```

## Run it

```bash
pnpm install       # or npm install / yarn
pnpm dev           # http://localhost:3000
```

## The "Sync community" module

This is the proof-of-concept centerpiece. Three integrated views, one card:

1. **Recent connections** — who you've talked to in the last 7 days
   (DMs, meets, replies — ranked by interaction weight)
2. **Shared interests** — trending tags across the community, each bar
   representing the member count for that cluster
3. **Across events** — threads grouped by event, surfacing unanswered counts

All three read from the same underlying *member graph* (see `supabase/schema.sql`
for the `interactions` table that powers it).

## Swapping mock data for real Supabase

Every component imports from `@/lib/mock-data`. To go live:

1. Apply `supabase/schema.sql` to your Supabase project
2. Replace the exports in `lib/mock-data.ts` with Supabase queries:

```ts
// Before
export const COMMUNITY = { ... }

// After
export async function getCommunityKpis(communityId: string) {
  const { data } = await supabase
    .from('v_community_kpis')
    .select('*')
    .eq('community_id', communityId)
    .single();
  return data;
}
```

3. Convert `page.tsx` to `async` and await those calls

Component files never change — they receive props of the same shape.

## Design system rules (enforced)

Per `Attomik-New-Project-Guide.docx`:

- No hardcoded hex colors — all via `var(--accent)`, `var(--muted)`, etc.
- No hardcoded px font sizes — all via `var(--text-*)` / `var(--fs-*)`
- No spacing magic numbers — all via `var(--sp-*)`
- Minimum body text: `var(--text-base)` (16px)
- Component classes first: `.btn`, `.card`, `.badge`, `.kpi-card`, `.avatar`
- Dark surfaces use `--sidebar-bg`, `--dark-card`, `--dark-card-alt`

Local extensions in `src/app/globals.css` are additive only — they compose
Attomik tokens, never override them.
