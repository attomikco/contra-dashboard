import DashboardShell from '@/components/layout/DashboardShell';
import SectionHeader from '@/components/layout/SectionHeader';
import { MapPin, Users as UsersIcon, Clock, Tag } from 'lucide-react';
import { mockUpcomingEvents, formatFullDate, formatCurrency, formatTierLabel } from '@/lib/mock-data';

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

const coverStyle = (color: string): React.CSSProperties => {
  switch (color) {
    case 'green': return { background: 'var(--ink)',   color: 'var(--paper)' };
    case 'dark':  return { background: 'var(--ink)',   color: 'var(--paper)' };
    default:      return { background: 'var(--cream)',  color: 'var(--ink)' };
  }
};

export default function UpcomingEventsPage() {
  const totalCapacity = mockUpcomingEvents.reduce((a, e) => a + e.capacity, 0);
  const totalRsvps = mockUpcomingEvents.reduce((a, e) => a + e.rsvp_count, 0);

  return (
    <DashboardShell
      title="Upcoming events"
      subtitle={`${mockUpcomingEvents.length} events · ${totalRsvps}/${totalCapacity} RSVPs across all events`}
      actions={
        <>
          <button className="btn btn-secondary btn-sm">Calendar view</button>
          <button className="btn btn-primary btn-sm">New event</button>
        </>
      }
    >
      {/* KPIs */}
      <div className="grid-4" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="kpi-card">
          <div className="kpi-label">Next event</div>
          <div className="kpi-value">5<span style={{ fontSize: 'var(--text-lg)', color: 'var(--muted)', fontWeight: 600 }}>d</span></div>
          <div className="kpi-sub">AI x design meetup</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total RSVPs</div>
          <div className="kpi-value">{totalRsvps}</div>
          <div className="kpi-sub">across {mockUpcomingEvents.length} events</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Capacity used</div>
          <div className="kpi-value">{Math.round((totalRsvps / totalCapacity) * 100)}%</div>
          <div className="kpi-sub">{totalCapacity} total seats</div>
        </div>
        <div className="kpi-card accent">
          <div className="kpi-label">Conversion forecast</div>
          <div className="kpi-value">82%</div>
          <div className="kpi-sub" style={{ color: 'var(--white-a60)' }}>based on history</div>
        </div>
      </div>

      <SectionHeader title="Next 30 days" />

      {/* Event cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        {mockUpcomingEvents.map((ev) => {
          const fillPct = Math.round((ev.rsvp_count / ev.capacity) * 100);
          const fillColor = fillPct >= 90 ? 'var(--danger)' : fillPct >= 70 ? 'var(--warning)' : 'var(--accent)';

          return (
            <div key={ev.id} className="card card-interactive" style={{ padding: 'var(--sp-5)' }}>
              <div style={{ display: 'flex', gap: 'var(--sp-5)', alignItems: 'flex-start' }}>
                {/* Date block */}
                <div style={{
                  ...coverStyle(ev.cover_color),
                  borderRadius: 'var(--r-lg)',
                  padding: 'var(--sp-4)',
                  minWidth: 88,
                  textAlign: 'center',
                  flexShrink: 0,
                }}>
                  <div style={{ fontSize: 'var(--fs-11)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {new Date(ev.starts_at).toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em' }}>
                    {new Date(ev.starts_at).getDate()}
                  </div>
                  <div style={{ fontSize: 'var(--fs-11)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                    {formatTime(ev.starts_at)}
                  </div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap', marginBottom: 'var(--sp-2)' }}>
                    <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>{ev.title}</h3>
                    {ev.tier_access.length === 1 && ev.tier_access[0] === 'founding' && (
                      <span className="badge badge-black">Founding only</span>
                    )}
                    {ev.ticket_price_cents === 0
                      ? <span className="badge badge-green">Free</span>
                      : <span className="badge badge-gray">{formatCurrency(ev.ticket_price_cents ?? 0)}</span>}
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--sp-4)', fontSize: 'var(--text-sm)', color: 'var(--muted)', flexWrap: 'wrap', marginBottom: 'var(--sp-3)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={12} /> {ev.venue}, {ev.city}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} /> {formatFullDate(ev.starts_at)}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <UsersIcon size={12} /> Hosted by {ev.host_name}
                    </span>
                  </div>

                  {/* Capacity bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: 6 }}>
                      <span style={{ color: 'var(--muted)' }}>
                        <strong style={{ color: 'var(--ink)' }}>{ev.rsvp_count}</strong>
                        {' / '}{ev.capacity} RSVPs · {ev.likely_count} likely
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                        {fillPct}%
                      </span>
                    </div>
                    <div style={{ height: 6, background: 'var(--cream)', borderRadius: 'var(--r-pill)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${fillPct}%`, background: fillColor, borderRadius: 'var(--r-pill)' }} />
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 'var(--sp-3)', flexWrap: 'wrap' }}>
                    {ev.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: 'var(--fs-11)', fontWeight: 600,
                        color: 'var(--muted)', padding: '2px 8px',
                        background: 'var(--cream)', borderRadius: 'var(--r-pill)',
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                      }}>
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', flexShrink: 0 }}>
                  <button className="btn btn-primary btn-sm">Manage</button>
                  <button className="btn btn-secondary btn-sm">Message RSVPs</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}
