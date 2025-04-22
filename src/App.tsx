import React, { useState } from 'react';
import { Report, ReportProvider, useReportContext } from './context/ReportContext';
import { Container, Typography, Box } from '@mui/material';
import { PromptInputBar } from './components/PromptInputBar';
import { ReportGrid } from './components/ReportGrid';
import { ReportForm } from './components/ReportForm';
import { ReportToolbar } from './components/ReportToolbar';
import { SortableReportGrid } from './components/SortableReportGrid';
import { SummaryModal } from './components/SummaryModal';

const Dashboard = () => {
	const { reports } = useReportContext();
	const [searchTerm, setSearchTerm] = useState('');
	const [editReport, setEditReport] = useState<Report | null>(null);
	const [showSummary, setShowSummary] = useState(false);
	const [selectedContent, setSelectedContent] = useState('');

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
					<SortableReportGrid
						searchTerm={searchTerm}
						onEdit={(r) => setEditReport(r)}
						onSummarize={(r) => {
							setSelectedContent(r.content);
							setShowSummary(true);
						}}
					/>
				</>
			)}

			<SummaryModal
				open={showSummary}
				onClose={() => setShowSummary(false)}
				content={selectedContent}
			/>
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