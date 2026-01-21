import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { mockClients } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Facebook, 
  Globe, 
  FileSpreadsheet, 
  MessageCircle, 
  Webhook, 
  CheckCircle, 
  XCircle,
  Copy,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  icon: React.ElementType;
  enabled: boolean;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
}

const integrations: Integration[] = [
  { id: "meta", name: "Meta Ads", icon: Facebook, enabled: true, status: "connected", lastSync: "5 min ago" },
  { id: "website", name: "Website Forms", icon: Globe, enabled: true, status: "connected", lastSync: "2 min ago" },
  { id: "google", name: "Google Forms", icon: FileSpreadsheet, enabled: false, status: "disconnected" },
  { id: "whatsapp", name: "WhatsApp API", icon: MessageCircle, enabled: true, status: "connected", lastSync: "1 min ago" },
  { id: "webhook", name: "Custom Webhooks", icon: Webhook, enabled: true, status: "error", lastSync: "1 hour ago" },
];

const IntegrationManager = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedClient, setSelectedClient] = useState("all");

  return (
    <DashboardLayout 
      title="Integration Manager" 
      subtitle="Control integrations for all client CRMs"
    >
      {/* Client Selector */}
      <div className="mb-6">
        <Select value={selectedClient} onValueChange={setSelectedClient}>
          <SelectTrigger className="w-64 bg-card">
            <SelectValue placeholder="Select Client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clients (Overview)</SelectItem>
            {mockClients.map(client => (
              <SelectItem key={client.id} value={client.id}>{client.businessName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {integrations.map((integration, index) => (
          <div 
            key={integration.id}
            className="bg-card rounded-xl p-6 shadow-card border border-border/50 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  integration.enabled ? "bg-primary/10" : "bg-muted"
                }`}>
                  <integration.icon className={`w-6 h-6 ${
                    integration.enabled ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{integration.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {integration.status === "connected" && (
                      <>
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-sm text-success">Connected</span>
                      </>
                    )}
                    {integration.status === "disconnected" && (
                      <>
                        <XCircle className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Disconnected</span>
                      </>
                    )}
                    {integration.status === "error" && (
                      <>
                        <XCircle className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-destructive">Error</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Switch checked={integration.enabled} />
            </div>

            {integration.enabled && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    API Key
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input 
                        type={showApiKey ? "text" : "password"}
                        value="sk_live_xxxxxxxxxxxxxxxxxxxx"
                        readOnly
                        className="pr-10 bg-muted/50"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button variant="outline" size="icon">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Webhook URL
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      value="https://api.dcode.studio/webhook/abc123"
                      readOnly
                      className="bg-muted/50"
                    />
                    <Button variant="outline" size="icon">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {integration.lastSync && (
                    <span className="text-sm text-muted-foreground">
                      Last sync: {integration.lastSync}
                    </span>
                  )}
                  <Button variant="outline" size="sm" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Test Connection
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Integration Status Overview */}
      <div className="bg-card rounded-xl shadow-card border border-border/50 overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Integration Status by Client</h3>
          <p className="text-sm text-muted-foreground">Quick overview of all client integrations</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Client</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">Meta Ads</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">Website</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">Google Forms</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">WhatsApp</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">Webhooks</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.slice(0, 4).map((client) => (
                <tr key={client.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-foreground">{client.businessName}</td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="w-5 h-5 text-success mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="w-5 h-5 text-success mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <CheckCircle className="w-5 h-5 text-success mx-auto" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    {client.status === "maintenance" ? (
                      <XCircle className="w-5 h-5 text-destructive mx-auto" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-success mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IntegrationManager;
