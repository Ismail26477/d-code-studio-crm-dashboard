import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  Key,
  Users,
  Mail,
  Globe,
  Save
} from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout 
      title="System Settings" 
      subtitle="Configure your CRM control center"
    >
      <div className="max-w-4xl space-y-6">
        {/* Company Info */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Company Information</h3>
              <p className="text-sm text-muted-foreground">Update your company details</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Company Name</label>
              <Input defaultValue="D-Code Studio" className="bg-muted/30" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Contact Email</label>
              <Input defaultValue="admin@dcode.studio" className="bg-muted/30" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Website</label>
              <Input defaultValue="https://dcode.studio" className="bg-muted/30" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Support Email</label>
              <Input defaultValue="support@dcode.studio" className="bg-muted/30" />
            </div>
          </div>
        </div>

        {/* Role Management */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Role Management</h3>
              <p className="text-sm text-muted-foreground">Manage user roles and permissions</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Super Admin</p>
                <p className="text-sm text-muted-foreground">Full system access</p>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">2 users</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Company Admin</p>
                <p className="text-sm text-muted-foreground">Limited control access</p>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">5 users</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Client</p>
                <p className="text-sm text-muted-foreground">Own CRM access only</p>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">24 users</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Caller</p>
                <p className="text-sm text-muted-foreground">Assigned leads only</p>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">48 users</Badge>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">Configure alert preferences</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Lead Flow Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when lead flow stops</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Integration Failures</p>
                <p className="text-sm text-muted-foreground">Alert when integrations fail</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Low Caller Activity</p>
                <p className="text-sm text-muted-foreground">Notify when callers are inactive</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Daily Summary Email</p>
                <p className="text-sm text-muted-foreground">Receive daily performance summary</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Security</h3>
              <p className="text-sm text-muted-foreground">Security and access settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Require 2FA for all admins</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Session Timeout</p>
                <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">IP Whitelist</p>
                <p className="text-sm text-muted-foreground">Restrict access by IP address</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">API Configuration</h3>
              <p className="text-sm text-muted-foreground">Manage API keys and webhooks</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Master API Key</label>
              <div className="flex gap-2">
                <Input type="password" value="sk_master_xxxxxxxxxxxxxxxxxxxx" readOnly className="bg-muted/30" />
                <Button variant="outline">Regenerate</Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Webhook Secret</label>
              <div className="flex gap-2">
                <Input type="password" value="whsec_xxxxxxxxxxxxxxxxxxxx" readOnly className="bg-muted/30" />
                <Button variant="outline">Regenerate</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="gap-2 gradient-header text-white border-0 hover:opacity-90">
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
