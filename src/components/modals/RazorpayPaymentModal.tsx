"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const paymentSchema = z.object({
  companyName: z.string().readonly(),
  amount: z.number().positive("Amount must be greater than 0"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface RazorpayPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyName: string;
  companyId: string;
  pendingAmount: number;
  razorpayCustomerId?: string;
  onPaymentSuccess?: (companyId: string, amount: number) => void;
}

export function RazorpayPaymentModal({
  open,
  onOpenChange,
  companyName,
  companyId,
  pendingAmount,
  razorpayCustomerId,
  onPaymentSuccess,
}: RazorpayPaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"form" | "processing">("form");

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      companyName: companyName,
      amount: pendingAmount,
    },
  });

  const handlePaymentSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true);
    setPaymentStep("processing");

    try {
      // Simulate Razorpay API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => {
        const options = {
          key: "rzp_test_1DP5MMOk6cuLSq", // Replace with your test key
          amount: data.amount * 100, // Amount in paise
          currency: "INR",
          name: "DCode Nexus Control",
          description: `Payment for ${companyName}`,
          customer_id: razorpayCustomerId,
          handler: function (response: any) {
            // Handle successful payment
            if (onPaymentSuccess) {
              onPaymentSuccess(companyId, data.amount);
            }
            onOpenChange(false);
            setPaymentStep("form");
            setIsProcessing(false);
          },
          prefill: {
            name: companyName,
          },
          theme: {
            color: "#a78bfa", // Purple accent
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", function () {
          setPaymentStep("form");
          setIsProcessing(false);
        });
        rzp.open();
      };

      document.body.appendChild(script);
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStep("form");
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Collect Payment</DialogTitle>
          <DialogDescription>
            Process payment for {companyName}
          </DialogDescription>
        </DialogHeader>

        {paymentStep === "form" ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePaymentSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pending: ₹{pendingAmount.toLocaleString()}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay with Razorpay"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-4" />
            <p className="text-sm text-muted-foreground">
              Redirecting to Razorpay...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
