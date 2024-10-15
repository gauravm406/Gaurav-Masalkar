import {
  AIButtonMessage,
  sendResponseType,
} from "@/types/entrypoints/background";

export default defineBackground(() => {
  // Listener for messages sent to the background script
  chrome.runtime.onMessage.addListener(
    (
      message: AIButtonMessage,
      sender: chrome.runtime.MessageSender,
      sendResponse: sendResponseType
    ) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (
          tabs[0]?.id &&
          message.from === "AI_BUTTON" &&
          message.type === "SEND_TO_MODAL"
        ) {
          chrome.tabs.sendMessage(tabs[0].id, {
            from: "BACKGROUND",
            isToggled: message.isToggled,
          });
        }
      });
      sendResponse("success");
    }
  );
});
