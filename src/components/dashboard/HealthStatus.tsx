import { CheckCircle, AlertTriangle, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HealthItem {
  id: string;
  clientName: string;
  leadFlow: "healthy" | "warning" | "critical";
  integrations: "healthy" | "warning" | "critical";
  callerActivity: "healthy" | "warning" | "critical";
  lastSync: string;
}

const healthData: HealthItem[] = [
  { id: "1", clientName: "TechStart Inc.", leadFlow: "healthy", integrations: "healthy", callerActivity: "healthy", lastSync: "2 min ago" },
  { id: "2", clientName: "GrowthLabs", leadFlow: "warning", integrations: "healthy", callerActivity: "warning", lastSync: "15 min ago" },
  { id: "3", clientName: "Nova Digital", leadFlow: "healthy", integrations: "critical", callerActivity: "healthy", lastSync: "1 hour ago" },
  { id: "4", clientName: "Quantum Corp", leadFlow: "healthy", integrations: "healthy", callerActivity: "healthy", lastSync: "5 min ago" },
];

const StatusIcon = ({ status }: { status: "healthy" | "warning" | "critical" }) => {
  if (status === "healthy") return <CheckCircle className="w-4 h-4 text-success" />;
  if (status === "warning") return <AlertTriangle className="w-4 h-4 text-warning" />;
  return <XCircle className="w-4 h-4 text-destructive" />;
};

export function HealthStatus() {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">CRM Health Monitor</h3>
          <p className="text-sm text-muted-foreground">Real-time system status</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>
      <div className="divide-y divide-border">
        {healthData.map((item) => (
          <div key={item.id} className="p-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {item.clientName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.clientName}</p>
                  <p className="text-xs text-muted-foreground">Last sync: {item.lastSync}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <StatusIcon status={item.leadFlow} />
                  <span className="text-xs text-muted-foreground">Leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon status={item.integrations} />
                  <span className="text-xs text-muted-foreground">Integrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon status={item.callerActivity} />
                  <span className="text-xs text-muted-foreground">Callers</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
