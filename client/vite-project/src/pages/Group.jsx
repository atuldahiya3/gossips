import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import AppLayout from "../components/Layout/AppLayout";
import {
  Backdrop,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { lightPink, mattblack, pink } from "../constants/colour";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { StyledLink } from "../components/StylesComponents";
import AvatarCard from "../components/Shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/SampleData";
import { orange } from "@mui/material/colors";
import { MdOutlineEdit } from "react-icons/md"; 
import { MdOutlineDone } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import NewGroup from "../components/specific/NewGroup";
import UserItem from "../components/Shared/UserItem";
import { useMyGroupsQuery, useRemoveMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import toast from "react-hot-toast";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/Dialogue/ConfirmDeleteDiaglog")
);
const AddMemberDialog = lazy(() =>
  import("../components/Dialogue/AddMemberDialog")
);

function Group() {
  const {data,isLoading,error,isError}=useMyGroupsQuery()
  const chatId = useSearchParams()[0].get("group");
  const isAddMember = false;
  console.log("chatId", chatId);
  const [renameGroup]=useRenameGroupMutation()
  const [removeMember]=useRemoveMemberMutation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState();
  const [updatedGroupName, setUpdatedGroupName] = useState("");
  const [groupMembers,setGroupMembers]=useState([])
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMovileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupNameHandler = () => {
    const data={
      "groupName":updatedGroupName
    }
    console.log("data sending",data);
    renameGroup(chatId,data).then((data)=>console.log("successfully renamed",data)).catch((e)=>console.log("error renaming group",e))
    setIsEdit(false);
  };

  const openAddMemberHandler = () => {

    
    console.log("add member");
  };
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("delete group");
  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
    console.log("delete group");
  };
  const deleteHandler = () => {
    console.log("deleted the group");
    closeConfirmDeleteHandler();
  };
  const removeMemberHandler=(id)=>{
    const data={
      "chatId":chatId,
      "userId":id
    }
    removeMember(data).then((data)=>{
      toast.success("Removed member successfully");
    }).catch(()=>{
      toast.error("error removing member")
    })
    console.log("member removed",id);
  }
  useEffect(() => {
    if(chatId){
      const groupData=data?.groups.filter((group)=>group._id===chatId)
      if(groupData){
        setGroupName(`${groupData[0].name}`);
        setUpdatedGroupName(`${groupData[0].name}`);
        setGroupMembers([...groupData[0].members])

      }
    }

    return () => {
      setIsEdit(false);
      setGroupName("");
      setUpdatedGroupName("");
    };
  }, [chatId]);

  const IconBtns = (
    <>
      <IconButton
        sx={{
          display: {
            sm: "none",
            xs: "block",
            position: "fixed",
            top: "2rem",
            right: "2rem",
          },
        }}
        onClick={handleMobile}
      >
        <IoMdMenu />
      </IconButton>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            color: "white",
            bgcolor: mattblack,
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={handleBack}
        >
          <MdKeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={updatedGroupName}
            onChange={(e) => setUpdatedGroupName(e.target.value)}
          />
          <IconButton onClick={updateGroupNameHandler}>
            <MdOutlineDone />
          </IconButton>
        </>
      ) : (
        <>
          <Typography>{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <MdOutlineEdit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="success"
        variant="contained"
        startIcon={<IoIosPersonAdd />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
      <Button
        size="large"
        color="error"
        variant="outlined"
        startIcon={<RiDeleteBin6Line />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
    </Stack>
  );

  return (
    <>
      <Grid container height={"100vh"}>
        <Grid
          item
          sx={{ display: { xs: "none", sm: "block" } }}
          sm={4}
          bgcolor={pink}
        >
          <GroupsList myGroups={data?.groups} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            padding: "6rem 3rem",
          }}
        >
          {IconBtns}
          {groupName && (
            <>
              {GroupName}

              <Typography
                margin={"2rem"}
                alignSelf={"flex-start"}
                variant="body1"
              >
                Members
              </Typography>

              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: "0",
                  md: "1rem 4rem",
                }}
                spacing={"2rem"}
                height={"50vh"}
                overflow={"auto"}
                // bgcolor={lightPink}
              >
                {groupMembers.map((i) => (
                  <UserItem
                    key={i._id}
                    user={i}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))}
              </Stack>
              {ButtonGroup}
            </>
          )}
        </Grid>
        <Drawer
          sx={{ display: { xs: "block", sm: "none" } }}
          open={isMobileMenuOpen}
          onClose={handleMovileClose}
        >
          <GroupsList width={"70vw"} myGroups={sampleChats} />
        </Drawer>
        {isAddMember && (
          <Suspense fallback={<Backdrop />}>
            <AddMemberDialog />
          </Suspense>
        )}
        {confirmDeleteDialog && (
          <>
            <Suspense fallback={<Backdrop />}>
              <ConfirmDeleteDialog
                open={confirmDeleteDialog}
                handleClose={closeConfirmDeleteHandler}
                handleDelete={deleteHandler}
              />
            </Suspense>
          </>
        )}
      </Grid>
    </>
  );
}

const GroupsList = ({ width = "100%", myGroups = [], chatId }) => (
  <Stack width={width}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  console.log("avatar", avatar);
  return (
    <StyledLink
      sx={{ padding: "0" }}
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: lightPink,
          color: orange,
          position: "relative",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography variant="h6">{name}</Typography>
        </Stack>
      </div>
    </StyledLink>
  );
});

export default Group;
