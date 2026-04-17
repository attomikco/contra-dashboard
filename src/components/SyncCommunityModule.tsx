'use client';

import { useState } from 'react';
import { RefreshCw, ArrowUpRight } from 'lucide-react';
import {
  mockRecentConnections,
  mockInterests,
  mockConversations,
} from '@/lib/mock-data';

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  return `${days}d ago`;
}

export default function SyncCommunityModule() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('2m');

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSync('just now');
    }, 1200);
  };

  return (
    <section className="card" style={{ padding: 'var(--sp-7)' }}>
      {/* Module header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--sp-4)',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)' }}>Sync community</h2>
            <span className="badge badge-black">Live</span>
          </div>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--muted)',
              marginTop: 4,
              lineHeight: 1.5,
            }}
          >
            Who&apos;s in the room, who you talk to, and who you should.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <span className="caption" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-12)' }}>
            Synced {lastSync}
          </span>
          <button
            className="btn btn-dark btn-sm"
            onClick={handleSync}
            disabled={syncing}
          >
            <RefreshCw
              size={14}
              style={{
                animation: syncing ? 'spin 0.7s linear infinite' : 'none',
              }}
            />
            {syncing ? 'Syncing...' : 'Sync now'}
          </button>
        </div>
      </div>

      {/* Three columns — stays flat, nothing hidden */}
      <div className="sync-grid">
        {/* 1. Recent connections */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--sp-3)',
            }}
          >
            <span className="label">Recent connections</span>
            <span
              style={{
                fontSize: 'var(--fs-11)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--subtle)',
              }}
            >
              last 7 days
            </span>
          </div>

          <div>
            {mockRecentConnections.slice(0, 4).map((m) => {
              const variantClass =
                m.avatar_variant === 'dark'
                  ? 'avatar-dark'
                  : m.avatar_variant === 'gray'
                  ? 'avatar-gray'
                  : '';
              return (
                <div key={m.id} className="stack-row">
                  <div className={`avatar avatar-sm ${variantClass}`}>{m.initials}</div>
                  <div className="stack-row-body">
                    <div className="stack-row-title">{m.full_name}</div>
                    <div className="stack-row-meta">
                      {m.status === 'new' ? 'Joined this week' : `Active ${timeAgo(m.last_active_at)}`}
                    </div>
                  </div>
                  {m.status === 'new' && (
                    <span className="badge badge-green">New</span>
                  )}
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-ghost btn-sm"
            style={{ marginTop: 'var(--sp-4)', width: '100%' }}
          >
            See all 87
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* 2. Discover by shared interests */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--sp-3)',
            }}
          >
            <span className="label">Shared interests</span>
            <span
              style={{
                fontSize: 'var(--fs-11)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--subtle)',
              }}
            >
              trending
            </span>
          </div>

          <div>
            {mockInterests.map((cluster, idx) => (
              <div key={cluster.tag} className="interest-row">
                <div className="interest-label">
                  <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{cluster.label}</span>
                  <span className="count">{cluster.member_count}</span>
                </div>
                <div className="interest-track">
                  <div
                    className={`interest-fill ${idx === 0 ? 'accent' : ''}`}
                    style={{ width: `${Math.round(cluster.share * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-ghost btn-sm"
            style={{ marginTop: 'var(--sp-4)', width: '100%' }}
          >
            Suggest an event
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* 3. Cross-event conversations */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--sp-3)',
            }}
          >
            <span className="label">Across events</span>
            <span
              style={{
                fontSize: 'var(--fs-11)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--subtle)',
              }}
            >
              {mockConversations.reduce((a, c) => a + c.unanswered_count, 0)} unanswered
            </span>
          </div>

          <div>
            {mockConversations.map((c) => (
              <div key={c.event_id} className="stack-row">
                <div className="stack-row-body">
                  <div className="stack-row-title">{c.event_title}</div>
                  <div className="stack-row-meta">
                    {c.thread_count} threads · {c.unanswered_count} unanswered
                  </div>
                </div>
                {c.unanswered_count > 0 && (
                  <span className="badge badge-yellow">{c.unanswered_count}</span>
                )}
              </div>
            ))}
          </div>

          <button
            className="btn btn-ghost btn-sm"
            style={{ marginTop: 'var(--sp-4)', width: '100%' }}
          >
            Reply queue
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* tiny inline spin keyframe (module-scoped) */}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
