'use client';

import { Search, Plus, Bell } from 'lucide-react';
import { COMMUNITY } from '@/lib/mock-data';

export default function Topbar() {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', flex: 1, minWidth: 0 }}>
        <div>
          <div
            style={{
              fontSize: 'var(--fs-11)',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              fontWeight: 600,
            }}
          >
            Community
          </div>
          <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--ink)' }}>
            {COMMUNITY.name}
          </div>
        </div>

        <div className="input-group" style={{ marginLeft: 'var(--sp-6)', maxWidth: 360, flex: 1 }}>
          <Search size={16} className="input-prefix" />
          <input
            className="search-input"
            placeholder="Search members, events, threads..."
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
        <button className="btn btn-ghost btn-icon" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button className="btn btn-primary btn-sm">
          <Plus size={14} strokeWidth={2.5} />
          New event
        </button>
      </div>
    </header>
  );
}
