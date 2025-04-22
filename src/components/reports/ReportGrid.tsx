import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Report } from '../../context/ReportContext';
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
  <>
    {reports.length === 0 && (
      <Typography variant="h6" align="center" mt={4}>
        No reports available.
      </Typography>
    )}
    <Grid container spacing={2} mt={4}>
      {reports.map((report) => (
        <Grid size={{ xs: 12, sm: 6 }} key={report.id}>
        <SortableReportCard
          key={report.id}
          report={report}
          onEdit={onEdit}
          onSummarize={onSummarize}
        />
        </Grid>
      ))}
    </Grid>
  </>
);
            
  