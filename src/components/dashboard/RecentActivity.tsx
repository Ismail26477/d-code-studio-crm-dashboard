import { UserPlus, Target, Plug, AlertCircle } from "lucide-react";

interface Activity {
  id: string;
  type: "caller_added" | "lead_assigned" | "integration" | "alert";
  message: string;
  time: string;
  client: string;
}

const activities: Activity[] = [
  { id: "1", type: "caller_added", message: "New caller John Smith added", time: "5 min ago", client: "TechStart Inc." },
  { id: "2", type: "lead_assigned", message: "15 leads assigned to caller team", time: "12 min ago", client: "GrowthLabs" },
  { id: "3", type: "integration", message: "Meta Ads integration connected", time: "25 min ago", client: "Nova Digital" },
  { id: "4", type: "alert", message: "Low caller activity detected", time: "1 hour ago", client: "Quantum Corp" },
  { id: "5", type: "lead_assigned", message: "8 leads reassigned", time: "2 hours ago", client: "TechStart Inc." },
];

const iconMap = {
  caller_added: UserPlus,
  lead_assigned: Target,
  integration: Plug,
  alert: AlertCircle,
};

const colorMap = {
  caller_added: "bg-success/10 text-success",
  lead_assigned: "bg-primary/10 text-primary",
  integration: "bg-accent/20 text-accent-foreground",
  alert: "bg-warning/10 text-warning",
};

export function RecentActivity() {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest actions across all CRMs</p>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div key={activity.id} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorMap[activity.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.client}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-border">
        <button className="text-sm text-primary font-medium hover:underline w-full text-center">
          View All Activity
        </button>
      </div>
    </div>
  );
}
