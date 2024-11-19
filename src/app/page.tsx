'use client'

// Initialize analytics
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

posthog.init("phc_5uiEHZeK6zsn4EVTnM179CH1ldnSmMfmoMzLPjHSnZI", {
  api_host: "https://us.i.posthog.com",
});


import { LandingPageComponent } from "@/components/landing";

export default function Home() {
  return (
    <PostHogProvider>
      <LandingPageComponent />
    </PostHogProvider>
  );
}
