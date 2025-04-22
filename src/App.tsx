import React from 'react';
import { ReportProvider, useReportContext } from './context/ReportContext';
import { Container, Typography, Box } from '@mui/material';
import { PromptInputBar } from './components/PromptInputBar';
import { ReportGrid } from './components/ReportGrid';

const Dashboard = () => {
	const { reports } = useReportContext();

	return (
		<Box mt={4}>
			<PromptInputBar />
      <ReportGrid />
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