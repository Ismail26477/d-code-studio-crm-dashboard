'use client';

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ClientTable } from "@/components/dashboard/ClientTable";
import { mockClients } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddClientModal } from "@/components/modals/AddClientModal";

const ClientManager = () => {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [renewalMonthFilter, setRenewalMonthFilter] = useState("all");

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch = 
      client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || client.paymentStatus === paymentFilter;
    const matchesService = serviceFilter === "all" || client.serviceType === serviceFilter;
    
    let matchesRenewalMonth = true;
    if (renewalMonthFilter !== "all") {
      const renewalDate = new Date(client.renewalDate);
      const filterMonth = parseInt(renewalMonthFilter);
      matchesRenewalMonth = renewalDate.getMonth() === filterMonth;
    }

    return matchesSearch && matchesStatus && matchesPayment && matchesService && matchesRenewalMonth;
  });

  return (
    <DashboardLayout 
      title="Client CRM Manager" 
      subtitle="Manage all client CRM systems from one place"
    >
      {/* Action Bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input 
              placeholder="Search clients by name or business..." 
              className="max-w-md bg-card"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button 
              className="gap-2 gradient-header text-white border-0 hover:opacity-90"
              onClick={() => setIsAddClientOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3 bg-muted/30 rounded-lg p-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-card">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new-lead">New Lead</SelectItem>
              <SelectItem value="deal-closed">Deal Closed</SelectItem>
              <SelectItem value="website-development">Website Development</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="payment-pending">Payment Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-card">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-card">
              <SelectValue placeholder="Service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="social-media">Social Media</SelectItem>
              <SelectItem value="ads">Ads</SelectItem>
              <SelectItem value="combo">Combo</SelectItem>
            </SelectContent>
          </Select>

          <Select value={renewalMonthFilter} onValueChange={setRenewalMonthFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-card">
              <SelectValue placeholder="Renewal Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="0">January</SelectItem>
              <SelectItem value="1">February</SelectItem>
              <SelectItem value="2">March</SelectItem>
              <SelectItem value="3">April</SelectItem>
              <SelectItem value="4">May</SelectItem>
              <SelectItem value="5">June</SelectItem>
              <SelectItem value="6">July</SelectItem>
              <SelectItem value="7">August</SelectItem>
              <SelectItem value="8">September</SelectItem>
              <SelectItem value="9">October</SelectItem>
              <SelectItem value="10">November</SelectItem>
              <SelectItem value="11">December</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Clients</p>
          <p className="text-2xl font-bold text-foreground mt-1">{filteredClients.length}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Live</p>
          <p className="text-2xl font-bold text-success mt-1">
            {filteredClients.filter(c => c.status === "live").length}
          </p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Payment Pending</p>
          <p className="text-2xl font-bold text-destructive mt-1">
            {filteredClients.filter(c => c.paymentStatus === "pending").length}
          </p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Renewal Soon</p>
          <p className="text-2xl font-bold text-warning mt-1">
            {filteredClients.filter(c => {
              const renewal = new Date(c.renewalDate);
              const today = new Date();
              const daysUntilRenewal = Math.floor((renewal.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              return daysUntilRenewal <= 7 && daysUntilRenewal >= 0;
            }).length}
          </p>
        </div>
      </div>

      {/* Client Table */}
      <ClientTable clients={filteredClients} />

      {/* Add Client Modal */}
      <AddClientModal 
        open={isAddClientOpen} 
        onOpenChange={setIsAddClientOpen}
      />
    </DashboardLayout>
  );
};

export default ClientManager;
