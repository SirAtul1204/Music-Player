import { Modal, Box, Paper, Grid, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ModalProps } from "@utils/interfaces";
import { FC, useState, FormEvent, useCallback } from "react";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import { useDropzone } from "react-dropzone";
import Service from "@utils/service";
import { useDispatch } from "react-redux";
import { openToast } from "@redux/toastSlice";

const UploadModal: FC<ModalProps> = ({ isModalOpen, onCloseHandler }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverAlbum, setCoverAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isCancelDisabled, setCancelDisabled] = useState(false);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"],
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select file");
      return;
    }
    setCancelDisabled(true);
    const res = await Service.addMusic({
      title,
      description,
      coverAlbum,
      artist,
      file,
    });

    if (res.isSuccess) {
      dispatch(openToast({ message: res.message, severity: "success" }));
      onCloseHandler();
    } else {
      dispatch(openToast({ message: res.message, severity: "error" }));
      setCancelDisabled(false);
    }
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
                  {...getRootProps()}
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
                    opacity: isDragActive ? 0.7 : 1,
                  }}
                >
                  <input {...getInputProps()} />
                  <AudioFileIcon />
                  <Typography>
                    {file ? file.name : "Drag and Drop file here"}
                  </Typography>
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
                    disabled={isCancelDisabled}
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
                    {isCancelDisabled ? "Uploading" : "Upload"}
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
