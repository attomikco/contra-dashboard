import ResponsiveLayout from '@/components/ResponsiveLayout';

type Props = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  hero?: React.ReactNode;
  children: React.ReactNode;
};

export default function DashboardShell({ title, subtitle, actions, hero, children }: Props) {
  return (
    <ResponsiveLayout>
      <div className="page-content">
        {hero}
        <div className="page-header">
          <div>
            <h1>{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="page-header-actions">{actions}</div>}
        </div>
        {children}
      </div>
    </ResponsiveLayout>
  );
}
