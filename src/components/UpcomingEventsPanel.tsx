'use client';

import Image from 'next/image';
import Link from 'next/link';
import { mockUpcomingEvents } from '@/lib/mock-data';
import { ArrowUpRight } from 'lucide-react';

function formatDateFallback(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).toUpperCase();
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
          const href = ev.slug
            ? `https://www.houseofcontra.com/events/${ev.slug}`
            : '#';
          const hostsWithAvatars = (ev.hosts ?? []).filter((h) => h.avatar);
          const hostNames = (ev.hosts ?? []).map((h) => h.name).join(' · ');

          return (
            <Link
              key={ev.id}
              href={href}
              className="event-card"
              aria-label={`Open ${ev.title}`}
            >
              <div className="event-cover">
                {ev.cover_image && (
                  <Image
                    src={ev.cover_image}
                    alt={`${ev.title} cover`}
                    width={184}
                    height={184}
                    sizes="92px"
                  />
                )}
                {ev.status === 'live' && (
                  <span className="event-cover-badge">Live</span>
                )}
              </div>

              <div className="event-body">
                <div className="event-time">
                  {ev.time_label ?? formatDateFallback(ev.starts_at)}
                </div>
                <div className="event-title">{ev.title}</div>

                <div className="event-hosts">
                  {hostsWithAvatars.length > 0 && (
                    <div className="host-stack">
                      {hostsWithAvatars.slice(0, 3).map((h) => (
                        <Image
                          key={h.name}
                          src={h.avatar as string}
                          alt={h.name}
                          width={36}
                          height={36}
                          className="host-avatar"
                        />
                      ))}
                    </div>
                  )}
                  <span className="host-names">{hostNames || ev.location}</span>
                </div>

                <div className="event-stats">
                  <span>{ev.rsvp_count} RSVPs</span>
                  <span className="dot" />
                  <span className="likely">{ev.likely_count} likely</span>
                  <span className="dot" />
                  <span>{confidence}%</span>
                </div>
              </div>
            </Link>
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
