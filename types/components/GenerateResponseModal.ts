export interface backgroundMessage {
  from: "BACKGROUND";
  isToggled: boolean;
}

export type sendResponseType = (response: string) => void;
