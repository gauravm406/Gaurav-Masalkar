import { SyntheticEvent } from "react";

const AiButton: React.FC = () => {
  // send message when modal is toggled
  function handleToggleModal(e: SyntheticEvent) {
    e.stopPropagation();
    e.preventDefault();

    chrome.runtime.sendMessage({
      from: "AI_BUTTON",
      type: "SEND_TO_MODAL",
      isToggled: true,
    });
  }

  return (
    <button
      className="h-[32px] w-[32px] p-0 bg-white rounded-full border-none focus:outline-none focus:ring-0 shadow-btn-icon transition-all duration-300 ease-out"
      type="button"
      id="ai-btn"
      onClick={handleToggleModal}
    >
      <img
        src={chrome.runtime.getURL("icons/MagicWandIconBlue.svg")}
        alt="magic-wand-icon-blue"
        className="m-auto"
      />
    </button>
  );
};

export default AiButton;
