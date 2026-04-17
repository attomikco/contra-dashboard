'use client';

import { useState, useMemo } from 'react';
import DashboardShell from '@/components/layout/DashboardShell';
import { Camera, Film, FileText, Share2, Eye, Send, Plus, type LucideIcon } from 'lucide-react';
import { mockContent, formatShortDate, type ContentAsset } from '@/lib/mock-data';

type KindFilter = 'all' | ContentAsset['kind'];

const filters: { key: KindFilter; label: string; icon?: LucideIcon }[] = [
  { key: 'all',           label: 'All' },
  { key: 'photo_gallery', label: 'Galleries',  icon: Camera },
  { key: 'recap_video',   label: 'Videos',     icon: Film },
  { key: 'press_clip',    label: 'Press',      icon: FileText },
  { key: 'social_post',   label: 'Social',     icon: Share2 },
];

const kindIcon = (k: ContentAsset['kind']) =>
  k === 'photo_gallery' ? Camera
  : k === 'recap_video' ? Film
  : k === 'press_clip'  ? FileText
  : Share2;

const kindLabel = (k: ContentAsset['kind']) =>
  k === 'photo_gallery' ? 'Gallery'
  : k === 'recap_video' ? 'Video'
  : k === 'press_clip'  ? 'Press'
  : 'Social';

const statusBadge = (s: ContentAsset['status']) =>
  s === 'published' ? 'badge-green'
  : s === 'scheduled' ? 'badge-blue'
  : 'badge-yellow';

export default function ContentLibraryPage() {
  const [filter, setFilter] = useState<KindFilter>('all');

  const filtered = useMemo(() => {
    return filter === 'all' ? mockContent : mockContent.filter((c) => c.kind === filter);
  }, [filter]);

  const counts = useMemo(() => ({
    all:           mockContent.length,
    photo_gallery: mockContent.filter((c) => c.kind === 'photo_gallery').length,
    recap_video:   mockContent.filter((c) => c.kind === 'recap_video').length,
    press_clip:    mockContent.filter((c) => c.kind === 'press_clip').length,
    social_post:   mockContent.filter((c) => c.kind === 'social_post').length,
  }), []);

  const published   = mockContent.filter((c) => c.status === 'published');
  const totalViews  = published.reduce((a, c) => a + c.views, 0);
  const totalShares = published.reduce((a, c) => a + c.shares, 0);

  return (
    <DashboardShell
      title="Content library"
      subtitle={`${mockContent.length} assets · ${published.length} published · ${mockContent.filter(c => c.status === 'scheduled').length} scheduled`}
      actions={
        <>
          <button className="btn btn-secondary btn-sm"><Send size={14} />Distribute</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} />Upload asset</button>
        </>
      }
    >
      {/* KPIs */}
      <div className="grid-4" style={{ marginBottom: 'var(--sp-6)' }}>
        <div className="kpi-card">
          <div className="kpi-label">Total views</div>
          <div className="kpi-value">{(totalViews / 1000).toFixed(1)}<span style={{ fontSize: 'var(--text-lg)', color: 'var(--muted)', fontWeight: 600 }}>k</span></div>
          <div className="kpi-sub">all-time published</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total shares</div>
          <div className="kpi-value">{totalShares.toLocaleString()}</div>
          <div className="kpi-sub">across channels</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg. views / asset</div>
          <div className="kpi-value">{Math.round(totalViews / published.length).toLocaleString()}</div>
          <div className="kpi-sub">{published.length} published</div>
        </div>
        <div className="kpi-card accent">
          <div className="kpi-label">In pipeline</div>
          <div className="kpi-value">{mockContent.filter(c => c.status !== 'published').length}</div>
          <div className="kpi-sub" style={{ color: 'var(--white-a60)' }}>drafts + scheduled</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="tabs" style={{ marginBottom: 'var(--sp-5)' }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`tab-btn ${filter === f.key ? 'active' : ''}`}
          >
            {f.label}
            <span className="tab-count">{counts[f.key as keyof typeof counts]}</span>
          </button>
        ))}
      </div>

      {/* Asset grid */}
      <div className="grid-3">
        {filtered.map((asset) => {
          const Icon = kindIcon(asset.kind);
          const coverBg = asset.cover_color === 'green' ? 'var(--ink)'
            : asset.cover_color === 'dark' ? 'var(--ink)'
            : 'var(--cream)';
          const coverFg = asset.cover_color === 'green' ? 'var(--paper)'
            : asset.cover_color === 'dark' ? 'var(--paper)'
            : 'var(--ink)';

          return (
            <div key={asset.id} className="card card-interactive" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Cover */}
              <div style={{
                height: 140,
                background: coverBg,
                color: coverFg,
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
              }}>
                <Icon size={44} strokeWidth={1.5} />
                <span style={{
                  position: 'absolute',
                  top: 'var(--sp-3)',
                  right: 'var(--sp-3)',
                }}>
                  <span className={`badge ${statusBadge(asset.status)}`}>{asset.status}</span>
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: 'var(--sp-4)' }}>
                <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center', marginBottom: 'var(--sp-2)' }}>
                  <span className="badge badge-gray">{kindLabel(asset.kind)}</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>·</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                    {asset.event_title}
                  </span>
                </div>

                <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, lineHeight: 1.3, marginBottom: 'var(--sp-2)' }}>
                  {asset.title}
                </div>

                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--subtle)', marginBottom: 'var(--sp-3)' }}>
                  by {asset.author}
                  {asset.published_at && ` · ${formatShortDate(asset.published_at)}`}
                  {asset.scheduled_for && ` · scheduled ${formatShortDate(asset.scheduled_for)}`}
                </div>

                {asset.status === 'published' && (
                  <div style={{
                    display: 'flex',
                    gap: 'var(--sp-4)',
                    paddingTop: 'var(--sp-3)',
                    borderTop: '1px solid var(--border)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--muted)',
                  }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Eye size={12} /> {asset.views.toLocaleString()}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Share2 size={12} /> {asset.shares}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardShell>
  );
}
