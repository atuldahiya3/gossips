import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { orange } from "../../constants/colour";
import MenuIcon from "@mui/icons-material/Menu";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineGroups2 } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import toast from "react-hot-toast";
import { setIsNewGroup, setIsNotification, setIsSearch } from "../../redux/reducers/misc";

const SearchDialog= lazy(()=> import("../specific/Search"))
const NotificationDialog= lazy(()=> import("../specific/Notifications"))
const NewGroupDialog= lazy(()=> import("../specific/NewGroup"))

const Header = () => {
  const{isSearch,isNotification, isNewGroup}=useSelector(state=>state.misc)
  const [isMobile, setisMobile] = useState(false)
  const [isGroup, setIsGroup] = useState(false)
  const dispatch=useDispatch();
  
  const navigate = useNavigate();
  const handleMobile = () => {
    setisMobile(!isMobile)
  };
  const openSearchDialog = () => {
    dispatch(setIsSearch(true))
  };
  const openCreateGroup = () => {
    dispatch(setIsNewGroup(true))
  };
  const navinageToGroups = () => {
    navigate("/groups");
  };
  const handleLogout = async () => {
    try{
      const {data}=await axios.get(`${server}/user/logout`,{withCredentials:"true"})
      dispatch(userNotExists())
      toast.success(data.message)
    }catch(err){
      console.log(err);
    }
    console.log("handleLogout");
  };
  const openNotifications = () => {
    dispatch(setIsNotification(!isNotification))
  };


  return (
    <>
      <Box sx={{ flexGrow: 1 }} height="4rem">
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <IoMenu />
              </IconButton>
            </Box>
            <Typography variant="h6" sx={{ display: {xs:"none", sm: "block" } }}>
              Gosspis
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{}}>
              {/* <iconBtn
                title={"search"}
                icon={<CiSearch />}
                onclick={openSearchDialog}
              /> */}
              <IconButton
                color="inherit"
                size="large"
                onClick={openSearchDialog}
              >
                <CiSearch />
              </IconButton>
            </Box>
            <Tooltip title="New Group">
              <IconButton
                color="inherit"
                size="large"
                onClick={openCreateGroup}
              >
                <IoIosAdd />
              </IconButton>
            </Tooltip>
            <Tooltip title="Groups">
              <IconButton
                color="inherit"
                size="large"
                onClick={navinageToGroups}
              >
                <MdOutlineGroups2 />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton
                color="inherit"
                size="large"
                onClick={openNotifications}
              >
                <IoIosNotifications/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Log Out">
              <IconButton
                color="inherit"
                size="large"
                onClick={handleLogout}
              >
                <CiLogout />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && 
        <Suspense fallback={<Backdrop open/>}>
          <SearchDialog/>
        </Suspense>
      }
      {isNotification && 
        <Suspense fallback={<Backdrop open/>}>
          <NotificationDialog/>
        </Suspense>
      }
      {isNewGroup && 
        <Suspense fallback={<Backdrop open/>}>
          <NewGroupDialog/>
        </Suspense>
      }
    </>
  );
};

const iconBtn = ({title, icon, onclick}) => {
  <Tooltip title={title}>
    <IconButton color="inherit" size="large" onClick={onclick}>
      {icon}
    </IconButton>
  </Tooltip>;
};

export default Header;
