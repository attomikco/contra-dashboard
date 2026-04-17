import DashboardShell from '@/components/layout/DashboardShell';
import SectionHeader from '@/components/layout/SectionHeader';
import { Camera, Film, FileText, Share2 } from 'lucide-react';
import { mockPastEvents, mockContent, formatFullDate } from '@/lib/mock-data';

const kindIcon = (kind: string) =>
  kind === 'photo_gallery' ? Camera
  : kind === 'recap_video' ? Film
  : kind === 'press_clip'  ? FileText
  : Share2;

const kindLabel = (kind: string) =>
  kind === 'photo_gallery' ? 'Gallery'
  : kind === 'recap_video' ? 'Video'
  : kind === 'press_clip'  ? 'Press'
  : 'Social';

export default function PastEventsPage() {
  const published = mockContent.filter((c) => c.status === 'published');

  return (
    <DashboardShell
      title="Past events & content"
      subtitle={`${mockPastEvents.length} past events · ${published.length} content assets published`}
      actions={
        <>
          <button className="btn btn-secondary btn-sm">Archive settings</button>
          <button className="btn btn-primary btn-sm">Generate recap</button>
        </>
      }
    >
      {mockPastEvents.map((ev) => {
        const checkInRate = ev.checked_in_count && ev.confirmed_count
          ? Math.round((ev.checked_in_count / ev.confirmed_count) * 100)
          : 0;
        const assets = mockContent.filter((c) => c.event_id === ev.id);

        return (
          <div key={ev.id} style={{ marginBottom: 'var(--sp-8)' }}>
            {/* Event header */}
            <div className="card" style={{ padding: 'var(--sp-6)', marginBottom: 'var(--sp-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-4)' }}>
                <div>
                  <h2 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>{ev.title}</h2>
                  <div style={{ marginTop: 4, fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
                    {formatFullDate(ev.starts_at)} · {ev.venue}, {ev.city}
                  </div>
                </div>
                <span className="badge badge-gray">Past</span>
              </div>

              <div className="grid-4">
                <div style={{ padding: 'var(--sp-3) 0' }}>
                  <div className="kpi-label">RSVPs</div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginTop: 4 }}>{ev.rsvp_count}</div>
                </div>
                <div style={{ padding: 'var(--sp-3) 0' }}>
                  <div className="kpi-label">Checked in</div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginTop: 4 }}>
                    {ev.checked_in_count}
                  </div>
                </div>
                <div style={{ padding: 'var(--sp-3) 0' }}>
                  <div className="kpi-label">Show rate</div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginTop: 4, color: checkInRate >= 85 ? 'var(--brand-green)' : 'var(--ink)' }}>
                    {checkInRate}%
                  </div>
                </div>
                <div style={{ padding: 'var(--sp-3) 0' }}>
                  <div className="kpi-label">Content assets</div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, marginTop: 4 }}>{assets.length}</div>
                </div>
              </div>
            </div>

            {/* Content assets for this event */}
            {assets.length > 0 && (
              <div className="grid-3">
                {assets.map((asset) => {
                  const Icon = kindIcon(asset.kind);
                  return (
                    <div key={asset.id} className="card card-interactive" style={{ padding: 'var(--sp-4)' }}>
                      <div style={{
                        height: 80,
                        borderRadius: 'var(--r-md)',
                        background: asset.cover_color === 'green' ? 'var(--ink)'
                          : asset.cover_color === 'dark' ? 'var(--ink)' : 'var(--cream)',
                        display: 'grid', placeItems: 'center',
                        color: asset.cover_color === 'green' ? 'var(--paper)'
                          : asset.cover_color === 'dark' ? 'var(--paper)' : 'var(--ink)',
                        marginBottom: 'var(--sp-3)',
                      }}>
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center', marginBottom: 'var(--sp-2)' }}>
                        <span className="badge badge-gray">{kindLabel(asset.kind)}</span>
                        {asset.status === 'published' && (
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-11)', color: 'var(--muted)' }}>
                            {asset.views.toLocaleString()} views
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, lineHeight: 1.3, marginBottom: 4 }}>
                        {asset.title}
                      </div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--subtle)' }}>
                        by {asset.author}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </DashboardShell>
  );
}
