import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import "../styles/global.css";
import {
  backgroundMessage,
  sendResponseType,
} from "@/types/components/GenerateResponseModal";

const GenerateResponseModal: React.FC = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [promptValue, setPromptValue] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [isGenerateResponse, setIsGenerateResponse] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => {
    setIsShowModal(false);
    setIsGenerateResponse(false);
    setPromptValue("");
  });

  const promptResponse: string =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  // append the background layer when we open modal
  useLayoutEffect(() => {
    if (!isShowModal) return;

    const backgroundLayer = document.createElement("div");
    backgroundLayer.style.height = "100vh";
    backgroundLayer.style.width = "100vw";
    backgroundLayer.style.position = "fixed";
    backgroundLayer.style.inset = "0";
    backgroundLayer.style.background = "#0D0D1233";
    backgroundLayer.style.zIndex = "90";

    document.body.appendChild(backgroundLayer);

    return () => {
      document.body.removeChild(backgroundLayer);
    };
  }, [isShowModal]);

  // manage the margins of modal dynamically
  useLayoutEffect(() => {
    const modal = document.getElementById("generate-response-modal-wrapper");

    if (!modal) return;

    const modalHeight = modal.offsetHeight;
    modal.style.top = `calc(50vh - ${modalHeight / 2}px)`;
  }, [isShowModal, isGenerateResponse]);

  // get the isToggled state from background
  useEffect(() => {
    const messageListener = (
      message: backgroundMessage,
      sender: chrome.runtime.MessageSender,
      sendResponse: sendResponseType
    ) => {
      if (message.from === "BACKGROUND" && message.isToggled) {
        setIsShowModal(message.isToggled);
        sendResponse("success");
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const promptChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPromptValue(e.target.value);
    },
    [setPromptValue]
  );

  const generateResponseHandler = useCallback(() => {
    if (isGenerateResponse) return;
    if (!promptValue) return;
    setPrompt(promptValue);
    setPromptValue("");
    setIsGenerateResponse(true);
  }, [
    setIsGenerateResponse,
    isGenerateResponse,
    setPrompt,
    promptValue,
    setPromptValue,
  ]);

  const regenerateResponseHandler = useCallback(() => {
    return;
  }, []);

  const insertResponseHandler = useCallback(() => {
    const messageInputFieldText = document.querySelector<HTMLParagraphElement>(
      ".msg-form__contenteditable p"
    );
    const sendMessageBtn = document.querySelector<HTMLButtonElement>(
      ".msg-form__send-button"
    );

    const messageInputFieldContainer = document.querySelector<HTMLDivElement>(
      ".msg-form__msg-content-container--scrollable"
    );

    if (!messageInputFieldContainer) return;

    const messageInputFieldPlaceholder =
      messageInputFieldContainer.querySelector<HTMLDivElement>(
        "div[data-placeholder]"
      );

    if (
      !messageInputFieldText ||
      !messageInputFieldPlaceholder ||
      !sendMessageBtn
    )
      return;

    messageInputFieldText.innerText = promptResponse;
    messageInputFieldPlaceholder.classList.remove("msg-form__placeholder");
    sendMessageBtn.disabled = false;
    setIsShowModal(false);
    setIsGenerateResponse(false);
    setPromptValue("");

    // focus on input field
    const messageInputField = document.querySelector<HTMLDivElement>(
      ".msg-form__contenteditable"
    );
    messageInputField?.focus();

    // move caret to end
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(messageInputFieldText);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);

    // Trigger input event manually
    const inputEvent = new Event("input", { bubbles: true });
    messageInputFieldText.dispatchEvent(inputEvent); // Dispatch the input event
  }, [setIsShowModal, setIsGenerateResponse, setPromptValue]);

  // dont return null or undefined otherwise toggle listener wont work properly
  if (!isShowModal) return <></>;

  return (
    <div
      className="w-[870px] p-[26px] rounded-[26px] shadow-generate-response-modal flex flex-col gap-[26px] bg-white"
      id="generate-response-modal"
      ref={modalRef}
    >
      {isGenerateResponse && (
        <>
          <div className="w-full flex justify-end">
            <p className="max-w-[631px] bg-gray-100 p-4 rounded-[12px] text-gray-500 font-normal text-[24px]">
              {prompt}
            </p>
          </div>
          <div className="w-full flex justify-start">
            <p className="bg-blue-100 max-w-[631px] p-4 rounded-[12px] text-gray-500 font-normal text-[24px]">
              {promptResponse}
            </p>
          </div>
        </>
      )}

      {/* here style prop and id is used to give precedence over linkedin default styles as some tailwind styles are not working*/}
      <input
        type="text"
        placeholder="Your Prompt"
        className="!h-[61px] !rounded-[8px] !shadow-input-inset !border !border-gray-200 !px-8 !text-gray-400 !placeholder:text-gray-300 !text-[24px] !font-medium !outline-none"
        id="generate-response-modal-input"
        style={{
          border: "1px solid #C1C7D0",
        }}
        value={promptValue}
        onChange={promptChangeHandler}
      />
      <div className="w-full flex justify-end gap-[26px]">
        {isGenerateResponse ? (
          <>
            <button
              className="w-[129px] h-[53px] rounded-lg flex items-center justify-center gap-[10px] shadow-none focus:outline-none bg-white border-2 border-gray-500 hover:border-gray-500 box-border"
              type="button"
              onClick={insertResponseHandler}
              style={{
                border: "2px solid #666D80",
              }}
            >
              <img
                src={chrome.runtime.getURL("icons/ArrowDownIconGrey.svg")}
                alt="arrow-down-icon"
              />
              <span className="text-[24px] font-semibold text-gray-400 ">
                Insert
              </span>
            </button>
            <button
              className="w-[190px] h-[53px] bg-blue-500 rounded-lg flex items-center justify-center gap-[10px] border-none shadow-none focus:outline-none"
              onClick={regenerateResponseHandler}
            >
              <img
                src={chrome.runtime.getURL("icons/RegenerateIconWhite.svg")}
                alt="arrow-head-right-icon"
              />
              <span className="text-[24px] font-semibold text-white ">
                Regenerate
              </span>
            </button>
          </>
        ) : (
          <button
            className="w-[190px] h-[53px] bg-blue-500 rounded-lg flex items-center justify-center gap-[10px] border-none shadow-none focus:outline-none"
            onClick={generateResponseHandler}
          >
            <img
              src={chrome.runtime.getURL("icons/ArrowHeadRightIconWhite.svg")}
              alt="arrow-head-right-icon"
            />
            <span className="text-[24px] font-semibold text-white ">
              Generate
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default GenerateResponseModal;
