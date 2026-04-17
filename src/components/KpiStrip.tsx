'use client';

import { COMMUNITY } from '@/lib/mock-data';
import { ArrowUp, ArrowDown } from 'lucide-react';

type Kpi = {
  label: string;
  value: string;
  sub?: string;
  delta?: { value: string; direction: 'up' | 'down' | 'flat' };
  accent?: boolean;
};

const kpis: Kpi[] = [
  {
    label: 'Active this week',
    value: COMMUNITY.active_this_week.toLocaleString(),
    delta: { value: `+${COMMUNITY.active_delta} vs last week`, direction: 'up' },
    accent: true,
  },
  {
    label: 'New connections',
    value: COMMUNITY.new_connections.toString(),
    sub: `across ${COMMUNITY.events_driving} events`,
  },
  {
    label: 'At-risk members',
    value: COMMUNITY.at_risk.toString(),
    sub: 'no activity 30d+',
    delta: { value: 'needs follow-up', direction: 'down' },
  },
  {
    label: 'Open conversations',
    value: COMMUNITY.open_conversations.toString(),
    sub: `${COMMUNITY.needs_reply} need a reply`,
  },
];

export default function KpiStrip() {
  return (
    <div className="grid-4">
      {kpis.map((k) => (
        <div key={k.label} className={`kpi-card ${k.accent ? 'accent' : ''}`}>
          <div className="kpi-label">{k.label}</div>
          <div className="kpi-value">{k.value}</div>
          {k.delta && (
            <div
              className={`kpi-delta ${k.delta.direction}`}
              style={k.accent ? { color: 'var(--paper)' } : undefined}
            >
              {k.delta.direction === 'up' && <ArrowUp size={12} strokeWidth={2.5} />}
              {k.delta.direction === 'down' && <ArrowDown size={12} strokeWidth={2.5} />}
              {k.delta.value}
            </div>
          )}
          {!k.delta && k.sub && <div className="kpi-sub">{k.sub}</div>}
        </div>
      ))}
    </div>
  );
}
