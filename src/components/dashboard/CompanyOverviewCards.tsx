"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Company } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle, AlertCircle } from "lucide-react";
import { RazorpayPaymentModal } from "@/components/modals/RazorpayPaymentModal";

interface CompanyOverviewCardsProps {
  companies: Company[];
  onPaymentSuccess?: (companyId: string, amount: number) => void;
}

export function CompanyOverviewCards({
  companies,
  onPaymentSuccess,
}: CompanyOverviewCardsProps) {
  const navigate = useNavigate();
  const [selectedPaymentCompany, setSelectedPaymentCompany] = useState<
    (Company & { pendingAmount: number }) | null
  >(null);

  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(
    (c) => c.status === "live" || c.status === "active"
  ).length;
  const companiesWithPendingPayment = companies.filter(
    (c) => c.totalBillAmount > c.amountPaid || c.lastInvoiceStatus === "unpaid" || c.lastInvoiceStatus === "partial"
  ).length;

  const handleCollectPayment = (company: Company) => {
    setSelectedPaymentCompany({
      ...company,
      pendingAmount: company.pendingAmount,
    });
  };

  const handlePaymentSuccess = (companyId: string, amount: number) => {
    if (onPaymentSuccess) {
      onPaymentSuccess(companyId, amount);
    }
    setSelectedPaymentCompany(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Companies Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/clients")}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-purple-900">
                Total Companies
              </CardTitle>
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700 mb-2">
              {totalCompanies}
            </div>
            <p className="text-xs text-purple-600">
              All registered companies
            </p>
          </CardContent>
        </Card>

        {/* Active Companies Card */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => {
            navigate("/clients", { state: { statusFilter: "live" } });
          }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-900">
                Active Companies
              </CardTitle>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700 mb-2">
              {activeCompanies}
            </div>
            <p className="text-xs text-green-600">
              Live and active services
            </p>
          </CardContent>
        </Card>

        {/* Payment Pending Card */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => {
            navigate("/clients", { state: { paymentFilter: "pending" } });
          }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-orange-900">
                Payment Pending
              </CardTitle>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700 mb-2">
              {companiesWithPendingPayment}
            </div>
            <p className="text-xs text-orange-600">
              Companies with pending payments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Pending Details Table */}
      {companiesWithPendingPayment > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Company Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Total Bill
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Amount Paid
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Pending Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Last Due Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {companies
                    .filter(
                      (c) =>
                        c.totalBillAmount > c.amountPaid ||
                        c.lastInvoiceStatus === "unpaid" ||
                        c.lastInvoiceStatus === "partial"
                    )
                    .map((company) => (
                      <tr key={company.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-sm">
                          {company.name}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          ₹{company.totalBillAmount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-green-600">
                          ₹{company.amountPaid.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-orange-600">
                          ₹{company.pendingAmount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {company.lastPaymentDate
                            ? new Date(company.lastPaymentDate).toLocaleDateString()
                            : "Not paid"}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                            onClick={() => handleCollectPayment(company)}
                          >
                            Collect Payment
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Razorpay Payment Modal */}
      {selectedPaymentCompany && (
        <RazorpayPaymentModal
          open={!!selectedPaymentCompany}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedPaymentCompany(null);
            }
          }}
          companyName={selectedPaymentCompany.name}
          companyId={selectedPaymentCompany.id}
          pendingAmount={selectedPaymentCompany.pendingAmount}
          razorpayCustomerId={selectedPaymentCompany.razorpayCustomerId}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}
