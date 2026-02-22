
  import { createRoot } from "react-dom/client";
  import { ClerkProvider } from "@clerk/clerk-react";
  import App from "./App.tsx";
  import "./index.css";

  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  const afterSignInUrl = "https://app.eacoachpro.com/dashboard";
  const afterSignUpUrl = "https://app.eacoachpro.com/dashboard";

  console.log('🔐 Clerk Configuration:', {
    hasPublishableKey: !!PUBLISHABLE_KEY,
    keyPrefix: PUBLISHABLE_KEY?.substring(0, 10) + '...',
    afterSignInUrl,
    afterSignUpUrl
  });

  createRoot(document.getElementById("root")!).render(
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      afterSignInUrl={afterSignInUrl}
      afterSignUpUrl={afterSignUpUrl}
    >
      <App />
    </ClerkProvider>
  );
  