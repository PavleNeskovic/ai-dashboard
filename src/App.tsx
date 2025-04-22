import React, { useState } from 'react';
import { ReportProvider, useReportContext } from './context/ReportContext';
import { Container, Typography, Box } from '@mui/material';
import { PromptInputBar } from './components/PromptInputBar';
import { ReportGrid } from './components/ReportGrid';
import { ReportForm } from './components/ReportForm';
import { ReportToolbar } from './components/ReportToolbar';

const Dashboard = () => {
	const { reports } = useReportContext();
  const [showForm, setShowForm] = useState(false);

	return (
		<Box mt={4}>
        {showForm ? (
          <ReportForm onClose={() => setShowForm(false)} />
        ) : (
          <>
            <PromptInputBar />
            <ReportToolbar onAdd={() => setShowForm(true)} />
            <ReportGrid />
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