import { observeMessageInputField } from "@/injectors/AiButtonInjector";
import { injectCustomCSS } from "@/injectors/CustomCssInjector";
import { observeBody } from "@/injectors/GenerateResponseModalInjector";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    // inject custom tailwind styles
    injectCustomCSS();

    // observe body for modal and inject modal
    observeBody();

    // observe message input field and inject ai button and inject ai button
    observeMessageInputField();
  },
});
