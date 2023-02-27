import Nav from "@components/Nav";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  MuiEvent,
  GridSelectionModel,
  GridCellEditCommitParams,
} from "@mui/x-data-grid";
import { useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { IRow } from "@utils/interfaces";
import { useEffect } from "react";
import Service from "@utils/service";
import { useDispatch } from "react-redux";
import { openToast } from "@redux/toastSlice";
import { Button } from "@mui/material";
import DeleteModal from "@components/DeleteModal";
import AddIcon from "@mui/icons-material/Add";
import UploadModal from "@components/UploadModal";
import useAuth from "@hooks/useAuth";
import Loader from "@components/Loader";
import { Navigate } from "react-router-dom";

const columns: GridColDef[] = [
  {
    field: "playButton",
    headerName: "",
    width: 70,
    renderCell: (params) => {
      return (
        <IconButton color={params.row.isPlaying ? "success" : "default"}>
          {params.row.isPlaying ? (
            <PauseCircleOutlineIcon />
          ) : (
            <PlayCircleOutlineIcon />
          )}
        </IconButton>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    editable: true,
  },
  {
    field: "coverAlbum",
    headerName: "Cover Album",
    width: 200,
    editable: true,
  },
  {
    field: "artistName",
    headerName: "Artist Name",
    width: 200,
    editable: true,
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useAuth();
  const [isPlaylistLoading, setPlaylistLoading] = useState(false);
  const [playlist, setPlaylist] = useState<IRow[]>([]);
  const [currentPlaying, setCurrentPlaying] = useState<IRow | null>(null);
  const [selected, setSelected] = useState<GridSelectionModel>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handlePlay = (params: GridCellParams, e: MuiEvent) => {
    if (params.field === "playButton") {
      const newPlaylist = [...playlist];
      for (let i = 0; i < newPlaylist.length; i++) {
        newPlaylist[i].isPlaying = false;
        if (params.row.id === newPlaylist[i].id) {
          newPlaylist[i].isPlaying = true;
        }
        if (currentPlaying?.id === newPlaylist[i].id) {
          newPlaylist[i].isPlaying = false;
        }
      }

      setPlaylist(newPlaylist);
    }
  };

  const handleEdit = (p: GridCellEditCommitParams, e: MuiEvent) => {
    const newPlaylist = [...playlist];
    for (let i = 0; i < newPlaylist.length; i++) {
      if (p.id === newPlaylist[i].id) {
        console.log(p);
        //@ts-ignore
        newPlaylist[i][`${p.field}`] = p.value;
      }
    }

    setPlaylist(newPlaylist);
  };

  const openDeleteConfirm = () => {
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    setCurrentPlaying(null);
    const res = await Service.deleteSelected(selected as string[]);
    if (res.isSuccess && res.musics && res.musics.length > 0) {
      setPlaylist(res.musics);
      dispatch(openToast({ message: res.message, severity: "success" }));
    } else {
      dispatch(openToast({ message: res.message, severity: "error" }));
    }
  };

  const handleSelect = (ids: GridSelectionModel) => {
    setSelected(ids);
  };

  useEffect(() => {
    console.log(currentPlaying);
  });

  useEffect(() => {
    let flag = true;
    for (let i = 0; i < playlist.length; i++) {
      if (playlist[i].isPlaying) {
        flag = false;
        setCurrentPlaying(playlist[i]);
      }
    }

    if (flag) {
      setCurrentPlaying(null);
    }
  }, [playlist]);

  useEffect(() => {
    if (isAuth) {
      setPlaylistLoading(true);
      Service.getAllMusic().then((data) => {
        if (data.isSuccess && data.musics && data.musics.length > 0) {
          setPlaylist(data.musics);
          dispatch(openToast({ message: data.message, severity: "success" }));
        } else {
          dispatch(openToast({ message: data.message, severity: "error" }));
        }
        setPlaylistLoading(false);
      });
    }
  }, [dispatch, isAuth]);

  if (isAuth === null) {
    return <Loader />;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ maxWidth: 900, margin: "auto" }}>
      <Nav />
      <Grid
        sx={{ marginTop: 2 }}
        container
        direction="column"
        gap={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6">Enjoy your playlist</Typography>
        </Grid>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography>
              Double Click to Edit, Enter to Save, Esc to Cancel
            </Typography>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={openDeleteConfirm}
            >
              Delete Selected
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setEditModalOpen(true)}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
        <Grid item width={900}>
          <DataGrid
            rows={playlist}
            columns={columns}
            pageSize={100}
            rowsPerPageOptions={[5]}
            autoHeight
            autoPageSize
            density="standard"
            hideFooterPagination
            hideFooter
            loading={isPlaylistLoading}
            onCellClick={handlePlay}
            onCellEditCommit={handleEdit}
            checkboxSelection
            onSelectionModelChange={handleSelect}
            disableSelectionOnClick
          />
        </Grid>
      </Grid>
      <DeleteModal
        isModalOpen={isDeleteModalOpen}
        onCloseHandler={() => setDeleteModalOpen(false)}
        onDeleteHandler={handleDelete}
      />
      <UploadModal
        isModalOpen={isEditModalOpen}
        onCloseHandler={() => setEditModalOpen(false)}
      />
      {/* <audio
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 0,
          height: 0,
        }}
        autoPlay
        src="https://download.samplelib.com/mp3/sample-3s.mp3"
      /> */}
    </Box>
  );
};

export default Home;
