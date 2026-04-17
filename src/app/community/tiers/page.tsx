import DashboardShell from '@/components/layout/DashboardShell';
import SectionHeader from '@/components/layout/SectionHeader';
import { Crown, Star, Users as UsersIcon, Hourglass } from 'lucide-react';
import { mockTierDistribution, mockMembers } from '@/lib/mock-data';

const tierDefs = [
  {
    key: 'founding',
    label: 'Founding',
    icon: Crown,
    blurb: 'Invitation-only. Original members who shaped the community.',
    perks: [
      'Complimentary access to all events',
      'Private founding-tier programming',
      'Early voice on direction and partnerships',
      'Unlimited +1 to social events',
    ],
    price: 'Invite only',
    accent: true,
  },
  {
    key: 'premium',
    label: 'Premium',
    icon: Star,
    blurb: 'Access to all public programming plus premium-only salons.',
    perks: [
      'All member events',
      'Premium-only roundtables & dinners',
      'Priority RSVP (48h head start)',
      'Quarterly 1:1 with a community lead',
    ],
    price: '€240 / year',
  },
  {
    key: 'standard',
    label: 'Standard',
    icon: UsersIcon,
    blurb: 'Full access to public programming and the community graph.',
    perks: [
      'All public member events',
      'Community directory access',
      'Interest-based matching',
      'Monthly newsletter',
    ],
    price: '€96 / year',
  },
  {
    key: 'waitlist',
    label: 'Waitlist',
    icon: Hourglass,
    blurb: 'Applied but awaiting a seat in the community.',
    perks: [
      'Access to public events (guest pass)',
      'Newsletter access',
      'Automatic consideration when seats open',
    ],
    price: 'Free',
    muted: true,
  },
];

export default function TiersPage() {
  return (
    <DashboardShell
      title="Tiers & access"
      subtitle={`${mockMembers.length} members across ${tierDefs.length} tiers`}
      actions={
        <>
          <button className="btn btn-secondary btn-sm">Tier history</button>
          <button className="btn btn-primary btn-sm">Create tier</button>
        </>
      }
    >
      {/* Distribution KPIs */}
      <div className="grid-3" style={{ marginBottom: 'var(--sp-6)' }}>
        {mockTierDistribution.map((d) => (
          <div key={d.tier} className="kpi-card">
            <div className="kpi-label">{d.tier}</div>
            <div className="kpi-value">{d.count.toLocaleString()}</div>
            <div className="kpi-sub">{(d.share * 100).toFixed(1)}% of community</div>
          </div>
        ))}
      </div>

      <SectionHeader title="Tier definitions" />

      {/* Tier cards */}
      <div className="grid-2" style={{ gap: 'var(--sp-5)' }}>
        {tierDefs.map((t) => {
          const Icon = t.icon;
          const cardClass = t.accent ? 'card card-dark' : t.muted ? 'card card-muted' : 'card';
          const textColor = t.accent ? 'var(--white-a90)' : 'var(--muted)';
          const headingColor = t.accent ? 'var(--paper)' : 'var(--ink)';
          return (
            <div key={t.key} className={cardClass} style={{ padding: 'var(--sp-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 'var(--r-sm)',
                  background: t.accent ? 'var(--paper)' : t.muted ? 'var(--paper)' : 'var(--ink)',
                  color: t.accent ? 'var(--ink)' : t.muted ? 'var(--muted)' : 'var(--paper)',
                  display: 'grid', placeItems: 'center', flexShrink: 0,
                }}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <h3 style={{ fontSize: 'var(--text-lg)', margin: 0, color: headingColor }}>
                  {t.label}
                </h3>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: t.accent ? 'var(--paper)' : 'var(--ink)',
                }}>
                  {t.price}
                </span>
              </div>

              <p style={{
                fontSize: 'var(--text-base)',
                color: textColor,
                lineHeight: 1.5,
                marginBottom: 'var(--sp-4)',
              }}>
                {t.blurb}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                {t.perks.map((perk, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 'var(--sp-2)',
                    fontSize: 'var(--text-sm)',
                    color: t.accent ? 'var(--white-a80)' : 'var(--ink)',
                  }}>
                    <span style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: t.accent ? 'var(--paper)' : 'var(--ink)',
                      marginTop: 8, flexShrink: 0,
                    }} />
                    {perk}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 'var(--sp-5)', display: 'flex', gap: 'var(--sp-2)' }}>
                <button className={t.accent ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}>
                  Edit tier
                </button>
                <button className={t.accent ? 'btn btn-ghost btn-sm' : 'btn btn-ghost btn-sm'} style={t.accent ? { color: 'var(--paper)' } : undefined}>
                  View members
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}
