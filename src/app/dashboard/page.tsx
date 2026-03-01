"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Navbar } from "@/components/bellas/Navbar";
import { Footer } from "@/components/bellas/Footer";
import { ModelDashboard } from "@/components/bellas/ModelDashboard";
import { AuthModal } from "@/components/bellas/AuthModal";
import { useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "MODEL")) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "MODEL") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onLoginClick={() => setShowAuthModal(true)} />
      <main className="flex-1 pt-20">
        <ModelDashboard />
      </main>
      <Footer />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
