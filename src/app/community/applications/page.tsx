'use client';

import { useState, useMemo } from 'react';
import DashboardShell from '@/components/layout/DashboardShell';
import { CheckCircle2, Clock, X as XIcon, Users, BadgeCheck } from 'lucide-react';
import { mockApplications, timeAgo, formatTierLabel, type ApplicationStatus } from '@/lib/mock-data';

const tabs: { key: ApplicationStatus | 'all'; label: string }[] = [
  { key: 'all',        label: 'All' },
  { key: 'pending',    label: 'Pending' },
  { key: 'in_review',  label: 'In review' },
  { key: 'approved',   label: 'Approved' },
  { key: 'waitlisted', label: 'Waitlisted' },
  { key: 'declined',   label: 'Declined' },
];

const statusBadgeClass = (s: ApplicationStatus) =>
  s === 'pending'    ? 'badge-yellow'
  : s === 'in_review'? 'badge-blue'
  : s === 'approved' ? 'badge-green'
  : s === 'waitlisted'? 'badge-gray'
  : 'badge-red';

export default function ApplicationsPage() {
  const [tab, setTab] = useState<ApplicationStatus | 'all'>('pending');

  const counts = useMemo(() => ({
    all:        mockApplications.length,
    pending:    mockApplications.filter(a => a.status === 'pending').length,
    in_review:  mockApplications.filter(a => a.status === 'in_review').length,
    approved:   mockApplications.filter(a => a.status === 'approved').length,
    waitlisted: mockApplications.filter(a => a.status === 'waitlisted').length,
    declined:   mockApplications.filter(a => a.status === 'declined').length,
  }), []);

  const filtered = tab === 'all'
    ? mockApplications
    : mockApplications.filter(a => a.status === tab);

  return (
    <DashboardShell
      title="Applications & waitlist"
      subtitle={`${counts.pending + counts.in_review} awaiting decision · ${counts.waitlisted} on waitlist`}
      actions={
        <>
          <button className="btn btn-secondary btn-sm">Export</button>
          <button className="btn btn-primary btn-sm">Application form</button>
        </>
      }
    >
      {/* KPIs */}
      <div className="grid-4" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="kpi-card">
          <div className="kpi-label">Pending review</div>
          <div className="kpi-value">{counts.pending}</div>
          <div className="kpi-sub">oldest 7 days</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. time to decision</div>
          <div className="kpi-value">2.4<span style={{ fontSize: 'var(--text-lg)', color: 'var(--muted)', fontWeight: 600 }}>d</span></div>
          <div className="kpi-sub">target: &lt; 3 days</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Acceptance rate</div>
          <div className="kpi-value">68%</div>
          <div className="kpi-sub">last 90 days</div>
        </div>
        <div className="kpi-card accent">
          <div className="kpi-label">Referred applicants</div>
          <div className="kpi-value">12</div>
          <div className="kpi-sub" style={{ color: 'var(--white-a60)' }}>founding-member referrals</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-5)' }}>
        {tabs.map((t) => (
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

      {/* Application cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        {filtered.map((app) => (
          <div key={app.id} className="card" style={{ padding: 'var(--sp-5)' }}>
            <div style={{ display: 'flex', gap: 'var(--sp-5)', alignItems: 'flex-start' }}>
              {/* Avatar */}
              <div className="avatar avatar-lg" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
                {app.initials}
              </div>

              {/* Body */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>{app.applicant_name}</h3>
                  {app.verified && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--brand-green)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      <BadgeCheck size={14} /> Verified
                    </span>
                  )}
                  <span className={`badge ${statusBadgeClass(app.status)}`}>
                    {app.status.replace('_', ' ')}
                  </span>
                  <span className="badge badge-gray">
                    Requested: {formatTierLabel(app.tier_requested)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 'var(--sp-4)', marginTop: 'var(--sp-2)', fontSize: 'var(--text-sm)', color: 'var(--muted)', flexWrap: 'wrap' }}>
                  <span>{app.email}</span>
                  <span>·</span>
                  <span>{app.city}</span>
                  {app.follower_count && (
                    <>
                      <span>·</span>
                      <span>{app.follower_count.toLocaleString()} followers</span>
                    </>
                  )}
                  <span>·</span>
                  <span>Applied {timeAgo(app.applied_at)}</span>
                </div>

                <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--text-base)', color: 'var(--ink)', lineHeight: 1.5 }}>
                  &ldquo;{app.why_joining}&rdquo;
                </p>

                {app.referred_by && (
                  <div style={{ marginTop: 'var(--sp-3)', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px var(--sp-3)', background: 'var(--accent-light)', color: 'var(--brand-green-dark)', borderRadius: 'var(--r-pill)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    <Users size={12} strokeWidth={2.5} />
                    Referred by {app.referred_by}
                  </div>
                )}
              </div>

              {/* Actions */}
              {(app.status === 'pending' || app.status === 'in_review') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', flexShrink: 0 }}>
                  <button className="btn btn-primary btn-sm"><CheckCircle2 size={14} />Approve</button>
                  <button className="btn btn-secondary btn-sm"><Clock size={14} />Waitlist</button>
                  <button className="btn btn-ghost btn-sm"><XIcon size={14} />Decline</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
