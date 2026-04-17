'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
} from 'lucide-react';

const nav = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-3)',
            color: 'var(--accent)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 900,
            fontSize: 'var(--text-xl)',
            letterSpacing: '-0.04em',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--r-sm)',
              background: 'var(--accent)',
              color: 'var(--ink)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 900,
              fontSize: 'var(--fs-16)',
            }}
          >
            C
          </div>
          contra
        </div>
      </div>

      <nav className="sidebar-nav">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`nav-item ${active ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar avatar-sm avatar-dark">LS</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--white-a90)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Lara Silva
          </div>
          <div
            style={{
              fontSize: 'var(--fs-11)',
              color: 'var(--white-a50)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              fontWeight: 600,
            }}
          >
            Community lead
          </div>
        </div>
      </div>
    </aside>
  );
}
