import React from 'react';
import { Grid } from '@mui/material';
import { Report, useReportContext } from '../context/ReportContext';
import { ReportCard } from './ReportCard';

interface ReportGridProps {
	searchTerm: string;
  onEdit: (report: Report) => void;
}

export const ReportGrid: React.FC<ReportGridProps> = ({ searchTerm, onEdit }) => {
	const { reports } = useReportContext();

  const filtered = reports.filter((r) =>
		r.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<Grid container spacing={2} mt={4}>
      {filtered.map((report) => (
          <Grid size={3}>
              <div>
                <ReportCard title={report.title} loading={report.loading} onEdit={() => onEdit(report)} />
              </div>
          </Grid>
				))}
		</Grid>
	);
};