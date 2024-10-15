import AiButton from "@/components/AiButton";
import { createRoot } from "react-dom/client";

function injectAiButton(ele: HTMLDivElement) {
  const aiButtonContainer =
    document.querySelector<HTMLDivElement>("#ai-btn-container");

  // if button is already injected avoid re injection
  if (aiButtonContainer) return;

  ele.style.position = "relative";

  // else inject the button
  const buttonContainer: HTMLDivElement = document.createElement("div");
  buttonContainer.id = "ai-btn-container";

  buttonContainer.style.position = "absolute";
  buttonContainer.style.right = "8px";
  buttonContainer.style.bottom = "8px";
  buttonContainer.style.transition = "all 300ms ease-out";

  // set display none initially
  buttonContainer.style.display = "none";

  // Create a root and render the AiButton component inside the button container
  const root = createRoot(buttonContainer);
  root.render(<AiButton />);

  // Append the button container to the message input field
  ele.appendChild(buttonContainer);
}

// Set up the MutationObserver to watch for the message input field's existence
export function observeMessageInputField() {
  const observer = new MutationObserver(() => {
    // Check if the message input field exists before injecting the button
    const messageInputField = document.querySelector<HTMLDivElement>(
      ".msg-form__contenteditable"
    );

    if (!messageInputField) return;

    const aiButtonContainer =
      document.querySelector<HTMLDivElement>("#ai-btn-container");

    if (!aiButtonContainer) {
      injectAiButton(messageInputField);
      return;
    }

    // show only when input field is focused
    messageInputField.addEventListener("focus", () => {
      aiButtonContainer.style.display = "block";
    });

    // delay the hide button otherwise click event on button will not be executed
    let blurTimeout: NodeJS.Timeout;

    messageInputField.addEventListener("blur", () => {
      blurTimeout = setTimeout(() => {
        aiButtonContainer.style.display = "none";
      }, 100);
    });

    // Clear the timeout if the button is clicked
    aiButtonContainer.addEventListener("mousedown", () => {
      clearTimeout(blurTimeout);
    });

    // handle edge case where input value is empty and input box is focused then show ai button again
    const messageInputFieldPlaceholder = document.querySelector<HTMLElement>(
      ".msg-form__placeholder"
    );

    if (
      !messageInputFieldPlaceholder ||
      document.activeElement !== messageInputField
    )
      return;

    aiButtonContainer.style.display = "block";
  });

  // Start observing the body for child nodes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
