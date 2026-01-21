import { Building2, AlertCircle, Calendar, MessageSquare, FileText, Send, Eye, CreditCard, ExternalLink, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface Client {
  id: string;
  clientName: string;
  businessName: string;
  status: "new-lead" | "deal-closed" | "website-development" | "live" | "maintenance" | "payment-pending" | "suspended";
  serviceType: "website" | "social-media" | "ads" | "combo";
  planType: "basic" | "standard" | "pro" | "custom";
  priority: "high" | "medium" | "low";
  paymentStatus: "paid" | "partial" | "pending";
  renewalDate: string;
  lastPaymentAmount: number;
  lastPaymentDate: string | null;
  totalLeads: number;
  totalCallers: number;
  lastActivity: string;
}

interface ClientTableProps {
  clients: Client[];
}

const statusStyles = {
  "new-lead": "bg-blue-500/10 text-blue-600 border-blue-200",
  "deal-closed": "bg-green-500/10 text-green-600 border-green-200",
  "website-development": "bg-purple-500/10 text-purple-600 border-purple-200",
  live: "bg-success/10 text-success border-success/20",
  maintenance: "bg-warning/10 text-warning border-warning/20",
  "payment-pending": "bg-orange-500/10 text-orange-600 border-orange-200",
  suspended: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels = {
  "new-lead": "New Lead",
  "deal-closed": "Deal Closed",
  "website-development": "Website in Development",
  live: "Live",
  maintenance: "Maintenance",
  "payment-pending": "Payment Pending",
  suspended: "Suspended",
};

const serviceTypeLabels = {
  website: "Website",
  "social-media": "Social Media",
  ads: "Ads",
  combo: "Combo",
};

const serviceTypeColors = {
  website: "bg-blue-100 text-blue-700",
  "social-media": "bg-purple-100 text-purple-700",
  ads: "bg-orange-100 text-orange-700",
  combo: "bg-green-100 text-green-700",
};

const priorityColors = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-gray-100 text-gray-700",
};

const paymentStatusStyles = {
  paid: "bg-success/10 text-success",
  partial: "bg-warning/10 text-warning",
  pending: "bg-destructive/10 text-destructive",
};

const isRenewalSoon = (renewalDate: string): boolean => {
  const renewal = new Date(renewalDate);
  const today = new Date();
  const daysUntilRenewal = Math.floor((renewal.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilRenewal <= 7 && daysUntilRenewal >= 0;
};

export function ClientTable({ clients }: ClientTableProps) {
  return (
    <TooltipProvider>
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Client</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Service</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Plan</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Payment</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Renewal</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Priority</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => {
                const alertCondition = client.paymentStatus === "pending" || isRenewalSoon(client.renewalDate);
                return (
                  <tr 
                    key={client.id} 
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-primary" />
                          </div>
                          {alertCondition && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertCircle className="w-5 h-5 text-destructive" />
                              </TooltipTrigger>
                              <TooltipContent>
                                {client.paymentStatus === "pending" && "Payment Pending"}
                                {isRenewalSoon(client.renewalDate) && client.paymentStatus === "pending" && " • "}
                                {isRenewalSoon(client.renewalDate) && "Renewal in 7 days"}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{client.clientName}</p>
                          <p className="text-xs text-muted-foreground">{client.businessName}</p>
                          {client.lastPaymentAmount > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Last paid ₹{client.lastPaymentAmount.toLocaleString()} on {client.lastPaymentDate ? new Date(client.lastPaymentDate).toLocaleDateString() : "N/A"}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className={statusStyles[client.status]}>
                        {statusLabels[client.status]}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={serviceTypeColors[client.serviceType]}>
                        {serviceTypeLabels[client.serviceType]}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-foreground capitalize">{client.planType}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={paymentStatusStyles[client.paymentStatus]}>
                        {client.paymentStatus === "paid" ? "Paid" : client.paymentStatus === "partial" ? "Partial" : "Pending"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{new Date(client.renewalDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={priorityColors[client.priority]}>
                        {client.priority.charAt(0).toUpperCase() + client.priority.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View Client</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <CreditCard className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Add Payment</TooltipContent>
                        </Tooltip>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">More options</span>
                              <span className="text-2xl leading-none">⋯</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Add Note
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <FileText className="w-4 h-4" />
                              Generate Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Send className="w-4 h-4" />
                              Send WhatsApp
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </TooltipProvider>
  );
}
