import ResponsiveLayout from '@/components/ResponsiveLayout';
import FeaturedEvent from '@/components/FeaturedEvent';
import KpiStrip from '@/components/KpiStrip';
import SyncCommunityModule from '@/components/SyncCommunityModule';
import AttentionPanel from '@/components/AttentionPanel';
import UpcomingEventsPanel from '@/components/UpcomingEventsPanel';
import { COMMUNITY } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <ResponsiveLayout>
      <div className="page-content">
        <FeaturedEvent />

        <div className="page-header">
          <div>
            <h1>Community</h1>
            <p className="page-subtitle">
              {COMMUNITY.member_count.toLocaleString()} members · {COMMUNITY.active_this_week} active this week
            </p>
          </div>

          <div className="page-header-actions">
            <button className="btn btn-secondary btn-sm">Export</button>
            <button className="btn btn-primary btn-sm">Run segment</button>
          </div>
        </div>

        <KpiStrip />

        <div className="section-header">
          <span className="section-header-bar" />
          <span className="section-header-title">Sync community</span>
          <span className="section-header-line" />
        </div>

        <SyncCommunityModule />

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
    </ResponsiveLayout>
  );
}
