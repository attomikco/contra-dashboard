'use client';

import { mockUpcomingEvents } from '@/lib/mock-data';
import { CalendarDays, ArrowUpRight } from 'lucide-react';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export default function UpcomingEventsPanel() {
  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--sp-4)',
        }}
      >
        <h3>Upcoming events</h3>
        <span className="badge badge-gray">{mockUpcomingEvents.length}</span>
      </div>

      <div>
        {mockUpcomingEvents.map((ev) => {
          const confidence = Math.round((ev.likely_count / ev.rsvp_count) * 100);
          return (
            <div key={ev.id} className="stack-row">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--r-sm)',
                  background: 'var(--cream)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--muted)',
                  flexShrink: 0,
                }}
              >
                <CalendarDays size={18} />
              </div>
              <div className="stack-row-body">
                <div className="stack-row-title">{ev.title}</div>
                <div className="stack-row-meta">
                  {formatDate(ev.starts_at)} · {ev.rsvp_count} RSVPs · {ev.likely_count} likely ({confidence}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="btn btn-ghost btn-sm"
        style={{ marginTop: 'var(--sp-4)', width: '100%' }}
      >
        Plan next event
        <ArrowUpRight size={14} />
      </button>
    </div>
  );
}
