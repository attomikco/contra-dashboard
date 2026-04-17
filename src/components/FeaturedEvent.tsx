'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { mockUpcomingEvents } from '@/lib/mock-data';

function pickFeatured() {
  const now = Date.now();
  const future = mockUpcomingEvents
    .filter((e) => new Date(e.starts_at).getTime() >= now)
    .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());
  return future[0] ?? mockUpcomingEvents[0];
}

export default function FeaturedEvent() {
  const ev = pickFeatured();
  if (!ev) return null;

  const href = ev.slug
    ? `https://www.houseofcontra.com/events/${ev.slug}`
    : '#';
  const confidence = Math.round((ev.likely_count / ev.rsvp_count) * 100);

  return (
    <Link href={href} className="featured-event" aria-label={`Open ${ev.title}`}>
      <div className="featured-event-cover">
        {ev.cover_image && (
          <Image
            src={ev.cover_image}
            alt={`${ev.title} cover`}
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            priority
          />
        )}
      </div>

      <div className="featured-event-body">
        <div>
          <div className="featured-event-eyebrow">
            <span className="next-dot" />
            Next up
          </div>
          <div className="featured-event-time">{ev.time_label}</div>
          <h2 className="featured-event-title">{ev.title}</h2>
          {ev.summary && <p className="featured-event-summary">{ev.summary}</p>}
        </div>

        <div className="featured-event-footer">
          <div className="featured-event-meta">
            <span><strong>{ev.rsvp_count}</strong>RSVPs</span>
            <span><strong>{ev.likely_count}</strong>likely · {confidence}%</span>
            {ev.location && <span>{ev.location.split(',').slice(-2).join(',').trim()}</span>}
          </div>
          <span className="featured-event-cta">
            View event
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}
