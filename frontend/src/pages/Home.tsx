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
} from "@mui/x-data-grid";
import { useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { IRow } from "@utils/interfaces";
import { useEffect } from "react";
import Service from "@utils/service";
import { useDispatch } from "react-redux";
import { openToast } from "@redux/toastSlice";

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
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "coverAlbum",
    headerName: "Cover Album",
    width: 200,
  },
  {
    field: "artistName",
    headerName: "ArtistName",
    width: 200,
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const [isPlaylistLoading, setPlaylistLoading] = useState(false);
  const [playlist, setPlaylist] = useState<IRow[]>([]);
  const [currentPlaying, setCurrentPlaying] = useState<IRow | null>(null);

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
    setPlaylistLoading(true);
    Service.getAllMusic("userId").then((data) => {
      if (data.isSuccess && data.musics && data.musics.length > 0) {
        setPlaylist(data.musics);
        dispatch(openToast({ message: data.message, severity: "success" }));
      } else {
        dispatch(openToast({ message: data.message, severity: "error" }));
      }
      setPlaylistLoading(false);
    });
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: "90%", margin: "auto" }}>
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
        <Grid item width={830}>
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
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
