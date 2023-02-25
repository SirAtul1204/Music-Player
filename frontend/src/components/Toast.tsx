import { Snackbar, Alert } from "@mui/material";
import { RootState } from "@redux/store";
import { closeToast } from "@redux/toastSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";

const Toast = () => {
  const { message, open, severity } = useSelector(
    (state: RootState) => state.toast
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeToast());
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
