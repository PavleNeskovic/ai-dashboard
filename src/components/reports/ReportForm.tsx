import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useReportContext, Report } from '../../context/ReportContext';
import { useRole } from '../../context/RoleContext';
import { useActivity } from '../../context/ActivityContext';

interface ReportFormProps {
	initialData?: Report;
	onClose: () => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ initialData, onClose }) => {
  const { logActivity } = useActivity();
  const { role } = useRole();
  const isAdmin = role === 'Admin';
	const { setReports } = useReportContext();
	const [title, setTitle] = useState(initialData?.title || '');
	const [content, setContent] = useState(initialData?.content || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


	const handleSubmit = () => {
		const isEdit = !!initialData;
		const updatedReport: Report = {
			id: isEdit ? initialData!.id : Date.now().toString(),
			title,
			content,
		};

		setReports((prev) =>
			isEdit
				? prev.map((r) => (r.id === updatedReport.id ? updatedReport : r))
				: [updatedReport, ...prev]
		);

    logActivity(
      isEdit
        ? initialData?.title !== title 
          ? `Report "${initialData.title}" updated. Renamed to "${title}"`
          : `Report "${title}" updated`
        : `New report "${title}" created`
    );

		onClose();
	};

  const handleDelete = () => {
    if (!initialData) return;
  
    setReports((prev) => prev.filter((r) => r.id !== initialData.id));
    logActivity(`Report "${initialData.title}" was deleted.`);
    onClose();
  };

	return (
    <>
		<Box display="flex" flexDirection="column" gap={2} mt={4}>
			<Typography variant="h6">{initialData ? isAdmin ? 'Edit Report' : 'View Report' : 'Create New Report'}</Typography>
			<TextField
				label="Title"
				variant="outlined"
        disabled={!isAdmin}
				fullWidth
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Editor
				apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
				init={{
					height: 300,
					menubar: false,
					plugins: ['link', 'lists', 'autolink', 'preview'],
					toolbar: 'undo redo | bold italic underline | bullist numlist | link preview',
				}}
        disabled={!isAdmin}
				value={content}
				onEditorChange={(value) => setContent(value)}
			/>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
        {isAdmin && initialData && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Report
          </Button>
        )}

        <Box display="flex" gap={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          {isAdmin && (
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          )}
        </Box>
      </Box>
		</Box>
    <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the report "
          <strong>{initialData?.title}</strong>"? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </>
	);
};
