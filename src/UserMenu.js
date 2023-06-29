import { AccountCircle } from "@mui/icons-material";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const UserMenu = ({ user, logout }) => {
  const [anchorElUser, setAnchorEl] = useState(null);

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  }

  const handleOpenUserMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  return (
    <Box>
      <Button color="inherit" onClick={handleOpenUserMenu}>
        <AccountCircle sx={{ mr: 1 }} /> {user.name}
      </Button>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => logout()} > Logout </MenuItem>
      </Menu>
    </Box>
  );
};


export default UserMenu;