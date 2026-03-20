"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

interface DonateContextType {
  openDonate: () => void;
}

const DonateContext = createContext<DonateContextType>({ openDonate: () => {} });

export function useDonate() {
  return useContext(DonateContext);
}

export default function DonateProvider({ children }: { children: ReactNode }) {
  const [showDonate, setShowDonate] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleDonate = async () => {
    if (!selectedAmount) return;
    const supabase = createClient();
    await supabase.from("form_submissions").insert({
      type: "donation_intent",
      name: "Anonymous",
      email: "N/A",
      message: `Donation intent: $${selectedAmount}`,
      metadata: { amount: selectedAmount },
    });
    setSubmitted(true);
  };

  const handleClose = () => {
    setShowDonate(false);
    setSubmitted(false);
    setSelectedAmount(null);
  };

  return (
    <DonateContext.Provider value={{ openDonate: () => setShowDonate(true) }}>
      {children}

      <Modal isOpen={showDonate} onClose={handleClose} title="Support Our Mission">
        <div className="space-y-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-xl font-bold text-white">Thank You!</h4>
              <p className="text-luminous-muted text-sm">
                Your generous intent has been recorded. To complete your donation, please visit our secure payment portal or contact us directly.
              </p>
              <Button variant="outline" onClick={handleClose} className="mt-4">Close</Button>
            </div>
          ) : (
            <>
              <p className="text-luminous-muted text-center">
                Your generous donation supports programs for at-risk youth and families in crisis.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[50, 100, 250].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-3 border rounded-xl font-bold transition-colors cursor-pointer ${
                      selectedAmount === amt
                        ? "bg-luminous-cyan text-black border-luminous-cyan shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                        : "border-white/20 hover:bg-luminous-cyan hover:text-black hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <Button variant="primary" className="w-full" onClick={handleDonate}>
                {selectedAmount ? `Donate $${selectedAmount}` : "Select an Amount"}
              </Button>
              <p className="text-xs text-luminous-muted text-center">
                You will be redirected to a secure payment page.
              </p>
            </>
          )}
        </div>
      </Modal>
    </DonateContext.Provider>
  );
}
