'use client';

import { useState, useMemo } from 'react';
import DashboardShell from '@/components/layout/DashboardShell';
import { Search, Download, UserPlus } from 'lucide-react';
import { mockMembers, formatTierLabel, timeAgo, type MemberStatus, type MemberTier } from '@/lib/mock-data';

const statusTabs: { key: MemberStatus | 'all'; label: string }[] = [
  { key: 'all',      label: 'All' },
  { key: 'active',   label: 'Active' },
  { key: 'new',      label: 'New' },
  { key: 'at_risk',  label: 'At risk' },
  { key: 'inactive', label: 'Inactive' },
];

const tierBadgeClass = (tier: MemberTier) =>
  tier === 'founding' ? 'badge-black'
    : tier === 'premium' ? 'badge-green'
    : tier === 'standard' ? 'badge-gray'
    : 'badge-yellow';

const statusBadgeClass = (s: MemberStatus) =>
  s === 'active'   ? 'badge-green'
    : s === 'new'    ? 'badge-blue'
    : s === 'at_risk'? 'badge-yellow'
    : 'badge-gray';

export default function MembersPage() {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<MemberStatus | 'all'>('all');

  const filtered = useMemo(() => {
    return mockMembers.filter((m) => {
      const matchesTab = tab === 'all' ? true : m.status === tab;
      const matchesQ = q === '' ||
        m.full_name.toLowerCase().includes(q.toLowerCase()) ||
        m.company?.toLowerCase().includes(q.toLowerCase()) ||
        m.city.toLowerCase().includes(q.toLowerCase());
      return matchesTab && matchesQ;
    });
  }, [q, tab]);

  const counts = useMemo(() => ({
    all:      mockMembers.length,
    active:   mockMembers.filter((m) => m.status === 'active').length,
    new:      mockMembers.filter((m) => m.status === 'new').length,
    at_risk:  mockMembers.filter((m) => m.status === 'at_risk').length,
    inactive: mockMembers.filter((m) => m.status === 'inactive').length,
  }), []);

  return (
    <DashboardShell
      title="Members"
      subtitle={`${mockMembers.length} members · ${counts.active} active · ${counts.at_risk} at risk`}
      actions={
        <>
          <button className="btn btn-secondary btn-sm"><Download size={14} />Export</button>
          <button className="btn btn-primary btn-sm"><UserPlus size={14} />Invite member</button>
        </>
      }
    >
      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-5)' }}>
        {statusTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`tab-btn ${tab === t.key ? 'active' : ''}`}
          >
            {t.label}
            <span className="tab-count">{counts[t.key as keyof typeof counts]}</span>
          </button>
        ))}
      </div>

      {/* Search + filters bar */}
      <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-5)' }}>
        <div className="input-group" style={{ flex: 1, maxWidth: 400 }}>
          <Search size={16} className="input-prefix" />
          <input
            className="search-input"
            placeholder="Search by name, company, city..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <button className="btn btn-secondary btn-sm">Tier: All</button>
        <button className="btn btn-secondary btn-sm">City: All</button>
        <button className="btn btn-ghost btn-sm">Clear</button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Tier</th>
              <th>Status</th>
              <th>City</th>
              <th className="td-right">Events</th>
              <th className="td-right">Connections</th>
              <th>Last active</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => {
              const variantClass = m.avatar_variant === 'dark' ? 'avatar-dark'
                : m.avatar_variant === 'gray' ? 'avatar-gray' : '';
              return (
                <tr key={m.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                      <div className={`avatar avatar-sm ${variantClass}`}>{m.initials}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{m.full_name}</div>
                        <div className="td-muted" style={{ fontSize: 'var(--text-sm)' }}>
                          {m.title}{m.company ? ` · ${m.company}` : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${tierBadgeClass(m.tier)}`}>
                      {formatTierLabel(m.tier)}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${statusBadgeClass(m.status)}`}>
                      {m.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="td-muted">{m.city}</td>
                  <td className="td-right td-mono">{m.events_attended}</td>
                  <td className="td-right td-mono">{m.connections}</td>
                  <td className="td-muted">{timeAgo(m.last_active_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
