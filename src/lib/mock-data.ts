/**
 * Mock data layer for the Contra Community demo.
 * Every page reads from this file. Shape mirrors the future Supabase schema.
 */

// ── Shared types ────────────────────────────────────────────────────

export type MemberRole = 'admin' | 'host' | 'member';
export type MemberStatus = 'active' | 'inactive' | 'at_risk' | 'new';
export type MemberTier = 'founding' | 'premium' | 'standard' | 'waitlist';
export type AvatarVariant = 'green' | 'dark' | 'gray';

export interface Member {
  id: string;
  full_name: string;
  initials: string;
  role: MemberRole;
  status: MemberStatus;
  tier: MemberTier;
  city: string;
  joined_at: string;
  last_active_at: string;
  interests: string[];
  events_attended: number;
  connections: number;
  avatar_variant: AvatarVariant;
  title?: string;
  company?: string;
}

export type ApplicationStatus = 'pending' | 'in_review' | 'approved' | 'waitlisted' | 'declined';

export interface Application {
  id: string;
  applicant_name: string;
  initials: string;
  email: string;
  city: string;
  referred_by?: string;
  applied_at: string;
  status: ApplicationStatus;
  why_joining: string;
  follower_count?: number;
  verified: boolean;
  tier_requested: MemberTier;
}

export type EventStatus = 'draft' | 'upcoming' | 'live' | 'past' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  venue: string;
  city: string;
  capacity: number;
  rsvp_count: number;
  confirmed_count: number;
  checked_in_count?: number;
  likely_count: number;
  status: EventStatus;
  ticket_price_cents?: number;
  cover_color: string;
  host_name: string;
  tags: string[];
  tier_access: MemberTier[];
  slug?: string;
  cover_image?: string;
  location?: string;
  hosts?: { name: string; avatar?: string }[];
  time_label?: string;
  summary?: string;
}

export interface Ticket {
  id: string;
  event_id: string;
  member_id: string;
  member_name: string;
  member_initials: string;
  tier: MemberTier;
  tier_ticket: 'general' | 'premium' | 'founding_comp';
  status: 'confirmed' | 'checked_in' | 'no_show' | 'cancelled' | 'refunded';
  qr_code: string;
  purchased_at: string;
  checked_in_at?: string;
  plus_one: boolean;
}

export type VendorCategory = 'press' | 'venues' | 'brands' | 'entertainment' | 'photography' | 'staffing';

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  city: string;
  contact_name: string;
  contact_email: string;
  rating: number;
  events_worked: number;
  rate_description: string;
  status: 'active' | 'paused' | 'vetting';
  tags: string[];
  logo_initials: string;
}

export interface ContentAsset {
  id: string;
  event_id: string;
  event_title: string;
  kind: 'photo_gallery' | 'recap_video' | 'press_clip' | 'social_post';
  title: string;
  published_at?: string;
  scheduled_for?: string;
  status: 'draft' | 'scheduled' | 'published';
  views: number;
  shares: number;
  cover_color: string;
  author: string;
}

export interface Broadcast {
  id: string;
  channel: 'email' | 'sms' | 'push';
  subject: string;
  sent_at?: string;
  scheduled_for?: string;
  audience: string;
  audience_size: number;
  status: 'draft' | 'scheduled' | 'sent';
  open_rate?: number;
  click_rate?: number;
}

export interface Thread {
  id: string;
  event_id: string;
  event_title: string;
  starter_name: string;
  starter_initials: string;
  starter_variant: AvatarVariant;
  subject: string;
  snippet: string;
  reply_count: number;
  unanswered: boolean;
  last_message_at: string;
}

export type AlertSeverity = 'red' | 'yellow' | 'green';

export interface AttentionItem {
  id: string;
  severity: AlertSeverity;
  title: string;
  meta: string;
  action_label: string;
  action_prompt: string;
}

export interface InterestCluster {
  tag: string;
  label: string;
  member_count: number;
  share: number;
}

export interface EventConversation {
  event_id: string;
  event_title: string;
  thread_count: number;
  unanswered_count: number;
}

// ── Community meta ──────────────────────────────────────────────────

export const COMMUNITY = {
  name: 'CONTRA — global',
  member_count: 1284,
  active_this_week: 412,
  active_delta: +18,
  new_connections: 87,
  events_driving: 4,
  at_risk: 23,
  open_conversations: 149,
  needs_reply: 12,
  pending_applications: 34,
  waitlist_count: 127,
  upcoming_event_count: 8,
  vendor_count: 46,
};

// ── Helpers ─────────────────────────────────────────────────────────

export function formatTierLabel(tier: MemberTier): string {
  return tier === 'founding' ? 'Founding'
    : tier === 'premium'    ? 'Premium'
    : tier === 'standard'   ? 'Standard'
    : 'Waitlist';
}

