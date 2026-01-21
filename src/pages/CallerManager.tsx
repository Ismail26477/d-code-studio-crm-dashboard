'use client';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CompanyCard } from "@/components/dashboard/CompanyCard";
import { mockCompanies } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CallerManager = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCallers = mockCompanies.reduce((sum, c) => sum + c.totalCallers, 0);
  const totalLeads = mockCompanies.reduce((sum, c) => sum + c.totalLeads, 0);
  const totalCallsToday = mockCompanies.reduce((sum, c) => sum + c.callsToday, 0);

  const handleViewCallers = (companyId: string) => {
    const company = mockCompanies.find(c => c.id === companyId);
    if (company) {
      navigate(`/callers/${companyId}`, { state: { companyName: company.name } });
    }
  };

  return (
    <DashboardLayout 
      title="Caller Manager" 
      subtitle="Manage callers across companies"
    >
      {/* Action Bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input 
              placeholder="Search companies..." 
              className="max-w-md bg-card"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-card">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Companies</p>
          <p className="text-2xl font-bold text-foreground mt-1">{filteredCompanies.length}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Callers</p>
          <p className="text-2xl font-bold text-primary mt-1">{totalCallers}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Leads</p>
          <p className="text-2xl font-bold text-success mt-1">{totalLeads.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Calls Today</p>
          <p className="text-2xl font-bold text-accent-foreground mt-1">{totalCallsToday}</p>
        </div>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map((company, index) => (
          <div key={company.id} style={{ animationDelay: `${index * 100}ms` }}>
            <CompanyCard company={company} onViewCallers={handleViewCallers} />
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default CallerManager;
