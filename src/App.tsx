import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ClientManager from "./pages/ClientManager";
import CallerManager from "./pages/CallerManager";
import CompanyCallersList from "./pages/CompanyCallersList";
import LeadCenter from "./pages/LeadCenter";
import IntegrationManager from "./pages/IntegrationManager";
import HealthMonitor from "./pages/HealthMonitor";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/clients" element={<ClientManager />} />
          <Route path="/callers" element={<CallerManager />} />
          <Route path="/callers/:companyId" element={<CompanyCallersList />} />
          <Route path="/leads" element={<LeadCenter />} />
          <Route path="/integrations" element={<IntegrationManager />} />
          <Route path="/health" element={<HealthMonitor />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
