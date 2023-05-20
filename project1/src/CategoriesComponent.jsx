import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const CategoriesComponent = ({
  showSettings,
  handleSettingsClick,
  labelCheckboxes,
  selectedLabels,
  handleLabelCheckboxChange,
  filterTableData, // Callback function to filter table data
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLabelsCount, setSelectedLabelsCount] = useState(0);

  useEffect(() => {
    setSelectedLabelsCount(selectedLabels.length);
  }, [selectedLabels]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsOptionClick = (option) => {
    // Handle settings option click here
    // You can perform different actions based on the selected option
    console.log("Selected settings option:", option);
    handleMenuClose();
  };

  const handleCheckboxChange = (event) => {
    handleLabelCheckboxChange(event);
    const { checked } = event.target;
    setSelectedLabelsCount((prevCount) =>
      checked ? prevCount + 1 : prevCount - 1
    );
  };

  return (
    <Grid item xs={12} md={3}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h5" component="div">
          Categories
        </Typography>
        <IconButton sx={{ marginLeft: "10px" }} onClick={handleSettingsClick}>
          <SettingsIcon />
        </IconButton>
      </div>
      <FormGroup>
        {labelCheckboxes.map((label) => (
          <FormControlLabel
            key={label}
            control={
              <Checkbox
                checked={selectedLabels.includes(label)}
                onChange={handleCheckboxChange}
                value={label}
              />
            }
            label={label}
          />
        ))}
      </FormGroup>
      <Typography
        variant="body2"
        style={{ marginTop: "10px", fontSize: "16px", fontWeight: "bold" }}
      >
        Selected Labels: {selectedLabelsCount}
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem onClick={() => handleSettingsOptionClick("Option 1")}>
          Option 1
        </MenuItem>
        <MenuItem onClick={() => handleSettingsOptionClick("Option 2")}>
          Option 2
        </MenuItem>
        <MenuItem onClick={() => handleSettingsOptionClick("Option 3")}>
          Option 3
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default CategoriesComponent;
