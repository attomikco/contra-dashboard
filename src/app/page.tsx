import DashboardShell from '@/components/layout/DashboardShell';
import SectionHeader from '@/components/layout/SectionHeader';
import KpiStrip from '@/components/KpiStrip';
import SyncCommunityModule from '@/components/SyncCommunityModule';
import AttentionPanel from '@/components/AttentionPanel';
import UpcomingEventsPanel from '@/components/UpcomingEventsPanel';
import FeaturedEvent from '@/components/FeaturedEvent';
import { COMMUNITY } from '@/lib/mock-data';

export default function OverviewPage() {
  return (
    <DashboardShell
      title="Overview"
      subtitle={`${COMMUNITY.member_count.toLocaleString()} members · ${COMMUNITY.active_this_week} active this week`}
      hero={<FeaturedEvent />}
      actions={
        <>
          <button className="btn btn-secondary btn-sm">Export</button>
          <button className="btn btn-primary btn-sm">Run segment</button>
        </>
      }
    >
      <KpiStrip />

      <SectionHeader title="Sync community" />
      <SyncCommunityModule />

      <SectionHeader title="Operate" />
      <div className="grid-2">
        <AttentionPanel />
        <UpcomingEventsPanel />
      </div>
    </DashboardShell>
  );
}
