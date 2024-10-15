import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: [
      "storage",
      "activeTab",
      "scripting",
      "webNavigation",
      "tabs",
      "background",
    ],
    web_accessible_resources: [
      {
        resources: ["icons/*", "style.css"],
        matches: ["<all_urls>"],
      },
    ],
  },
});
