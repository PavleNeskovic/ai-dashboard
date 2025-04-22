import { useState } from 'react';
import { Report, ReportProvider } from './context/ReportContext';
import { RoleProvider, useRole } from './context/RoleContext';
import { Container, Box, Divider } from '@mui/material';
import { PromptInputBar } from './components/reports/PromptInputBar';
import { ReportForm } from './components/reports/ReportForm';
import { ReportToolbar } from './components/reports/ReportToolbar';
import { SortableReportGrid } from './components/reports/SortableReportGrid';
import { SummaryModal } from './components/modals/SummaryModal';
import { Navbar } from './components/Navbar';
import { ActivityProvider } from './context/ActivityContext';

const Dashboard = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [editReport, setEditReport] = useState<Report | null>(null);
	const [showSummary, setShowSummary] = useState(false);
	const [selectedContent, setSelectedContent] = useState('');
  const { role } = useRole();

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
					{role === 'Admin' && (
            <>
              <PromptInputBar />
              <Divider sx={{ my: 6 }} />
              <ReportToolbar
                onAdd={() => setEditReport({ id: '', title: '', content: '' })}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </>
          )}
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
    <ActivityProvider>
      <RoleProvider>
        <ReportProvider>
          <Container maxWidth="md">
            <Navbar />
            <Dashboard />
          </Container>
        </ReportProvider>
      </RoleProvider>
    </ActivityProvider>
	);
};

export default App;