import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

type Props = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  hero?: React.ReactNode;
  children: React.ReactNode;
};

export default function DashboardShell({ title, subtitle, actions, hero, children }: Props) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="page-content">
          {hero}
          <div className="page-header">
            <div>
              <h1>{title}</h1>
              {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
            {actions && <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>{actions}</div>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
