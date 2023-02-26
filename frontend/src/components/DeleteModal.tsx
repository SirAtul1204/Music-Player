import { Modal, Box, Paper, Grid, Typography, Button } from "@mui/material";
import { DeleteModalProps } from "@utils/interfaces";
import { FC } from "react";

const DeleteModal: FC<DeleteModalProps> = ({
  isModalOpen,
  onCloseHandler,
  onDeleteHandler,
}) => {
  return (
    <Modal open={isModalOpen} onClose={onCloseHandler}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            paddingX: 2,
            paddingY: 3,
            width: 400,
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap={3}
          >
            <Grid item>
              <Typography>
                Are you sure you want to delete selected music?
              </Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              alignItems="center"
              gap={3}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={onCloseHandler}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={onDeleteHandler}
                >
                  Yes, Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
