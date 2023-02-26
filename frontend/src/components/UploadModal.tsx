import { Modal, Box, Paper, Grid, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ModalProps } from "@utils/interfaces";
import { FC, useState, FormEvent } from "react";
import AudioFileIcon from "@mui/icons-material/AudioFile";

const UploadModal: FC<ModalProps> = ({ isModalOpen, onCloseHandler }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverAlbum, setCoverAlbum] = useState("");
  const [artist, setArtist] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={(event, reason) => {
        if (reason && reason === "backdropClick") {
          return;
        }
        onCloseHandler();
      }}
    >
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
            width: 700,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" justifyContent="center" gap={2}>
              <Grid item>
                <Typography>Fill the following details</Typography>
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  label="Title"
                  fullWidth
                  size="small"
                  variant="outlined"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  label="Description"
                  fullWidth
                  size="small"
                  variant="outlined"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  label="Cover Album"
                  fullWidth
                  size="small"
                  variant="outlined"
                  required
                  value={coverAlbum}
                  onChange={(e) => setCoverAlbum(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  type="text"
                  label="Artist Name"
                  fullWidth
                  size="small"
                  variant="outlined"
                  required
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    border: "3px dashed #fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    ":hover": {
                      opacity: 0.7,
                    },
                  }}
                >
                  <AudioFileIcon />
                  <Typography>Drag and Drop file here</Typography>
                </Box>
              </Grid>
              <Grid
                item
                alignSelf="center"
                container
                gap={2}
                justifyContent="center"
              >
                <Grid item>
                  <Button
                    color="warning"
                    size="small"
                    variant="contained"
                    onClick={onCloseHandler}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="success"
                    size="small"
                    variant="contained"
                    type="submit"
                  >
                    Upload
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default UploadModal;