export function formatCurrency(cents: number): string {
  return `€${(cents / 100).toFixed(0)}`;
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatFullDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.round(ms / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}

// ── Members ─────────────────────────────────────────────────────────

export const mockMembers: Member[] = [
  { id: 'm_1',  full_name: 'Maya Rodriguez',   initials: 'MR', role: 'member', status: 'active',   tier: 'premium',  city: 'Lisbon', joined_at: '2024-08-12', last_active_at: '2026-04-16T09:22:00Z', interests: ['generative_ai', 'brand'],          events_attended: 14, connections: 42,  avatar_variant: 'green', title: 'Design Director',        company: 'Studio Anomalia' },
  { id: 'm_2',  full_name: 'João Teixeira',    initials: 'JT', role: 'host',   status: 'active',   tier: 'founding', city: 'Porto',  joined_at: '2023-11-02', last_active_at: '2026-04-15T18:40:00Z', interests: ['type', 'brand'],                    events_attended: 28, connections: 89,  avatar_variant: 'dark',  title: 'Founder',                company: 'Teixeira Type' },
  { id: 'm_3',  full_name: 'Aisha Khan',       initials: 'AK', role: 'member', status: 'active',   tier: 'premium',  city: 'Lisbon', joined_at: '2025-02-20', last_active_at: '2026-04-17T08:10:00Z', interests: ['freelance_ops'],                    events_attended: 9,  connections: 27,  avatar_variant: 'gray',  title: 'Freelance Product Designer' },
  { id: 'm_4',  full_name: 'Liam Sørensen',    initials: 'LS', role: 'member', status: 'active',   tier: 'standard', city: 'Lisbon', joined_at: '2025-09-01', last_active_at: '2026-04-17T06:05:00Z', interests: ['generative_ai'],                    events_attended: 6,  connections: 18,  avatar_variant: 'green', title: 'ML Engineer',            company: 'Unbabel' },
  { id: 'm_5',  full_name: 'Priya Venkatesh',  initials: 'PV', role: 'member', status: 'new',      tier: 'standard', city: 'Lisbon', joined_at: '2026-04-14', last_active_at: '2026-04-16T21:15:00Z', interests: ['type', 'generative_ai'],            events_attended: 1,  connections: 3,   avatar_variant: 'dark',  title: 'Type designer' },
  { id: 'm_6',  full_name: 'Sofia Marques',    initials: 'SM', role: 'member', status: 'active',   tier: 'premium',  city: 'Lisbon', joined_at: '2024-03-10', last_active_at: '2026-04-16T14:30:00Z', interests: ['brand', 'freelance_ops'],           events_attended: 19, connections: 55,  avatar_variant: 'green', title: 'Brand Strategist',       company: 'Bench' },
  { id: 'm_7',  full_name: 'Rui Almeida',      initials: 'RA', role: 'member', status: 'at_risk',  tier: 'standard', city: 'Porto',  joined_at: '2024-01-18', last_active_at: '2026-03-08T10:00:00Z', interests: ['type'],                              events_attended: 4,  connections: 11,  avatar_variant: 'gray',  title: 'UX Researcher' },
  { id: 'm_8',  full_name: 'Camila Santos',    initials: 'CS', role: 'member', status: 'active',   tier: 'founding', city: 'Lisbon', joined_at: '2023-06-05', last_active_at: '2026-04-17T07:50:00Z', interests: ['generative_ai', 'brand'],           events_attended: 34, connections: 112, avatar_variant: 'dark',  title: 'Creative Director',      company: 'Bardo' },
  { id: 'm_9',  full_name: 'Tomás Ferreira',   initials: 'TF', role: 'member', status: 'active',   tier: 'standard', city: 'Lisbon', joined_at: '2025-05-22', last_active_at: '2026-04-16T22:45:00Z', interests: ['freelance_ops', 'brand'],           events_attended: 7,  connections: 21,  avatar_variant: 'green', title: 'Independent Designer' },
  { id: 'm_10', full_name: 'Elena Chen',       initials: 'EC', role: 'member', status: 'inactive', tier: 'standard', city: 'Madrid', joined_at: '2024-07-30', last_active_at: '2026-02-15T12:00:00Z', interests: ['type'],                              events_attended: 3,  connections: 8,   avatar_variant: 'gray',  title: 'Graphic Designer' },
  { id: 'm_11', full_name: 'Henrique Dias',    initials: 'HD', role: 'member', status: 'active',   tier: 'premium',  city: 'Lisbon', joined_at: '2024-11-08', last_active_at: '2026-04-17T05:20:00Z', interests: ['generative_ai', 'freelance_ops'],   events_attended: 12, connections: 38,  avatar_variant: 'green', title: 'Product Designer',       company: 'Feedzai' },
  { id: 'm_12', full_name: 'Nadia Oliveira',   initials: 'NO', role: 'admin',  status: 'active',   tier: 'founding', city: 'Lisbon', joined_at: '2023-01-15', last_active_at: '2026-04-17T09:00:00Z', interests: ['brand', 'generative_ai'],           events_attended: 47, connections: 203, avatar_variant: 'dark',  title: 'Community Lead',         company: 'Contra' },
];

export const mockRecentConnections: Member[] = [
  mockMembers[0], mockMembers[1], mockMembers[2], mockMembers[3], mockMembers[4],
];

// ── Interests ───────────────────────────────────────────────────────

export const mockInterests: InterestCluster[] = [
  { tag: 'film_tv',          label: 'Film & TV',          member_count: 164, share: 0.85 },
  { tag: 'nightlife_music',  label: 'Nightlife & music',  member_count: 118, share: 0.62 },
  { tag: 'fashion',          label: 'Fashion',            member_count: 89,  share: 0.47 },
  { tag: 'founders_vc',      label: 'Founders & VC',      member_count: 61,  share: 0.32 },
];

// ── Applications ────────────────────────────────────────────────────

export const mockApplications: Application[] = [
  { id: 'a_1', applicant_name: 'Catarina Lopes',  initials: 'CL', email: 'c.lopes@studio.pt',     city: 'Lisbon', referred_by: 'Maya Rodriguez', applied_at: '2026-04-16T09:00:00Z', status: 'pending',    why_joining: 'Looking to connect with independent designers in the Lisbon scene',     follower_count: 4200,  verified: true,  tier_requested: 'premium' },
  { id: 'a_2', applicant_name: 'Bruno Carvalho',  initials: 'BC', email: 'bruno@carvalho.design', city: 'Porto',                                 applied_at: '2026-04-15T14:30:00Z', status: 'in_review',  why_joining: 'Running a type foundry and want to meet more type designers',           follower_count: 1800,  verified: false, tier_requested: 'standard' },
  { id: 'a_3', applicant_name: 'Isabella Rossi',  initials: 'IR', email: 'bella.rossi@gmail.com', city: 'Lisbon', referred_by: 'Camila Santos',  applied_at: '2026-04-14T18:00:00Z', status: 'approved',   why_joining: 'Recently moved from Milan, looking to find my people in creative tech', follower_count: 12000, verified: true,  tier_requested: 'premium' },
  { id: 'a_4', applicant_name: 'Marco Pereira',   initials: 'MP', email: 'marco@peppers.co',      city: 'Lisbon',                                applied_at: '2026-04-13T10:15:00Z', status: 'waitlisted', why_joining: 'Agency director, interested in the AI x design programming',            follower_count: 890,   verified: false, tier_requested: 'standard' },
  { id: 'a_5', applicant_name: 'Yasmin El-Sayed', initials: 'YS', email: 'yasmin@typesetting.co', city: 'Cairo',                                 applied_at: '2026-04-12T11:45:00Z', status: 'pending',    why_joining: 'Visiting Lisbon monthly for work and want to integrate with the community',follower_count: 6300, verified: true,  tier_requested: 'premium' },
  { id: 'a_6', applicant_name: 'Diego Fernández', initials: 'DF', email: 'diego.f@pm.me',         city: 'Madrid', referred_by: 'João Teixeira',  applied_at: '2026-04-11T17:20:00Z', status: 'in_review',  why_joining: 'Long-time follower of the community, finally making the jump',          follower_count: 2100,  verified: false, tier_requested: 'standard' },
  { id: 'a_7', applicant_name: 'Anna Kowalski',   initials: 'AK', email: 'anna@kowalski.studio',  city: 'Lisbon',                                applied_at: '2026-04-10T08:30:00Z', status: 'declined',   why_joining: 'Marketing for a crypto startup looking for design partnerships',         follower_count: 300,   verified: false, tier_requested: 'standard' },
  { id: 'a_8', applicant_name: 'Ricardo Monteiro',initials: 'RM', email: 'ricardo@bench.pt',      city: 'Lisbon', referred_by: 'Sofia Marques',  applied_at: '2026-04-09T15:00:00Z', status: 'approved',   why_joining: 'VP of Design at Bench, eager to contribute and mentor',                  follower_count: 8500,  verified: true,  tier_requested: 'premium' },
];

// ── Events ──────────────────────────────────────────────────────────

export const mockUpcomingEvents: Event[] = [
  {
    id: 'e_nylon_coachella',
    slug: 'nylon-house-coachella-2026-contra-guestlist',
    title: 'NYLON House Coachella 2026',
    starts_at: '2026-04-10T22:30:00Z',
    time_label: 'FRI APR 10 / 10:30 — LATE',
    rsvp_count: 182,
    likely_count: 140,
    status: 'upcoming',
    cover_image: '/events/nylon-coachella.jpg',
    location: 'Coachella, CA',
    hosts: [{ name: 'NYLON', avatar: '/events/hosts/nylon.jpg' }],
    summary: 'Exclusive CONTRA guestlist. DIPLO b2b HUGEL.',
    ends_at: '2026-04-11T06:00:00Z',
    venue: 'NYLON House',
    city: 'Coachella',
    capacity: 500,
    confirmed_count: 182,
    cover_color: 'dark',
    host_name: 'NYLON',
    tags: ['nightlife', 'music', 'festival'],
    tier_access: ['founding', 'premium', 'standard'],
  },
  {
    id: 'e_into_the_night',
    slug: 'into-the-night-april-11',
    title: '...into the night.',
    starts_at: '2026-04-11T21:15:00Z',
    time_label: 'SAT APR 11 / 9:15 PM — 3:30 AM',
    rsvp_count: 410,
    likely_count: 406,
    status: 'upcoming',
    cover_image: '/events/into-the-night.jpg',
    location: '78 Leonard St, New York, NY',
    hosts: [
      { name: 'William Etundi Jr.', avatar: '/events/hosts/william-etundi.jpg' },
      { name: 'CX', avatar: '/events/hosts/cx.jpg' },
    ],
    summary: 'Intimate Tribeca preview — performances and DJs until late.',
    ends_at: '2026-04-12T03:30:00Z',
    venue: '78 Leonard St',
    city: 'New York',
    capacity: 500,
    confirmed_count: 410,
    cover_color: 'dark',
    host_name: 'William Etundi Jr.',
    tags: ['nightlife', 'performance'],
    tier_access: ['founding', 'premium', 'standard'],
  },
  {
    id: 'e_scarface_basel',
    slug: 'icons-scarface-mansion-vip',
    title: 'Scarface Basel x N3ON',
    starts_at: '2025-12-07T23:00:00Z',
    time_label: 'SUN DEC 7 / 6 — 10 PM',
    rsvp_count: 240,
    likely_count: 198,
    status: 'upcoming',
    cover_image: '/events/scarface-basel.jpg',
    location: '485 W Matheson Dr, Key Biscayne, FL',
    hosts: [
      { name: 'MXU Agency', avatar: '/events/hosts/mxu-agency.jpg' },
      { name: 'John Devaney' },
    ],
    summary: 'Miami Art Week soirée at the iconic Scarface Mansion.',
    ends_at: '2025-12-08T03:00:00Z',
    venue: 'Scarface Mansion',
    city: 'Key Biscayne',
    capacity: 300,
    confirmed_count: 240,
    cover_color: 'cream',
    host_name: 'MXU Agency',
    tags: ['art-week', 'miami'],
    tier_access: ['founding', 'premium', 'standard'],
  },
  {
    id: 'e_rummiklub',
    slug: 'rummi',
    title: "RummiKlubLA x Craig's",
    starts_at: '2025-09-30T19:30:00Z',
    time_label: 'TUE SEP 30 / 7:30 — 10:30 PM',
    rsvp_count: 70,
    likely_count: 66,
    status: 'upcoming',
    cover_image: '/events/rummiklub.jpg',
    location: '8826 Melrose Ave, West Hollywood, CA',
    hosts: [{ name: 'Marnie Wekselblatt', avatar: '/events/hosts/marnie.jpg' }],
    summary: 'Curated game night. Rummikub matches, $52 ticket.',
    ends_at: '2025-09-30T22:30:00Z',
    venue: "Craig's",
    city: 'West Hollywood',
    capacity: 80,
    confirmed_count: 70,
    ticket_price_cents: 5200,
    cover_color: 'green',
    host_name: 'Marnie Wekselblatt',
    tags: ['game-night', 'social'],
    tier_access: ['founding', 'premium', 'standard'],
  },
];

export const mockPastEvents: Event[] = [
  { id: 'p_1', title: 'AI x design — March',       starts_at: '2026-03-25T18:00:00Z', ends_at: '2026-03-25T21:30:00Z', venue: 'Lisbon Hub',  city: 'Lisbon', capacity: 80,  rsvp_count: 78,  confirmed_count: 72,  checked_in_count: 64,  likely_count: 72,  status: 'past', ticket_price_cents: 0,    cover_color: 'green', host_name: 'João Teixeira',  tags: ['AI', 'recap'],         tier_access: ['founding', 'premium', 'standard'] },
  { id: 'p_2', title: 'Brand strategy roundtable', starts_at: '2026-03-12T17:00:00Z', ends_at: '2026-03-12T19:00:00Z', venue: 'Bench HQ',    city: 'Lisbon', capacity: 30,  rsvp_count: 28,  confirmed_count: 26,  checked_in_count: 24,  likely_count: 26,  status: 'past', ticket_price_cents: 0,    cover_color: 'dark',  host_name: 'Sofia Marques',   tags: ['brand', 'roundtable'], tier_access: ['founding', 'premium'] },
  { id: 'p_3', title: 'Spring opening party',      starts_at: '2026-03-01T20:00:00Z', ends_at: '2026-03-02T02:00:00Z', venue: 'LX Factory',  city: 'Lisbon', capacity: 200, rsvp_count: 187, confirmed_count: 176, checked_in_count: 152, likely_count: 176, status: 'past', ticket_price_cents: 2500, cover_color: 'cream', host_name: 'Nadia Oliveira',  tags: ['party', 'cultural'],   tier_access: ['founding', 'premium', 'standard'] },
];

// ── Tickets ─────────────────────────────────────────────────────────

export const mockTickets: Ticket[] = [
  { id: 't_1',  event_id: 'e_nylon_coachella', member_id: 'm_1',  member_name: 'Maya Rodriguez',  member_initials: 'MR', tier: 'premium',  tier_ticket: 'premium',       status: 'confirmed',  qr_code: 'CNTR-MR-0001', purchased_at: '2026-04-02T10:00:00Z', plus_one: false },
  { id: 't_2',  event_id: 'e_nylon_coachella', member_id: 'm_2',  member_name: 'João Teixeira',   member_initials: 'JT', tier: 'founding', tier_ticket: 'founding_comp', status: 'checked_in', qr_code: 'CNTR-JT-0002', purchased_at: '2026-04-02T10:15:00Z', checked_in_at: '2026-04-22T17:55:00Z', plus_one: false },
  { id: 't_3',  event_id: 'e_nylon_coachella', member_id: 'm_3',  member_name: 'Aisha Khan',      member_initials: 'AK', tier: 'premium',  tier_ticket: 'premium',       status: 'confirmed',  qr_code: 'CNTR-AK-0003', purchased_at: '2026-04-04T14:20:00Z', plus_one: true },
  { id: 't_4',  event_id: 'e_nylon_coachella', member_id: 'm_4',  member_name: 'Liam Sørensen',   member_initials: 'LS', tier: 'standard', tier_ticket: 'general',       status: 'confirmed',  qr_code: 'CNTR-LS-0004', purchased_at: '2026-04-05T11:00:00Z', plus_one: false },
  { id: 't_5',  event_id: 'e_nylon_coachella', member_id: 'm_5',  member_name: 'Priya Venkatesh', member_initials: 'PV', tier: 'standard', tier_ticket: 'general',       status: 'checked_in', qr_code: 'CNTR-PV-0005', purchased_at: '2026-04-14T20:00:00Z', checked_in_at: '2026-04-22T18:10:00Z', plus_one: false },
  { id: 't_6',  event_id: 'e_nylon_coachella', member_id: 'm_6',  member_name: 'Sofia Marques',   member_initials: 'SM', tier: 'premium',  tier_ticket: 'premium',       status: 'confirmed',  qr_code: 'CNTR-SM-0006', purchased_at: '2026-04-03T16:40:00Z', plus_one: true },
  { id: 't_7',  event_id: 'e_nylon_coachella', member_id: 'm_8',  member_name: 'Camila Santos',   member_initials: 'CS', tier: 'founding', tier_ticket: 'founding_comp', status: 'checked_in', qr_code: 'CNTR-CS-0007', purchased_at: '2026-04-01T09:00:00Z', checked_in_at: '2026-04-22T18:02:00Z', plus_one: false },
  { id: 't_8',  event_id: 'e_nylon_coachella', member_id: 'm_9',  member_name: 'Tomás Ferreira',  member_initials: 'TF', tier: 'standard', tier_ticket: 'general',       status: 'cancelled',  qr_code: 'CNTR-TF-0008', purchased_at: '2026-04-06T13:00:00Z', plus_one: false },
  { id: 't_9',  event_id: 'e_nylon_coachella', member_id: 'm_11', member_name: 'Henrique Dias',   member_initials: 'HD', tier: 'premium',  tier_ticket: 'premium',       status: 'confirmed',  qr_code: 'CNTR-HD-0009', purchased_at: '2026-04-07T19:30:00Z', plus_one: false },
  { id: 't_10', event_id: 'e_nylon_coachella', member_id: 'm_12', member_name: 'Nadia Oliveira',  member_initials: 'NO', tier: 'founding', tier_ticket: 'founding_comp', status: 'checked_in', qr_code: 'CNTR-NO-0010', purchased_at: '2026-04-01T09:00:00Z', checked_in_at: '2026-04-22T17:45:00Z', plus_one: false },
];

// ── Vendors ─────────────────────────────────────────────────────────

export const mockVendors: Vendor[] = [
  { id: 'v_1',  name: "It's Nice That",          category: 'press',         city: 'London',  contact_name: 'Aled Smith',      contact_email: 'aled@itsnicethat.com',  rating: 5, events_worked: 3,  rate_description: 'Editorial coverage',        status: 'active',  tags: ['editorial', 'design'],     logo_initials: 'IT' },
  { id: 'v_2',  name: 'Observador — Culture',    category: 'press',         city: 'Lisbon',  contact_name: 'Joana Ferreira',  contact_email: 'joana.f@observador.pt', rating: 4, events_worked: 2,  rate_description: 'Contributed pieces',        status: 'active',  tags: ['portuguese', 'culture'],   logo_initials: 'OB' },
  { id: 'v_3',  name: 'Tech Monocle',            category: 'press',         city: 'Zurich',  contact_name: 'Maya Brandt',     contact_email: 'maya@monocle.com',      rating: 4, events_worked: 1,  rate_description: 'Feature consideration',     status: 'vetting', tags: ['international', 'tech'],   logo_initials: 'TM' },
  { id: 'v_4',  name: 'LX Factory',              category: 'venues',        city: 'Lisbon',  contact_name: 'Nuno Martins',    contact_email: 'events@lxfactory.com',  rating: 5, events_worked: 8,  rate_description: '€1,500–€4,500 / night',     status: 'active',  tags: ['warehouse', 'industrial'], logo_initials: 'LX' },
  { id: 'v_5',  name: 'Casa da Música',          category: 'venues',        city: 'Porto',   contact_name: 'Helena Costa',    contact_email: 'hello@casadamusica.com',rating: 5, events_worked: 3,  rate_description: '€2,800+ / night',           status: 'active',  tags: ['iconic', 'acoustic'],      logo_initials: 'CM' },
  { id: 'v_6',  name: 'Atelier Contramão',       category: 'venues',        city: 'Lisbon',  contact_name: 'Pedro Sousa',     contact_email: 'pedro@contramao.pt',    rating: 4, events_worked: 11, rate_description: '€600–€1,200 / evening',     status: 'active',  tags: ['intimate', 'creative'],    logo_initials: 'AC' },
  { id: 'v_7',  name: 'Taberna Rua das Flores',  category: 'venues',        city: 'Lisbon',  contact_name: 'António Pereira', contact_email: 'reservas@taberna.pt',   rating: 5, events_worked: 4,  rate_description: 'Private buyout €3,200',     status: 'active',  tags: ['dining', 'private'],       logo_initials: 'TF' },
  { id: 'v_8',  name: 'Bench',                   category: 'brands',        city: 'Lisbon',  contact_name: 'Sofia Marques',   contact_email: 'sofia@bench.pt',        rating: 5, events_worked: 5,  rate_description: 'Partnership / sponsorship', status: 'active',  tags: ['sponsor', 'design'],       logo_initials: 'BN' },
  { id: 'v_9',  name: 'Unbabel',                 category: 'brands',        city: 'Lisbon',  contact_name: 'Carlos Dias',     contact_email: 'carlos@unbabel.com',    rating: 4, events_worked: 2,  rate_description: 'Tech sponsor',              status: 'active',  tags: ['sponsor', 'AI'],           logo_initials: 'UB' },
  { id: 'v_10', name: 'Adobe',                   category: 'brands',        city: 'Remote',  contact_name: 'Julia Tan',       contact_email: 'jtan@adobe.com',        rating: 4, events_worked: 1,  rate_description: 'Global sponsor',            status: 'vetting', tags: ['sponsor', 'tools'],        logo_initials: 'AD' },
  { id: 'v_11', name: 'DJ Violet Moss',          category: 'entertainment', city: 'Lisbon',  contact_name: 'Violet Moss',     contact_email: 'book@violetmoss.com',   rating: 5, events_worked: 6,  rate_description: '€600 / 4hr set',            status: 'active',  tags: ['dj', 'house'],             logo_initials: 'VM' },
  { id: 'v_12', name: 'Quarteto Lisboa',         category: 'entertainment', city: 'Lisbon',  contact_name: 'Margarida Vaz',   contact_email: 'quarteto@lisboa.pt',    rating: 5, events_worked: 2,  rate_description: '€1,200 / performance',      status: 'active',  tags: ['live', 'classical'],       logo_initials: 'QL' },
  { id: 'v_13', name: 'Improv Lisboa',           category: 'entertainment', city: 'Lisbon',  contact_name: 'Rafael Torres',   contact_email: 'rafa@improv.pt',        rating: 4, events_worked: 1,  rate_description: '€400 / session',            status: 'paused',  tags: ['performance'],             logo_initials: 'IL' },
  { id: 'v_14', name: 'Marco Almeida Photo',     category: 'photography',   city: 'Lisbon',  contact_name: 'Marco Almeida',   contact_email: 'marco@almeida.photo',   rating: 5, events_worked: 9,  rate_description: '€450 / event',              status: 'active',  tags: ['documentary'],             logo_initials: 'MA' },
  { id: 'v_15', name: 'Estúdio Prisma',          category: 'photography',   city: 'Porto',   contact_name: 'Beatriz Lima',    contact_email: 'beatriz@prisma.pt',     rating: 4, events_worked: 3,  rate_description: '€600 / event',              status: 'active',  tags: ['editorial'],               logo_initials: 'EP' },
  { id: 'v_16', name: 'Silver Light Collective', category: 'photography',   city: 'Madrid',  contact_name: 'Iker Santos',     contact_email: 'iker@silverlight.es',   rating: 4, events_worked: 1,  rate_description: '€800 / event + travel',     status: 'vetting', tags: ['international'],           logo_initials: 'SL' },
  { id: 'v_17', name: 'Host & Co',               category: 'staffing',      city: 'Lisbon',  contact_name: 'Daniela Costa',   contact_email: 'daniela@hostco.pt',     rating: 5, events_worked: 12, rate_description: '€22/hr per host',           status: 'active',  tags: ['hosts', 'check-in'],       logo_initials: 'HC' },
  { id: 'v_18', name: 'Barback Atelier',         category: 'staffing',      city: 'Lisbon',  contact_name: 'Gabriel Ramos',   contact_email: 'gabriel@barback.pt',    rating: 5, events_worked: 7,  rate_description: '€25/hr per bartender',      status: 'active',  tags: ['bar', 'cocktails'],        logo_initials: 'BA' },
  { id: 'v_19', name: 'Security Lisboa',         category: 'staffing',      city: 'Lisbon',  contact_name: 'Tiago Ribeiro',   contact_email: 'tiago@seclx.pt',        rating: 4, events_worked: 4,  rate_description: '€28/hr per officer',        status: 'active',  tags: ['security', 'crowd'],       logo_initials: 'SL' },
];

export const vendorCategoryLabels: Record<VendorCategory, string> = {
  press: 'Press',
  venues: 'Venues',
  brands: 'Brands',
  entertainment: 'Entertainment',
  photography: 'Photography',
  staffing: 'Staffing',
};

// ── Content ─────────────────────────────────────────────────────────

export const mockContent: ContentAsset[] = [
  { id: 'c_1', event_id: 'p_1', event_title: 'AI x design — March',       kind: 'photo_gallery', title: 'March meetup — full gallery (84 photos)',      published_at: '2026-03-27T10:00:00Z', status: 'published', views: 3420,  shares: 127, cover_color: 'green', author: 'Marco Almeida Photo' },
  { id: 'c_2', event_id: 'p_1', event_title: 'AI x design — March',       kind: 'recap_video',   title: 'AI x design recap — 90 seconds',               published_at: '2026-03-29T14:00:00Z', status: 'published', views: 5210,  shares: 288, cover_color: 'dark',  author: 'Estúdio Prisma' },
  { id: 'c_3', event_id: 'p_1', event_title: 'AI x design — March',       kind: 'press_clip',    title: "It's Nice That — The Lisbon AI design circle", published_at: '2026-04-02T09:30:00Z', status: 'published', views: 8900,  shares: 512, cover_color: 'cream', author: "It's Nice That" },
  { id: 'c_4', event_id: 'p_2', event_title: 'Brand strategy roundtable', kind: 'photo_gallery', title: 'Roundtable — highlights',                      published_at: '2026-03-14T11:00:00Z', status: 'published', views: 1240,  shares: 45,  cover_color: 'green', author: 'Marco Almeida Photo' },
  { id: 'c_5', event_id: 'p_2', event_title: 'Brand strategy roundtable', kind: 'social_post',   title: 'Instagram carousel — 6 slides',                 published_at: '2026-03-15T18:00:00Z', status: 'published', views: 12400, shares: 340, cover_color: 'dark',  author: 'Nadia Oliveira' },
  { id: 'c_6', event_id: 'p_3', event_title: 'Spring opening party',      kind: 'photo_gallery', title: 'Spring party — 240 photos',                    published_at: '2026-03-03T08:00:00Z', status: 'published', views: 9800,  shares: 410, cover_color: 'cream', author: 'Marco Almeida Photo' },
  { id: 'c_7', event_id: 'p_3', event_title: 'Spring opening party',      kind: 'recap_video',   title: 'Spring party aftermovie',                      published_at: '2026-03-05T16:00:00Z', status: 'published', views: 14600, shares: 620, cover_color: 'dark',  author: 'Estúdio Prisma' },
  { id: 'c_8', event_id: 'e_nylon_coachella', event_title: 'AI x design meetup',        kind: 'social_post',   title: 'Pre-event teaser — reel',                                                               scheduled_for: '2026-04-20T09:00:00Z', status: 'scheduled', views: 0, shares: 0, cover_color: 'green', author: 'Nadia Oliveira' },
  { id: 'c_9', event_id: 'e_nylon_coachella', event_title: 'AI x design meetup',        kind: 'press_clip',    title: 'Observador preview piece — draft',                                                                                                                          status: 'draft',     views: 0, shares: 0, cover_color: 'cream', author: 'Observador — Culture' },
];

// ── Broadcasts ──────────────────────────────────────────────────────

export const mockBroadcasts: Broadcast[] = [
  { id: 'b_1', channel: 'email', subject: 'Your April invites — AI x design meetup', sent_at:       '2026-04-14T10:00:00Z', audience: 'All active members',    audience_size: 1089, status: 'sent',      open_rate: 0.62, click_rate: 0.21 },
  { id: 'b_2', channel: 'sms',   subject: 'Tomorrow: Porto portfolio night @ 19:30', scheduled_for: '2026-05-05T18:00:00Z', audience: 'Porto members + RSVPs', audience_size: 47,   status: 'scheduled' },
  { id: 'b_3', channel: 'email', subject: 'Welcome to Contra — your first 30 days',  sent_at:       '2026-04-15T09:00:00Z', audience: 'New members (last 7d)', audience_size: 7,    status: 'sent',      open_rate: 0.86, click_rate: 0.43 },
  { id: 'b_4', channel: 'push',  subject: '8 new threads since you last checked',    sent_at:       '2026-04-16T17:00:00Z', audience: 'At-risk members',       audience_size: 23,   status: 'sent',      open_rate: 0.35, click_rate: 0.09 },
  { id: 'b_5', channel: 'email', subject: 'Founding members dinner — save your seat',scheduled_for: '2026-05-07T10:00:00Z', audience: 'Founding tier',         audience_size: 24,   status: 'scheduled' },
  { id: 'b_6', channel: 'email', subject: 'Monthly recap — what you missed in March',                                       audience: 'All members',           audience_size: 1284, status: 'draft' },
];

// ── Threads ─────────────────────────────────────────────────────────

export const mockThreads: Thread[] = [
  { id: 'th_1', event_id: 'e_nylon_coachella', event_title: 'AI x design meetup',    starter_name: 'Maya Rodriguez',  starter_initials: 'MR', starter_variant: 'green', subject: 'Can anyone share their AI design ops workflow?', snippet: "I've been experimenting with Claude + Figma plugins and I'd love to compare notes...",          reply_count: 8,  unanswered: false, last_message_at: '2026-04-17T06:30:00Z' },
  { id: 'th_2', event_id: 'e_nylon_coachella', event_title: 'AI x design meetup',    starter_name: 'Priya Venkatesh', starter_initials: 'PV', starter_variant: 'dark',  subject: 'Will the talks be recorded?',                     snippet: "First-timer — wondering if the sessions will be available after.",                                reply_count: 0,  unanswered: true,  last_message_at: '2026-04-16T21:15:00Z' },
  { id: 'th_3', event_id: 'e_3', event_title: 'Freelance pricing AMA', starter_name: 'Aisha Khan',      starter_initials: 'AK', starter_variant: 'gray',  subject: 'Anyone have template for scope creep clauses?',    snippet: 'Need to renegotiate a contract and the scope has quietly doubled. Looking for contract language.', reply_count: 14, unanswered: false, last_message_at: '2026-04-17T08:10:00Z' },
  { id: 'th_4', event_id: 'e_3', event_title: 'Freelance pricing AMA', starter_name: 'Tomás Ferreira',  starter_initials: 'TF', starter_variant: 'green', subject: 'Hourly vs. value-based pricing for strategy work?',snippet: "Breaking into more strategic engagements and not sure how to price when outcomes are fuzzy.",      reply_count: 2,  unanswered: true,  last_message_at: '2026-04-15T22:00:00Z' },
  { id: 'th_5', event_id: 'e_2', event_title: 'Porto portfolio night', starter_name: 'João Teixeira',   starter_initials: 'JT', starter_variant: 'dark',  subject: 'Reminder: bring 3 pieces, no more, no less',       snippet: "Keeping the format tight this time — 3 pieces each, 5 min talking time.",                         reply_count: 6,  unanswered: false, last_message_at: '2026-04-16T09:00:00Z' },
  { id: 'th_6', event_id: 'e_6', event_title: 'Type Thursdays',        starter_name: 'Henrique Dias',   starter_initials: 'HD', starter_variant: 'green', subject: "Specimen swap — who's bringing what?",             snippet: "Let's not have five people bring the same Optima revival again. Drop what you're showing below.",   reply_count: 11, unanswered: false, last_message_at: '2026-04-17T07:00:00Z' },
];

export const mockConversations: EventConversation[] = [
  { event_id: 'e_nylon_coachella', event_title: 'NYLON House Coachella 2026', thread_count: 52, unanswered_count: 9 },
  { event_id: 'e_into_the_night',  event_title: '...into the night.',         thread_count: 47, unanswered_count: 4 },
  { event_id: 'e_scarface_basel',  event_title: 'Scarface Basel x N3ON',      thread_count: 38, unanswered_count: 2 },
  { event_id: 'e_rummiklub',       event_title: "RummiKlubLA x Craig's",      thread_count: 21, unanswered_count: 0 },
];

// ── Attention ───────────────────────────────────────────────────────

export const mockAttention: AttentionItem[] = [
  { id: 'at_1', severity: 'red',    title: '23 members inactive for 30+ days', meta: 'Draft a re-engagement message',    action_label: 'Draft',   action_prompt: 'Draft re-engagement message' },
  { id: 'at_2', severity: 'yellow', title: '12 messages unanswered > 48h',      meta: 'Review and reply from the queue',  action_label: 'Review',  action_prompt: 'Open unanswered message queue' },
  { id: 'at_3', severity: 'green',  title: '7 new members joined this week',    meta: 'Send the welcome sequence',        action_label: 'Welcome', action_prompt: 'Trigger welcome sequence' },
  { id: 'at_4', severity: 'yellow', title: '34 applications pending review',    meta: '8 have founding-member referrals', action_label: 'Review',  action_prompt: 'Open applications queue' },
];

// ── Analytics ───────────────────────────────────────────────────────

export const mockGrowth = [
  { label: 'Nov', members: 820,  events: 5 },
  { label: 'Dec', members: 905,  events: 7 },
  { label: 'Jan', members: 984,  events: 6 },
  { label: 'Feb', members: 1078, events: 8 },
  { label: 'Mar', members: 1186, events: 9 },
  { label: 'Apr', members: 1284, events: 8 },
];

export const mockTierDistribution = [
  { tier: 'founding' as MemberTier, count: 24,  share: 0.019 },
  { tier: 'premium'  as MemberTier, count: 312, share: 0.243 },
  { tier: 'standard' as MemberTier, count: 948, share: 0.738 },
];
