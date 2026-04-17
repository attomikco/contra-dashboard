'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, UserPlus, Crown,
  Calendar, Ticket, Archive,
  MessageSquare, Store, Image as ImageIcon, BarChart3,
  type LucideIcon,
} from 'lucide-react';

type Item = { href: string; label: string; icon: LucideIcon };
type Group = { label?: string; items: Item[] };

const nav: Group[] = [
  { items: [ { href: '/', label: 'Overview', icon: LayoutDashboard } ] },
  { label: 'Community', items: [
      { href: '/community/members',      label: 'Members',        icon: Users },
      { href: '/community/applications', label: 'Applications',   icon: UserPlus },
      { href: '/community/tiers',        label: 'Tiers & access', icon: Crown },
  ]},
  { label: 'Events', items: [
      { href: '/events/upcoming', label: 'Upcoming',           icon: Calendar },
      { href: '/events/tickets',  label: 'Tickets & check-in', icon: Ticket },
      { href: '/events/past',     label: 'Past & content',     icon: Archive },
  ]},
  { label: 'Platform', items: [
      { href: '/messaging', label: 'Messaging',       icon: MessageSquare },
      { href: '/vendors',   label: 'Vendors',         icon: Store },
      { href: '/content',   label: 'Content library', icon: ImageIcon },
      { href: '/analytics', label: 'Analytics',       icon: BarChart3 },
  ]},
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen = false }: SidebarProps = {}) {
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-logo">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--sp-3)',
          color: 'var(--paper)', fontFamily: 'var(--font-sans)',
          fontWeight: 900, fontSize: 'var(--text-xl)', letterSpacing: '-0.04em',
        }}>
          CONTRA
        </div>
      </div>

      <nav className="sidebar-nav">
        {nav.map((group, gi) => (
          <div key={gi} style={{ marginBottom: 'var(--sp-3)' }}>
            {group.label && (
              <div style={{
                padding: 'var(--sp-3) var(--sp-6) var(--sp-1)',
                fontSize: 'var(--fs-10)', color: 'var(--white-a40)',
                textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600,
              }}>
                {group.label}
              </div>
            )}
            {group.items.map(({ href, label, icon: Icon }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`nav-item ${active ? 'active' : ''}`}>
                  <Icon size={18} strokeWidth={2} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar avatar-sm avatar-dark">NO</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--white-a90)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Nadia Oliveira
          </div>
          <div style={{ fontSize: 'var(--fs-11)', color: 'var(--white-a50)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>
            Community lead
          </div>
        </div>
      </div>
    </aside>
  );
}
