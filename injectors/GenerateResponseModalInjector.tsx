import { createRoot } from "react-dom/client";
import GenerateResponseModal from "@/components/GenerateResponseModal";

function injectGenerateResponseModal(ele: HTMLBodyElement) {
  const modalWrapper = document.querySelector<HTMLElement>(
    "#generate-response-modal-wrapper"
  );

  // if modal is already injected avoid re injection
  if (modalWrapper) return;

  ele.style.position = "relative";

  // else inject the button
  const modal: HTMLDivElement = document.createElement("div");
  modal.id = "generate-response-modal-wrapper";

  modal.style.position = "fixed";
  modal.style.left = "calc(50vw - 435px)";
  modal.style.zIndex = "100";

  // set display none initially
  modal.style.display = "block";

  // Create a root and render the AiButton component inside the button container
  const root = createRoot(modal);
  root.render(<GenerateResponseModal />);

  // Append the button container to the message input field
  ele.appendChild(modal);
}

// Set up the MutationObserver to watch for the message input field's existence
export function observeBody() {
  const observer = new MutationObserver(() => {
    // Check if the message input field exists before injecting the button
    const body = document.querySelector<HTMLBodyElement>("body");

    if (!body) return;

    const modalWrapper = document.querySelector<HTMLDivElement>(
      "#generate-response-modal-wrapper"
    );

    // if modal wrapper is not injected
    if (!modalWrapper) {
      injectGenerateResponseModal(body);
      return;
    }
  });

  // Start observing the body for child nodes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
