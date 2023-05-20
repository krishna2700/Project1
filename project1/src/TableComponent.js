import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CategoriesComponent from "./CategoriesComponent";
import TableDataComponent from "./TableDataComponent";

const TableComponent = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedOwner, setEditedOwner] = useState("");
  const [editedLabels, setEditedLabels] = useState([]);
  const [editedModified, setEditedModified] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [tableData, setTableData] = useState([
    {
      name: "File 1",
      owner: "John Doe",
      labels: ["Label 1", "Label 2"],
      modified: "2023-05-20",
    },
    {
      name: "File 2",
      owner: "Jane Smith",
      labels: ["Label 3"],
      modified: "2023-05-21",
    },
    {
      name: "File 3",
      owner: "Mike Johnson",
      labels: ["Label 4", "Label 5"],
      modified: "2023-05-22",
    },
    {
      name: "File 4",
      owner: "Emily Davis",
      labels: ["Label 6"],
      modified: "2023-05-23",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const labelCheckboxes = Array.from(Array(10).keys()).map(
    (index) => `Label ${index + 1}`
  );

  const handleLabelCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedLabels((prevSelectedLabels) => [...prevSelectedLabels, value]);
    } else {
      setSelectedLabels((prevSelectedLabels) =>
        prevSelectedLabels.filter((label) => label !== value)
      );
    }
  };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditedName(row.name);
    setEditedOwner(row.owner);
    setEditedLabels(row.labels);
    setEditedModified(row.modified);
    setUploadedImage(null);
    setEditDialogOpen(true);
  };
  const handleEditCancel = () => {
    setEditedName(selectedRow.name);
    setEditedOwner(selectedRow.owner);
    setEditedLabels(selectedRow.labels);
    setEditedModified(selectedRow.modified);
    setUploadedImage(null);
    setEditDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleEditSave = () => {
    const updatedData = tableData.map((row) =>
      row === selectedRow
        ? {
            ...row,
            name: uploadedImage ? uploadedImage.name : editedName,
            owner: editedOwner,
            labels: editedLabels,
            modified: editedModified,
          }
        : row
    );
    setTableData(updatedData);

    setEditDialogOpen(false);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedData = tableData.filter((row) => row !== selectedRow);
    setTableData(updatedData);

    setDeleteDialogOpen(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUploadedImage(file);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = tableData.filter((row) => {
    const rowData = {
      name: row === selectedRow ? editedName : row.name,
      owner: row === selectedRow ? editedOwner : row.owner,
      labels: row === selectedRow ? editedLabels : row.labels,
      modified: row === selectedRow ? editedModified : row.modified,
    };

    const searchValues = Object.values(rowData).join(" ").toLowerCase();
    return searchValues.includes(searchQuery.toLowerCase());
  });

  return (
    <Grid container spacing={2} sx={{ padding: "10px" }}>
      <CategoriesComponent
        showSettings={showSettings}
        handleSettingsClick={handleSettingsClick}
        labelCheckboxes={labelCheckboxes}
        selectedLabels={selectedLabels}
        handleLabelCheckboxChange={handleLabelCheckboxChange}
      />
      <Grid item xs={12} md={9}>
        <TableDataComponent
          filteredData={filteredData}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />

        <Dialog
          open={editDialogOpen}
          onClose={handleEditCancel}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit File</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input type="file" onChange={handleImageUpload} />
                {uploadedImage && (
                  <Typography variant="body2">{uploadedImage.name}</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Owner"
                  value={editedOwner}
                  onChange={(e) => setEditedOwner(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Labels"
                  value={editedLabels.join(", ")}
                  onChange={(e) =>
                    setEditedLabels(
                      e.target.value.split(",").map((label) => label.trim())
                    )
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Modified"
                  value={editedModified}
                  onChange={(e) => setEditedModified(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditCancel}>Cancel</Button>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          maxWidth="xs"
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the selected row?
            </Typography>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={handleDeleteConfirm}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={handleDeleteCancel}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default TableComponent;
