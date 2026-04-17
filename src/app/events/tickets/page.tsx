'use client';

import { useState, useMemo } from 'react';
import DashboardShell from '@/components/layout/DashboardShell';
import SectionHeader from '@/components/layout/SectionHeader';
import { QrCode, Search, CheckCircle2 } from 'lucide-react';
import { mockTickets, mockUpcomingEvents, formatTierLabel, type Ticket } from '@/lib/mock-data';

const statusBadge = (s: Ticket['status']) =>
  s === 'confirmed'  ? 'badge-blue'
  : s === 'checked_in'? 'badge-green'
  : s === 'cancelled' ? 'badge-gray'
  : s === 'no_show'   ? 'badge-yellow'
  : 'badge-red';

export default function TicketsPage() {
  const [q, setQ] = useState('');
  const [localTickets, setLocalTickets] = useState<Ticket[]>(mockTickets);

  const event = mockUpcomingEvents.find((e) => e.id === 'e_1')!;

  const filtered = useMemo(() => {
    return localTickets.filter((t) => {
      if (t.event_id !== 'e_1') return false;
      if (q === '') return true;
      return t.member_name.toLowerCase().includes(q.toLowerCase())
          || t.qr_code.toLowerCase().includes(q.toLowerCase());
    });
  }, [q, localTickets]);

  const stats = useMemo(() => {
    const forEvent = localTickets.filter((t) => t.event_id === 'e_1');
    return {
      total:      forEvent.length,
      checkedIn:  forEvent.filter((t) => t.status === 'checked_in').length,
      confirmed:  forEvent.filter((t) => t.status === 'confirmed').length,
      cancelled:  forEvent.filter((t) => t.status === 'cancelled').length,
    };
  }, [localTickets]);

  const progress = Math.round((stats.checkedIn / (stats.total - stats.cancelled || 1)) * 100);

  function checkIn(id: string) {
    setLocalTickets((prev) => prev.map((t) =>
      t.id === id && t.status === 'confirmed'
        ? { ...t, status: 'checked_in', checked_in_at: new Date().toISOString() }
        : t
    ));
  }

  return (
    <DashboardShell
      title="Tickets & check-in"
      subtitle={`${event.title} · ${event.venue}, ${event.city}`}
      actions={
        <>
          <button className="btn btn-secondary btn-sm">Export tickets</button>
          <button className="btn btn-primary btn-sm"><QrCode size={14} />Open scanner</button>
        </>
      }
    >
      {/* Live check-in progress */}
      <div className="card card-dark" style={{ padding: 'var(--sp-6)', marginBottom: 'var(--sp-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginBottom: 'var(--sp-4)' }}>
          <span className="pulse-dot" />
          <div style={{ fontSize: 'var(--fs-11)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--paper)' }}>
            Live check-in
          </div>
          <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--white-a60)' }}>
            Doors open at 18:00
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--sp-6)', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'var(--paper)', lineHeight: 1, letterSpacing: '-0.04em' }}>
              {stats.checkedIn}/{stats.total - stats.cancelled}
            </div>
            <div style={{ marginTop: 'var(--sp-2)', fontSize: 'var(--text-sm)', color: 'var(--white-a70)' }}>
              checked in ({progress}%)
            </div>
          </div>

          <div>
            <div style={{ height: 10, background: 'var(--white-a10)', borderRadius: 'var(--r-pill)', overflow: 'hidden', marginBottom: 'var(--sp-3)' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'var(--paper)', borderRadius: 'var(--r-pill)', transition: 'width 0.3s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--white-a60)' }}>{stats.confirmed} confirmed pending arrival</span>
              <span style={{ color: 'var(--white-a60)' }}>{stats.cancelled} cancelled</span>
            </div>
          </div>
        </div>
      </div>

      <SectionHeader title="Ticket list" />

      {/* Search */}
      <div className="input-group" style={{ maxWidth: 400, marginBottom: 'var(--sp-4)' }}>
        <Search size={16} className="input-prefix" />
        <input
          className="search-input"
          placeholder="Search by name or QR code..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>QR code</th>
              <th>Tier</th>
              <th>Ticket</th>
              <th>Status</th>
              <th>+1</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => {
              const variantClass = t.tier === 'founding' ? 'avatar-dark' : '';
              return (
                <tr key={t.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                      <div className={`avatar avatar-sm ${variantClass}`}>{t.member_initials}</div>
                      <div style={{ fontWeight: 600 }}>{t.member_name}</div>
                    </div>
                  </td>
                  <td className="td-mono">{t.qr_code}</td>
                  <td><span className={`badge ${t.tier === 'founding' ? 'badge-black' : t.tier === 'premium' ? 'badge-green' : 'badge-gray'}`}>{formatTierLabel(t.tier)}</span></td>
                  <td className="td-muted" style={{ textTransform: 'capitalize' }}>{t.tier_ticket.replace('_', ' ')}</td>
                  <td><span className={`badge ${statusBadge(t.status)}`}>{t.status.replace('_', ' ')}</span></td>
                  <td className="td-muted">{t.plus_one ? 'Yes' : '—'}</td>
                  <td className="td-right">
                    {t.status === 'confirmed' && (
                      <button className="btn btn-primary btn-xs" onClick={() => checkIn(t.id)}>
                        <CheckCircle2 size={12} /> Check in
                      </button>
                    )}
                    {t.status === 'checked_in' && (
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--brand-green)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle2 size={14} /> In
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
