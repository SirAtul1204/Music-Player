import { AlertColor } from "@mui/material";

export interface ILogin {
  email: string;
  password: string;
}

export interface IToastState {
  open: boolean;
  severity: AlertColor;
  message: string;
}

export interface IOpenToastAction {
  type: string;
  payload: {
    severity: AlertColor;
    message: string;
  };
}

export interface LoaderProps {
  message?: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface IRow {
  id: string;
  name: string;
  description: string;
  coverAlbum: string;
  artistName: string;
  isPlaying: boolean;
}

export interface ModalProps {
  isModalOpen: boolean;
  onCloseHandler: () => void;
}

export interface DeleteModalProps extends ModalProps {
  onDeleteHandler: () => void;
}
