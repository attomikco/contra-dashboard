'use client';

import { mockAttention } from '@/lib/mock-data';

export default function AttentionPanel() {
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
        <h3>Needs your attention</h3>
        <span className="badge badge-gray">{mockAttention.length}</span>
      </div>

      <div>
        {mockAttention.map((item) => (
          <div key={item.id} className="attention-item">
            <span className={`attention-dot ${item.severity}`} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--ink)' }}>
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--subtle)',
                  marginTop: 2,
                }}
              >
                {item.meta}
              </div>
            </div>
            <button className="btn btn-secondary btn-xs">{item.action_label}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
