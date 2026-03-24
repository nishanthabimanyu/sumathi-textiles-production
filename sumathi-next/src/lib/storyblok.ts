import { storyblokInit, apiPlugin } from "@storyblok/react";

// Initialize Storyblok with accessToken Placeholder setup to be populated by .env
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN || "PLACEHOLDER_TOKEN",
  use: [apiPlugin],
  components: {
    // Dynamic mappings to React Components will be added here
  },
});
