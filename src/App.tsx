import React, { useState } from 'react';
import { Report, ReportProvider, useReportContext } from './context/ReportContext';
import { Container, Typography, Box } from '@mui/material';
import { PromptInputBar } from './components/PromptInputBar';
import { ReportGrid } from './components/ReportGrid';
import { ReportForm } from './components/ReportForm';
import { ReportToolbar } from './components/ReportToolbar';

const Dashboard = () => {
	const { reports } = useReportContext();
	const [searchTerm, setSearchTerm] = useState('');
	const [editReport, setEditReport] = useState<Report | null>(null);

	const handleCloseForm = () => setEditReport(null);

	const isEditing = editReport !== null;

	return (
		<Box mt={4}>
			{isEditing ? (
				<ReportForm
					initialData={editReport?.id ? editReport : undefined}
					onClose={handleCloseForm}
				/>
			) : (
				<>
					<PromptInputBar />
					<ReportToolbar
						onAdd={() => setEditReport({ id: '', title: '', content: '' })}
						searchTerm={searchTerm}
						onSearchChange={setSearchTerm}
					/>
					<ReportGrid
						searchTerm={searchTerm}
						onEdit={(r) => setEditReport(r)}
					/>
				</>
			)}
		</Box>
	);
};


const App = () => {
	return (
		<ReportProvider>
			<Container maxWidth="md">
				<Dashboard />
			</Container>
		</ReportProvider>
	);
};

export default App;