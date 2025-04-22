import React from 'react';
import { Grid } from '@mui/material';
import { ReportCard } from './ReportCard';
import { Report } from '../context/ReportContext';
import { SortableReportCard } from './SortableReportCard';

interface ReportGridProps {
	reports: Report[];
	onEdit: (report: Report) => void;
	onSummarize: (report: Report) => void;
}

export const ReportGrid: React.FC<ReportGridProps> = ({
	reports,
	onEdit,
	onSummarize,
}) => (
	<Grid container spacing={2} mt={4}>
		{reports.map((report) => (
			<Grid size={{ xs: 12, sm: 3 }} key={report.id}>
      <SortableReportCard
        key={report.id}
        report={report}
        onEdit={onEdit}
        onSummarize={onSummarize}
      />
			</Grid>
		))}
	</Grid>
);
            
  