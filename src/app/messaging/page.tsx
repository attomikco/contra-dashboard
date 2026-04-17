'use client';

import { useState } from 'react';
import DashboardShell from '@/components/layout/DashboardShell';
import SectionHeader from '@/components/layout/SectionHeader';
import { Mail, MessageCircle, Smartphone, Send } from 'lucide-react';
import { mockThreads, mockBroadcasts, timeAgo, type Broadcast } from '@/lib/mock-data';

const channelIcon = (c: Broadcast['channel']) =>
  c === 'email' ? Mail : c === 'sms' ? Smartphone : MessageCircle;

const channelLabel = (c: Broadcast['channel']) =>
  c === 'email' ? 'Email' : c === 'sms' ? 'SMS' : 'Push';

export default function MessagingPage() {
  const [view, setView] = useState<'threads' | 'broadcasts'>('threads');

  const unanswered = mockThreads.filter((t) => t.unanswered).length;

  return (
    <DashboardShell
      title="Messaging"
      subtitle={`${mockThreads.length} active threads · ${unanswered} need a reply · ${mockBroadcasts.filter(b => b.status === 'scheduled').length} broadcasts scheduled`}
      actions={
        <>
          <button className="btn btn-secondary btn-sm">Templates</button>
          <button className="btn btn-primary btn-sm"><Send size={14} />New broadcast</button>
        </>
      }
    >
      {/* View toggle */}
      <div className="toggle-group" style={{ marginBottom: 'var(--sp-6)' }}>
        <button className={`toggle-btn ${view === 'threads' ? 'active' : ''}`} onClick={() => setView('threads')}>
          Threads ({mockThreads.length})
        </button>
        <button className={`toggle-btn ${view === 'broadcasts' ? 'active' : ''}`} onClick={() => setView('broadcasts')}>
          Broadcasts ({mockBroadcasts.length})
        </button>
      </div>

      {view === 'threads' && (
        <>
          <SectionHeader title={`Unanswered (${unanswered})`} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
            {mockThreads.filter((t) => t.unanswered).map((t) => (
              <ThreadCard key={t.id} thread={t} />
            ))}
          </div>

          <SectionHeader title="All threads" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            {mockThreads.filter((t) => !t.unanswered).map((t) => (
              <ThreadCard key={t.id} thread={t} />
            ))}
          </div>
        </>
      )}

      {view === 'broadcasts' && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Channel</th>
                <th>Subject</th>
                <th>Audience</th>
                <th className="td-right">Size</th>
                <th>Status</th>
                <th className="td-right">Open rate</th>
                <th className="td-right">CTR</th>
              </tr>
            </thead>
            <tbody>
              {mockBroadcasts.map((b) => {
                const Icon = channelIcon(b.channel);
                const statusClass = b.status === 'sent' ? 'badge-green'
                  : b.status === 'scheduled' ? 'badge-blue'
                  : 'badge-yellow';
                return (
                  <tr key={b.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                        <Icon size={14} /> {channelLabel(b.channel)}
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{b.subject}</td>
                    <td className="td-muted">{b.audience}</td>
                    <td className="td-right td-mono">{b.audience_size.toLocaleString()}</td>
                    <td><span className={`badge ${statusClass}`}>{b.status}</span></td>
                    <td className="td-right td-mono">{b.open_rate ? `${Math.round(b.open_rate * 100)}%` : '—'}</td>
                    <td className="td-right td-mono">{b.click_rate ? `${Math.round(b.click_rate * 100)}%` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}

function ThreadCard({ thread: t }: { thread: typeof mockThreads[number] }) {
  const variant = t.starter_variant === 'dark' ? 'avatar-dark'
    : t.starter_variant === 'gray' ? 'avatar-gray' : '';

  return (
    <div className="card card-interactive" style={{ padding: 'var(--sp-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
        <div className={`avatar avatar-md ${variant}`}>{t.starter_initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontWeight: 700 }}>{t.starter_name}</span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--subtle)' }}>·</span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>{t.event_title}</span>
            {t.unanswered && <span className="badge badge-yellow">Unanswered</span>}
          </div>
          <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 4 }}>
            {t.subject}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', lineHeight: 1.5, marginBottom: 6 }}>
            {t.snippet}
          </div>
          <div style={{ display: 'flex', gap: 'var(--sp-4)', fontSize: 'var(--text-sm)', color: 'var(--subtle)' }}>
            <span>{t.reply_count} replies</span>
            <span>·</span>
            <span>{timeAgo(t.last_message_at)}</span>
          </div>
        </div>
        <button className="btn btn-ghost btn-xs">Open</button>
      </div>
    </div>
  );
}
