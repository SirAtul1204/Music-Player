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
