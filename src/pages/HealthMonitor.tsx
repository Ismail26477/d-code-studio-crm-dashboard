import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockClients } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw,
  Activity,
  Server,
  Database,
  Zap
} from "lucide-react";

interface HealthMetric {
  label: string;
  status: "healthy" | "warning" | "critical";
  value: number;
  details: string;
}

interface ClientHealth {
  clientId: string;
  clientName: string;
  overallStatus: "healthy" | "warning" | "critical";
  uptime: number;
  lastSync: string;
  metrics: HealthMetric[];
}

const clientHealthData: ClientHealth[] = [
  {
    clientId: "1",
    clientName: "TechStart Inc.",
    overallStatus: "healthy",
    uptime: 99.9,
    lastSync: "2 min ago",
    metrics: [
      { label: "Lead Flow", status: "healthy", value: 100, details: "127 leads today" },
      { label: "Caller Activity", status: "healthy", value: 95, details: "5 callers active" },
      { label: "Integrations", status: "healthy", value: 100, details: "All connected" },
      { label: "Database", status: "healthy", value: 100, details: "Synced" },
    ],
  },
  {
    clientId: "2",
    clientName: "GrowthLabs",
    overallStatus: "warning",
    uptime: 98.5,
    lastSync: "15 min ago",
    metrics: [
      { label: "Lead Flow", status: "warning", value: 60, details: "Low activity" },
      { label: "Caller Activity", status: "warning", value: 45, details: "1 of 3 active" },
      { label: "Integrations", status: "healthy", value: 100, details: "All connected" },
      { label: "Database", status: "healthy", value: 100, details: "Synced" },
    ],
  },
  {
    clientId: "3",
    clientName: "Nova Digital",
    overallStatus: "critical",
    uptime: 95.2,
    lastSync: "1 hour ago",
    metrics: [
      { label: "Lead Flow", status: "healthy", value: 85, details: "42 leads today" },
      { label: "Caller Activity", status: "healthy", value: 80, details: "3 callers active" },
      { label: "Integrations", status: "critical", value: 25, details: "Webhook failed" },
      { label: "Database", status: "warning", value: 70, details: "Sync delayed" },
    ],
  },
  {
    clientId: "4",
    clientName: "Quantum Corp",
    overallStatus: "healthy",
    uptime: 99.8,
    lastSync: "5 min ago",
    metrics: [
      { label: "Lead Flow", status: "healthy", value: 100, details: "203 leads today" },
      { label: "Caller Activity", status: "healthy", value: 100, details: "8 callers active" },
      { label: "Integrations", status: "healthy", value: 100, details: "All connected" },
      { label: "Database", status: "healthy", value: 100, details: "Synced" },
    ],
  },
];

const StatusIcon = ({ status }: { status: "healthy" | "warning" | "critical" }) => {
  if (status === "healthy") return <CheckCircle className="w-5 h-5 text-success" />;
  if (status === "warning") return <AlertTriangle className="w-5 h-5 text-warning" />;
  return <XCircle className="w-5 h-5 text-destructive" />;
};

const getProgressColor = (status: "healthy" | "warning" | "critical") => {
  if (status === "healthy") return "bg-success";
  if (status === "warning") return "bg-warning";
  return "bg-destructive";
};

const HealthMonitor = () => {
  const healthyCount = clientHealthData.filter(c => c.overallStatus === "healthy").length;
  const warningCount = clientHealthData.filter(c => c.overallStatus === "warning").length;
  const criticalCount = clientHealthData.filter(c => c.overallStatus === "critical").length;

  return (
    <DashboardLayout 
      title="CRM Health Monitor" 
      subtitle="Real-time monitoring of all client CRM systems"
    >
      {/* System Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{healthyCount}</p>
              <p className="text-sm text-muted-foreground">Healthy</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{warningCount}</p>
              <p className="text-sm text-muted-foreground">Warnings</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{criticalCount}</p>
              <p className="text-sm text-muted-foreground">Critical</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">99.2%</p>
              <p className="text-sm text-muted-foreground">Avg Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end mb-4">
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh All
        </Button>
      </div>

      {/* Client Health Cards */}
      <div className="space-y-4">
        {clientHealthData.map((client, index) => (
          <div 
            key={client.clientId}
            className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <StatusIcon status={client.overallStatus} />
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{client.clientName}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        Uptime: <span className="font-medium text-foreground">{client.uptime}%</span>
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Last sync: {client.lastSync}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    client.overallStatus === "healthy" 
                      ? "bg-success/10 text-success border-success/20"
                      : client.overallStatus === "warning"
                      ? "bg-warning/10 text-warning border-warning/20"
                      : "bg-destructive/10 text-destructive border-destructive/20"
                  }
                >
                  {client.overallStatus === "healthy" ? "Healthy" : client.overallStatus === "warning" ? "Warning" : "Critical"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {client.metrics.map((metric) => (
                  <div key={metric.label} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{metric.label}</span>
                      <StatusIcon status={metric.status} />
                    </div>
                    <div className="mb-2">
                      <Progress 
                        value={metric.value} 
                        className="h-2"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default HealthMonitor;
