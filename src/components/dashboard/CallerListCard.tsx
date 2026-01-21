'use client';

import { Phone, Mail, Trash2, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Caller } from "./CallerCard";

interface CallerListCardProps {
  caller: Caller;
  onEdit: (caller: Caller) => void;
  onDelete: (callerId: string) => void;
}

export function CallerListCard({ caller, onEdit, onDelete }: CallerListCardProps) {
  return (
    <div className="bg-card rounded-lg p-4 shadow-card border border-border/50 hover:shadow-card-hover transition-all duration-300 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-foreground">{caller.name}</h4>
          <div className="flex items-center gap-3 mt-2">
            <a href={`mailto:${caller.email}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
              <Mail className="w-4 h-4" />
              {caller.email}
            </a>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <a href={`tel:${caller.phone}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary">
              <Phone className="w-4 h-4" />
              {caller.phone}
            </a>
          </div>
        </div>
        <Badge 
          className={caller.status === "active" 
            ? "bg-success/10 text-success border-success/20" 
            : "bg-muted text-muted-foreground"
          }
        >
          {caller.status === "active" ? "Active" : "Disabled"}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-t border-border/50">
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">Leads Assigned</p>
          <p className="text-lg font-bold text-foreground">{caller.leadsAssigned}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">Calls Today</p>
          <p className="text-lg font-bold text-foreground">{caller.callsToday}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground">Daily Target</p>
          <p className="text-lg font-bold text-foreground">{caller.dailyCallTarget || "-"}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 gap-2 bg-transparent"
          onClick={() => onEdit(caller)}
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 gap-2 text-destructive hover:text-destructive bg-transparent"
          onClick={() => onDelete(caller.id)}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
