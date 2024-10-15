export interface AIButtonMessage {
  from: "AI_BUTTON";
  type: "SEND_TO_MODAL";
  isToggled: boolean;
}

export type sendResponseType = (response: string) => void;
