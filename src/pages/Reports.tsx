import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Download, 
  FileText, 
  Calendar,
  Filter,
  AlertCircle,
  CheckCircle,
  Info,
  Clock
} from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "error";
  action: string;
  user: string;
  client: string;
  details: string;
}

const logs: LogEntry[] = [
  { id: "1", timestamp: "2024-01-21 14:32:15", type: "success", action: "Caller Added", user: "Admin", client: "TechStart Inc.", details: "New caller John Smith added to CRM" },
  { id: "2", timestamp: "2024-01-21 14:28:42", type: "info", action: "Lead Assigned", user: "Admin", client: "GrowthLabs", details: "15 leads assigned to caller team" },
  { id: "3", timestamp: "2024-01-21 14:15:33", type: "success", action: "Integration Connected", user: "System", client: "Nova Digital", details: "Meta Ads integration connected successfully" },
  { id: "4", timestamp: "2024-01-21 13:45:21", type: "warning", action: "Low Activity Alert", user: "System", client: "Quantum Corp", details: "Caller activity below threshold" },
  { id: "5", timestamp: "2024-01-21 13:22:18", type: "error", action: "Webhook Failed", user: "System", client: "Nova Digital", details: "Webhook connection timed out" },
  { id: "6", timestamp: "2024-01-21 12:55:44", type: "info", action: "Lead Reassigned", user: "Admin", client: "TechStart Inc.", details: "8 leads reassigned from inactive caller" },
  { id: "7", timestamp: "2024-01-21 12:30:12", type: "success", action: "CRM Activated", user: "Admin", client: "Spark Ventures", details: "CRM system activated for new client" },
  { id: "8", timestamp: "2024-01-21 11:45:33", type: "info", action: "Report Generated", user: "Admin", client: "All", details: "Weekly performance report generated" },
];

const typeStyles = {
  info: { bg: "bg-primary/10", text: "text-primary", icon: Info },
  success: { bg: "bg-success/10", text: "text-success", icon: CheckCircle },
  warning: { bg: "bg-warning/10", text: "text-warning", icon: AlertCircle },
  error: { bg: "bg-destructive/10", text: "text-destructive", icon: AlertCircle },
};

const Reports = () => {
  return (
    <DashboardLayout 
      title="Reports & Logs" 
      subtitle="Activity logs, reports, and system audit trail"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Actions Today</p>
          <p className="text-2xl font-bold text-foreground mt-1">127</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Successful</p>
          <p className="text-2xl font-bold text-success mt-1">98</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Warnings</p>
          <p className="text-2xl font-bold text-warning mt-1">23</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Errors</p>
          <p className="text-2xl font-bold text-destructive mt-1">6</p>
        </div>
      </div>

      {/* Report Actions */}
      <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Generate Reports</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Daily Summary
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Weekly Performance
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Monthly Analytics
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Client Report
          </Button>
          <Button className="gap-2 gradient-header text-white border-0 hover:opacity-90">
            <Download className="w-4 h-4" />
            Export All Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input 
            placeholder="Search logs..." 
            className="max-w-md bg-card"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-32 bg-card">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="today">
            <SelectTrigger className="w-36 bg-card">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Activity Log</h3>
          <p className="text-sm text-muted-foreground">Complete audit trail of all system actions</p>
        </div>
        <div className="divide-y divide-border">
          {logs.map((log, index) => {
            const style = typeStyles[log.type];
            const Icon = style.icon;
            return (
              <div 
                key={log.id} 
                className="p-4 hover:bg-muted/30 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${style.bg}`}>
                    <Icon className={`w-5 h-5 ${style.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-foreground">{log.action}</h4>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{log.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">{log.client}</Badge>
                      <span className="text-xs text-muted-foreground">by {log.user}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-4 border-t border-border text-center">
          <Button variant="ghost" className="text-primary">
            Load More Logs
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
