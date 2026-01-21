import { User, Phone, Target, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Caller {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedClient: string;
  company: string;
  status: "active" | "disabled";
  leadsAssigned: number;
  callsToday: number;
  dailyCallTarget?: number;
}

interface CallerCardProps {
  caller: Caller;
}

export function CallerCard({ caller }: CallerCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-header flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{caller.name}</h3>
            <p className="text-sm text-muted-foreground">{caller.email}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Caller</DropdownMenuItem>
            <DropdownMenuItem>Reassign Client</DropdownMenuItem>
            <DropdownMenuItem>View Activity</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Remove Caller</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Assigned Client</span>
          <span className="text-sm font-medium text-foreground">{caller.assignedClient}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <Badge 
            variant="outline" 
            className={caller.status === "active" 
              ? "bg-success/10 text-success border-success/20" 
              : "bg-muted text-muted-foreground"
            }
          >
            {caller.status === "active" ? "Active" : "Disabled"}
          </Badge>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{caller.leadsAssigned}</p>
            <p className="text-xs text-muted-foreground">Leads</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <Phone className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{caller.callsToday}</p>
            <p className="text-xs text-muted-foreground">Calls Today</p>
          </div>
        </div>
      </div>
    </div>
  );
}
