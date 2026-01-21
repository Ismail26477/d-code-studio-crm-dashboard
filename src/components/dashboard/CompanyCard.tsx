'use client';

import { Building2, Users, Target, Phone, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface CompanyCardData {
  id: string;
  name: string;
  totalCallers: number;
  totalLeads: number;
  callsToday: number;
  status: "active" | "inactive";
}

interface CompanyCardProps {
  company: CompanyCardData;
  onViewCallers: (companyId: string) => void;
}

export function CompanyCard({ company, onViewCallers }: CompanyCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 animate-fade-in group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg gradient-header flex items-center justify-center">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{company.name}</h3>
            <Badge 
              className={company.status === "active" 
                ? "bg-success/10 text-success border-success/20" 
                : "bg-muted text-muted-foreground"
              }
            >
              {company.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-border/50">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-2xl font-bold text-foreground">{company.totalCallers}</span>
          </div>
          <p className="text-xs text-muted-foreground">Callers</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-2xl font-bold text-foreground">{company.totalLeads.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground">Leads</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-success" />
            <span className="text-2xl font-bold text-foreground">{company.callsToday}</span>
          </div>
          <p className="text-xs text-muted-foreground">Today</p>
        </div>
      </div>

      <Button 
        onClick={() => onViewCallers(company.id)}
        className="w-full gradient-header text-white border-0 hover:opacity-90 gap-2 group-hover:translate-x-1 transition-transform"
      >
        View Callers
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
