import DashboardShell from '@/components/layout/DashboardShell';
import SectionHeader from '@/components/layout/SectionHeader';
import { Star, Mail, MapPin, Plus } from 'lucide-react';
import { mockVendors, vendorCategoryLabels, type Vendor, type VendorCategory } from '@/lib/mock-data';

const statusBadge = (s: Vendor['status']) =>
  s === 'active'  ? 'badge-green'
  : s === 'paused' ? 'badge-yellow'
  : 'badge-blue';

const categoryBlurb: Record<VendorCategory, string> = {
  press:         'Publications and journalists covering community programming.',
  venues:        'Spaces, studios and private dining rooms available for events.',
  brands:        'Sponsors and brand partners backing programming.',
  entertainment: 'DJs, performers, and live acts for social events.',
  photography:   'Documentary, editorial, and studio photographers.',
  staffing:      'Hosts, bartenders, and event staff on retainer.',
};

export default function VendorsPage() {
  const grouped = (Object.keys(vendorCategoryLabels) as VendorCategory[]).map((cat) => ({
    category: cat,
    label:    vendorCategoryLabels[cat],
    blurb:    categoryBlurb[cat],
    vendors:  mockVendors.filter((v) => v.category === cat),
  }));

  const total       = mockVendors.length;
  const active      = mockVendors.filter((v) => v.status === 'active').length;
  const topRated    = mockVendors.filter((v) => v.rating === 5).length;
  const totalEvents = mockVendors.reduce((a, v) => a + v.events_worked, 0);

  return (
    <DashboardShell
      title="Vendors"
      subtitle={`${total} vendors across ${grouped.length} categories · ${active} active`}
      actions={
        <>
          <button className="btn btn-secondary btn-sm">Import CSV</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} />Add vendor</button>
        </>
      }
    >
      {/* KPIs */}
      <div className="grid-4" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="kpi-card">
          <div className="kpi-label">Active partners</div>
          <div className="kpi-value">{active}</div>
          <div className="kpi-sub">of {total} total</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">5-star vendors</div>
          <div className="kpi-value">{topRated}</div>
          <div className="kpi-sub">top of the network</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Events delivered</div>
          <div className="kpi-value">{totalEvents}</div>
          <div className="kpi-sub">all-time partnerships</div>
        </div>
        <div className="kpi-card accent">
          <div className="kpi-label">Vetting queue</div>
          <div className="kpi-value">{mockVendors.filter((v) => v.status === 'vetting').length}</div>
          <div className="kpi-sub" style={{ color: 'var(--white-a60)' }}>awaiting review</div>
        </div>
      </div>

      {/* Category sections */}
      {grouped.map((group) => (
        <div key={group.category} style={{ marginBottom: 'var(--sp-8)' }}>
          <SectionHeader title={`${group.label} · ${group.vendors.length}`} />
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginTop: 'calc(-1 * var(--sp-3))', marginBottom: 'var(--sp-4)' }}>
            {group.blurb}
          </p>

          <div className="grid-3">
            {group.vendors.map((v) => (
              <div key={v.id} className="card card-interactive" style={{ padding: 'var(--sp-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 'var(--r-md)',
                    background: 'var(--ink)', color: 'var(--paper)',
                    display: 'grid', placeItems: 'center',
                    fontWeight: 900, fontSize: 'var(--text-sm)', letterSpacing: '-0.02em',
                    flexShrink: 0,
                  }}>
                    {v.logo_initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {v.name}
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={11} /> {v.city}
                    </div>
                  </div>
                  <span className={`badge ${statusBadge(v.status)}`}>{v.status}</span>
                </div>

                {/* Rating + events */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginBottom: 'var(--sp-3)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        strokeWidth={2}
                        fill={i < v.rating ? 'var(--ink)' : 'none'}
                        color={i < v.rating ? 'var(--ink)' : 'var(--border)'}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>
                    <strong style={{ color: 'var(--ink)' }}>{v.events_worked}</strong> events worked
                  </div>
                </div>

                {/* Contact + rate */}
                <div style={{ marginBottom: 'var(--sp-3)' }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{v.contact_name}</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)' }}>
                    <Mail size={11} /> {v.contact_email}
                  </div>
                </div>

                <div style={{
                  fontSize: 'var(--fs-11)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--ink)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 700,
                  padding: 'var(--sp-2) var(--sp-3)',
                  background: 'var(--cream)',
                  borderRadius: 'var(--r-sm)',
                }}>
                  {v.rate_description}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </DashboardShell>
  );
}
