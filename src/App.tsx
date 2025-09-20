
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageIndex from "./pages/LandingPage/pages/Index";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import DashboardPixelPerfect from "./pages/DashboardPixelPerfect";
import AccountsPage from "./pages/AccountsPage";
import TransactionsPage from "./pages/TransactionsPage";
import RemindersPage from "./pages/RemindersPage";
import Estatistics from "./pages/Estatistics";
import Settings from "./pages/settings";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import RedirectToLanding from "./pages/RedirectToLanding";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProfileProvider } from "./contexts/ProfileContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <ThemeProvider>
            <ProfileProvider>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<LandingPageIndex />} />
                  <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/plans" element={<RedirectToLanding />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/verify-code" element={<VerifyCodePage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPixelPerfect />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <ProtectedRoute>
                  <AccountsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <TransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reminders"
              element={
                <ProtectedRoute>
                  <RemindersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/estatistics"
              element={
                <ProtectedRoute>
                  <Estatistics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
            </ProfileProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
