import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { mockCallers, Lead } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, Building } from "lucide-react";

const assignLeadSchema = z.object({
  callerId: z.string().min(1, "Please select a caller"),
  priority: z.enum(["low", "medium", "high"]),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional(),
});

type AssignLeadFormData = z.infer<typeof assignLeadSchema>;

interface AssignLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  onSubmit?: (data: AssignLeadFormData & { leadId: string }) => void;
}

export function AssignLeadModal({ open, onOpenChange, lead, onSubmit }: AssignLeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter callers assigned to the same client as the lead
  const availableCallers = lead 
    ? mockCallers.filter(c => c.assignedClient === lead.client && c.status === "active")
    : [];

  const form = useForm<AssignLeadFormData>({
    resolver: zodResolver(assignLeadSchema),
    defaultValues: {
      callerId: "",
      priority: "medium",
      notes: "",
    },
  });

  const handleSubmit = async (data: AssignLeadFormData) => {
    if (!lead) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const selectedCaller = mockCallers.find(c => c.id === data.callerId);
      onSubmit?.({ ...data, leadId: lead.id });
      toast({
        title: "Lead Assigned",
        description: `${lead.name} has been assigned to ${selectedCaller?.name}.`,
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign lead. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Lead to Caller</DialogTitle>
          <DialogDescription>
            Select a caller to handle this lead.
          </DialogDescription>
        </DialogHeader>
        
        {/* Lead Info Card */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{lead.name}</span>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {lead.source}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              <span>{lead.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>{lead.phone}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <Building className="w-3 h-3" />
              <span>{lead.client}</span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="callerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign to Caller</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a caller" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCallers.length === 0 ? (
                        <SelectItem value="none" disabled>
                          No callers available for this client
                        </SelectItem>
                      ) : (
                        availableCallers.map((caller) => (
                          <SelectItem key={caller.id} value={caller.id}>
                            <div className="flex items-center gap-2">
                              <span>{caller.name}</span>
                              <span className="text-muted-foreground text-xs">
                                ({caller.leadsAssigned} leads)
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Only callers assigned to {lead.client} are shown.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                          Low Priority
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-warning" />
                          Medium Priority
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-destructive" />
                          High Priority
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any notes for the caller..."
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || availableCallers.length === 0} 
                className="gradient-header text-white"
              >
                {isSubmitting ? "Assigning..." : "Assign Lead"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
