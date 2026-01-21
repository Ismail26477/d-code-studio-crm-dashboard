'use client';

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ClientTable } from "@/components/dashboard/ClientTable";
import { LeadChart } from "@/components/dashboard/LeadChart";
import { HealthStatus } from "@/components/dashboard/HealthStatus";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CompanyOverviewCards } from "@/components/dashboard/CompanyOverviewCards";
import { mockClients, mockCompanies, Company } from "@/data/mockData";
import { Building2, Users, Target, Activity, TrendingUp, AlertTriangle } from "lucide-react";

const Index = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const activeClients = mockClients.filter(c => c.status === "active").length;
  const inactiveClients = mockClients.filter(c => c.status !== "active").length;
  const totalLeads = mockClients.reduce((sum, c) => sum + c.totalLeads, 0);
  const totalCallers = mockClients.reduce((sum, c) => sum + c.totalCallers, 0);

  const handlePaymentSuccess = (companyId: string, amount: number) => {
    setCompanies(companies.map(c => {
      if (c.id === companyId) {
        const newAmountPaid = c.amountPaid + amount;
        const newPendingAmount = Math.max(0, c.pendingAmount - amount);
        return {
          ...c,
          amountPaid: newAmountPaid,
          pendingAmount: newPendingAmount,
          lastPaymentDate: new Date().toISOString().split('T')[0],
          paymentStatus: newPendingAmount === 0 ? "paid" : "partial",
          lastInvoiceStatus: newPendingAmount === 0 ? "paid" : "partial",
        };
      }
      return c;
    }));
  };

  return (
    <DashboardLayout 
      title="Master Dashboard" 
      subtitle="Overview of all client CRMs and system health"
    >
      {/* Company Overview Section */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-foreground">Company Overview</h2>
          <p className="text-sm text-muted-foreground">Real-time payment and company status dashboard</p>
        </div>
        <CompanyOverviewCards 
          companies={companies}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Total Clients"
          value={mockClients.length}
          change="+2 this month"
          changeType="positive"
          icon={Building2}
          iconColor="primary"
        />
        <StatCard
          title="Active CRMs"
          value={activeClients}
          icon={Activity}
          iconColor="success"
        />
        <StatCard
          title="Inactive CRMs"
          value={inactiveClients}
          icon={AlertTriangle}
          iconColor="warning"
        />
        <StatCard
          title="Total Callers"
          value={totalCallers}
          change="+5 this week"
          changeType="positive"
          icon={Users}
          iconColor="accent"
        />
        <StatCard
          title="Total Leads"
          value={totalLeads.toLocaleString()}
          change="+12% from last week"
          changeType="positive"
          icon={Target}
          iconColor="primary"
        />
        <StatCard
          title="Lead Conversion"
          value="24.8%"
          change="+2.3% improvement"
          changeType="positive"
          icon={TrendingUp}
          iconColor="success"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <LeadChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Health Status */}
      <div className="mb-6">
        <HealthStatus />
      </div>

      {/* Client Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Client CRMs</h2>
            <p className="text-sm text-muted-foreground">Manage and monitor all client systems</p>
          </div>
        </div>
        <ClientTable clients={mockClients} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
