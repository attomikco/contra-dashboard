import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import KpiStrip from '@/components/KpiStrip';
import SyncCommunityModule from '@/components/SyncCommunityModule';
import AttentionPanel from '@/components/AttentionPanel';
import UpcomingEventsPanel from '@/components/UpcomingEventsPanel';
import { COMMUNITY } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main">
        <Topbar />

        <div className="page-content">
          {/* Page header */}
          <div className="page-header">
            <div>
              <h1>Community</h1>
              <p className="page-subtitle">
                {COMMUNITY.member_count.toLocaleString()} members · {COMMUNITY.active_this_week} active this week
              </p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
              <button className="btn btn-secondary btn-sm">Export</button>
              <button className="btn btn-primary btn-sm">Run segment</button>
            </div>
          </div>

          {/* KPI strip */}
          <KpiStrip />

          {/* Section: Sync community */}
          <div className="section-header">
            <span className="section-header-bar" />
            <span className="section-header-title">Sync community</span>
            <span className="section-header-line" />
          </div>

          <SyncCommunityModule />

          {/* Section: Operate */}
          <div className="section-header">
            <span className="section-header-bar" />
            <span className="section-header-title">Operate</span>
            <span className="section-header-line" />
          </div>

          <div className="grid-2">
            <AttentionPanel />
            <UpcomingEventsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
