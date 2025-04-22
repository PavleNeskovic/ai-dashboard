import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useReportContext, Report } from '../context/ReportContext';

interface ReportFormProps {
	initialData?: Report;
	onClose: () => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ initialData, onClose }) => {
	const { reports, setReports } = useReportContext();
	const [title, setTitle] = useState(initialData?.title || '');
	const [content, setContent] = useState(initialData?.content || '');

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

		onClose();
	};

	return (
		<Box display="flex" flexDirection="column" gap={2} mt={4}>
			<Typography variant="h6">{initialData ? 'Edit Report' : 'Create New Report'}</Typography>
			<TextField
				label="Title"
				variant="outlined"
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
				value={content}
				onEditorChange={(value) => setContent(value)}
			/>
			<Box display="flex" justifyContent="flex-end" gap={2}>
				<Button variant="outlined" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="contained" onClick={handleSubmit}>
					Save
				</Button>
			</Box>
		</Box>
	);
};
