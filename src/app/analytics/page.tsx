import DashboardShell from '@/components/layout/DashboardShell';
import SectionHeader from '@/components/layout/SectionHeader';
import { TrendingUp, Users as UsersIcon, Calendar } from 'lucide-react';
import {
  mockGrowth,
  mockTierDistribution,
  mockPastEvents,
  formatTierLabel,
  formatFullDate,
  type MemberTier,
} from '@/lib/mock-data';

const tierColor = (t: MemberTier) =>
  t === 'founding' ? 'var(--ink)'
  : t === 'premium'  ? 'var(--accent)'
  : t === 'standard' ? 'var(--muted)'
  : 'var(--border)';

export default function AnalyticsPage() {
  const maxMembers = Math.max(...mockGrowth.map((g) => g.members));
  const firstMonth = mockGrowth[0];
  const latestMonth = mockGrowth[mockGrowth.length - 1];
  const growthPct = Math.round(((latestMonth.members - firstMonth.members) / firstMonth.members) * 100);

  const topEvents = [...mockPastEvents].sort((a, b) => {
    const aRate = (a.checked_in_count ?? 0) / (a.confirmed_count || 1);
    const bRate = (b.checked_in_count ?? 0) / (b.confirmed_count || 1);
    return bRate - aRate;
  });

  const totalMembers = mockTierDistribution.reduce((a, t) => a + t.count, 0);

  return (
    <DashboardShell
      title="Analytics"
      subtitle="Member growth, tier distribution, and event performance over the last 6 months"
      actions={
        <>
          <button className="btn btn-secondary btn-sm">Custom range</button>
          <button className="btn btn-primary btn-sm">Export report</button>
        </>
      }
    >
      {/* Top KPIs */}
      <div className="grid-4" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="kpi-card accent">
          <div className="kpi-label">6-month growth</div>
          <div className="kpi-value">+{growthPct}%</div>
          <div className="kpi-sub" style={{ color: 'var(--white-a60)' }}>
            {firstMonth.members.toLocaleString()} → {latestMonth.members.toLocaleString()}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active members</div>
          <div className="kpi-value">1,089</div>
          <div className="kpi-sub">85% of total</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Events / month avg</div>
          <div className="kpi-value">7.2</div>
          <div className="kpi-sub">last 6 months</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. show rate</div>
          <div className="kpi-value">89%</div>
          <div className="kpi-sub">RSVPs → checked in</div>
        </div>
      </div>

      {/* Member growth chart */}
      <SectionHeader title="Member growth" />
      <div className="card" style={{ padding: 'var(--sp-6)', marginBottom: 'var(--sp-6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--sp-4)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, letterSpacing: '-0.04em' }}>
              {latestMonth.members.toLocaleString()}
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <TrendingUp size={14} color="var(--brand-green)" />
              <strong style={{ color: 'var(--brand-green)' }}>+{(latestMonth.members - mockGrowth[mockGrowth.length - 2].members)}</strong>
              since {mockGrowth[mockGrowth.length - 2].label}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--ink)' }} />
              Members
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent)' }} />
              Events hosted
            </div>
          </div>
        </div>

        {/* SVG bar chart */}
        <svg viewBox="0 0 720 240" style={{ width: '100%', height: 240 }}>
          {/* Gridlines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={40} x2={720}
              y1={40 + i * 40} y2={40 + i * 40}
              stroke="var(--border)"
              strokeWidth="1"
            />
          ))}
          {/* Y labels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const val = Math.round(maxMembers - (maxMembers / 4) * i);
            return (
              <text
                key={i}
                x={32} y={44 + i * 40}
                fontSize="11"
                fontFamily="var(--font-mono)"
                fill="var(--subtle)"
                textAnchor="end"
              >
                {val}
              </text>
            );
          })}

          {/* Member bars */}
          {mockGrowth.map((g, i) => {
            const barHeight = (g.members / maxMembers) * 160;
            const x = 60 + i * 110;
            const y = 200 - barHeight;
            return (
              <g key={g.label}>
                <rect
                  x={x} y={y}
                  width={44} height={barHeight}
                  fill="var(--ink)"
                  rx={2}
                />
                <rect
                  x={x + 50} y={200 - (g.events / 10) * 160}
                  width={16} height={(g.events / 10) * 160}
                  fill="var(--accent)"
                  rx={2}
                />
                <text
                  x={x + 30} y={220}
                  fontSize="12"
                  fontFamily="var(--font-sans)"
                  fontWeight="600"
                  fill="var(--muted)"
                  textAnchor="middle"
                >
                  {g.label}
                </text>
                <text
                  x={x + 22} y={y - 6}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fontWeight="700"
                  fill="var(--ink)"
                  textAnchor="middle"
                >
                  {g.members}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid-2" style={{ marginBottom: 'var(--sp-6)' }}>
        {/* Tier distribution */}
        <div>
          <SectionHeader title="Tier distribution" />
          <div className="card" style={{ padding: 'var(--sp-5)' }}>
            {mockTierDistribution.map((d) => (
              <div key={d.tier} style={{ marginBottom: 'var(--sp-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: tierColor(d.tier) }} />
                    {formatTierLabel(d.tier)}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
                    {d.count.toLocaleString()} · {(d.share * 100).toFixed(1)}%
                  </div>
                </div>
                <div style={{ height: 10, background: 'var(--cream)', borderRadius: 'var(--r-pill)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${d.share * 100}%`,
                    background: tierColor(d.tier),
                    borderRadius: 'var(--r-pill)',
                  }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: 'var(--sp-5)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Total members</span>
                <span style={{ fontSize: 'var(--text-xl)', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  {totalMembers.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top events */}
        <div>
          <SectionHeader title="Top events — show rate" />
          <div className="card" style={{ padding: 'var(--sp-5)' }}>
            {topEvents.map((ev, i) => {
              const rate = Math.round(((ev.checked_in_count ?? 0) / (ev.confirmed_count || 1)) * 100);
              return (
                <div
                  key={ev.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--sp-3)',
                    padding: 'var(--sp-3) 0',
                    borderBottom: i < topEvents.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--cream)',
                    color: 'var(--ink)',
                    display: 'grid', placeItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: 'var(--text-sm)',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{ev.title}</div>
                    <div style={{ fontSize: 'var(--fs-11)', color: 'var(--muted)' }}>
                      {formatFullDate(ev.starts_at)} · {ev.checked_in_count}/{ev.confirmed_count}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 900,
                    fontFamily: 'var(--font-mono)',
                    color: rate >= 90 ? 'var(--brand-green)' : 'var(--ink)',
                    letterSpacing: '-0.02em',
                  }}>
                    {rate}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interest trends */}
      <SectionHeader title="Interest trends" />
      <div className="card" style={{ padding: 'var(--sp-5)' }}>
        <div className="grid-4">
          {[
            { label: 'Generative AI',  value: 142, trend: '+28%', green: true },
            { label: 'Type design',    value: 98,  trend: '+12%', green: true },
            { label: 'Freelance ops',  value: 71,  trend: '+8%',  green: true },
            { label: 'Brand strategy', value: 54,  trend: '−3%',  green: false },
          ].map((it) => (
            <div key={it.label} style={{ padding: 'var(--sp-3)' }}>
              <div className="kpi-label">{it.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-2)', marginTop: 4 }}>
                <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, letterSpacing: '-0.02em' }}>{it.value}</span>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: it.green ? 'var(--brand-green)' : 'var(--danger)',
                }}>
                  {it.trend}
                </span>
              </div>
              <div className="kpi-sub">vs. last quarter</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
