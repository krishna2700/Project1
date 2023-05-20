import React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const DrawerContainer = styled("div")({
  width: drawerWidth,
});

const DrawerPaper = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
}));

const SideNavigation = () => {
  return (
    <div>
      <DrawerPaper variant="permanent">
        <DrawerContainer />
        <List>
          <ListItem
            button
            key="File Manager"
            component={NavLink}
            to="/file-manager"
            activeClassName="active"
            style={{
              backgroundColor:
                window.location.pathname === "/file-manager"
                  ? "skyblue"
                  : "inherit",
            }}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="File Manager" />
          </ListItem>
          {/* Add more ListItems for other tabs */}
        </List>
      </DrawerPaper>
    </div>
  );
};

export default SideNavigation;
