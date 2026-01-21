import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockLeads, mockClients, Lead } from "@/data/mockData";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Download, MoreVertical, UserPlus, RefreshCw } from "lucide-react";
import { AssignLeadModal } from "@/components/modals/AssignLeadModal";

const statusStyles = {
  new: "bg-success/10 text-success border-success/20",
  assigned: "bg-primary/10 text-primary border-primary/20",
  "follow-up": "bg-warning/10 text-warning border-warning/20",
  closed: "bg-muted text-muted-foreground border-muted",
};

const statusLabels = {
  new: "New",
  assigned: "Assigned",
  "follow-up": "Follow-up",
  closed: "Closed",
};

const LeadCenter = () => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const totalLeads = mockClients.reduce((sum, c) => sum + c.totalLeads, 0);
  const newLeads = mockLeads.filter(l => l.status === "new").length;
  const assignedLeads = mockLeads.filter(l => l.status === "assigned").length;
  const followUpLeads = mockLeads.filter(l => l.status === "follow-up").length;

  const handleAssignClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsAssignModalOpen(true);
  };

  return (
    <DashboardLayout 
      title="Lead Control Center" 
      subtitle="Monitor and manage leads across all client CRMs"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Leads</p>
          <p className="text-2xl font-bold text-foreground mt-1">{totalLeads.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">New Leads</p>
          <p className="text-2xl font-bold text-success mt-1">{newLeads}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Assigned</p>
          <p className="text-2xl font-bold text-primary mt-1">{assignedLeads}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Follow-up</p>
          <p className="text-2xl font-bold text-warning mt-1">{followUpLeads}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Closed Today</p>
          <p className="text-2xl font-bold text-muted-foreground mt-1">24</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input 
            placeholder="Search leads by name, email, or phone..." 
            className="max-w-md bg-card"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-card">
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              {mockClients.map(client => (
                <SelectItem key={client.id} value={client.id}>{client.businessName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-32 bg-card">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Lead</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Client</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Source</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Assigned To</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Created</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockLeads.map((lead, index) => (
                <tr 
                  key={lead.id} 
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                      <p className="text-sm text-muted-foreground">{lead.phone}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-foreground">{lead.client}</span>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className="bg-muted/50">{lead.source}</Badge>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="outline" className={statusStyles[lead.status]}>
                      {statusLabels[lead.status]}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    {lead.assignedCaller ? (
                      <span className="text-sm text-foreground">{lead.assignedCaller}</span>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:text-primary gap-1"
                        onClick={() => handleAssignClick(lead)}
                      >
                        <UserPlus className="w-3 h-3" />
                        Assign
                      </Button>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted-foreground">{lead.createdAt}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleAssignClick(lead)}
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reassign
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View History</DropdownMenuItem>
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete Lead</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Lead Modal */}
      <AssignLeadModal
        open={isAssignModalOpen}
        onOpenChange={setIsAssignModalOpen}
        lead={selectedLead}
      />
    </DashboardLayout>
  );
};

export default LeadCenter;
