'use client';

import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CallerListCard } from "@/components/dashboard/CallerListCard";
import { mockCallers, mockCompanies } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddCallerModal } from "@/components/modals/AddCallerModal";
import { EditCallerModal } from "@/components/modals/EditCallerModal";
import { DeleteCallerModal } from "@/components/modals/DeleteCallerModal";
import { Caller } from "@/components/dashboard/CallerCard";

const CompanyCallersList = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddCallerOpen, setIsAddCallerOpen] = useState(false);
  const [isEditCallerOpen, setIsEditCallerOpen] = useState(false);
  const [isDeleteCallerOpen, setIsDeleteCallerOpen] = useState(false);
  const [selectedCaller, setSelectedCaller] = useState<Caller | null>(null);
  const [callerToDelete, setCallerToDelete] = useState<Caller | null>(null);

  const company = mockCompanies.find(c => c.id === companyId);
  const companyName = (location.state as any)?.companyName || company?.name || "Unknown Company";

  const companyCallers = mockCallers.filter(c => c.company === companyName);

  const filteredCallers = companyCallers.filter((caller) => {
    const matchesSearch = 
      caller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caller.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || caller.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCallers = filteredCallers.filter(c => c.status === "active").length;
  const totalLeads = filteredCallers.reduce((sum, c) => sum + c.leadsAssigned, 0);
  const totalCalls = filteredCallers.reduce((sum, c) => sum + c.callsToday, 0);

  const handleEditCaller = (caller: Caller) => {
    setSelectedCaller(caller);
    setIsEditCallerOpen(true);
  };

  const handleDeleteCaller = (caller: Caller) => {
    setCallerToDelete(caller);
    setIsDeleteCallerOpen(true);
  };

  return (
    <DashboardLayout 
      title="Caller Manager" 
      subtitle={`Manage callers for ${companyName}`}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 -ml-2"
          onClick={() => navigate("/callers")}
        >
          <ChevronLeft className="w-4 h-4" />
          Caller Manager
        </Button>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">{companyName}</span>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input 
              placeholder="Search callers by name or email..." 
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
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              className="gap-2 gradient-header text-white border-0 hover:opacity-90"
              onClick={() => setIsAddCallerOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Caller
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Callers</p>
          <p className="text-2xl font-bold text-foreground mt-1">{filteredCallers.length}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-success mt-1">{activeCallers}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Total Leads</p>
          <p className="text-2xl font-bold text-primary mt-1">{totalLeads}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
          <p className="text-sm text-muted-foreground">Calls Today</p>
          <p className="text-2xl font-bold text-accent-foreground mt-1">{totalCalls}</p>
        </div>
      </div>

      {/* Callers List */}
      {filteredCallers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCallers.map((caller, index) => (
            <div key={caller.id} style={{ animationDelay: `${index * 50}ms` }}>
              <CallerListCard 
                caller={caller}
                onEdit={handleEditCaller}
                onDelete={handleDeleteCaller}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl p-12 shadow-card border border-border/50 text-center">
          <p className="text-muted-foreground mb-4">No callers found for this company</p>
          <Button 
            className="gap-2 gradient-header text-white border-0 hover:opacity-90"
            onClick={() => setIsAddCallerOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add First Caller
          </Button>
        </div>
      )}

      {/* Add Caller Modal */}
      <AddCallerModal 
        open={isAddCallerOpen} 
        onOpenChange={setIsAddCallerOpen}
        preselectedCompany={companyName}
      />

      {/* Edit Caller Modal */}
      <EditCallerModal
        open={isEditCallerOpen}
        onOpenChange={setIsEditCallerOpen}
        caller={selectedCaller}
      />

      {/* Delete Caller Modal */}
      {callerToDelete && (
        <DeleteCallerModal
          open={isDeleteCallerOpen}
          onOpenChange={setIsDeleteCallerOpen}
          callerName={callerToDelete.name}
          onConfirm={() => {
            // Handle delete logic here
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default CompanyCallersList;
