import React from 'react';
import { Grid } from '@mui/material';
import { useReportContext } from '../context/ReportContext';
import { ReportCard } from './ReportCard';

export const ReportGrid = () => {
	const { reports } = useReportContext();

	return (
		<Grid container spacing={2} mt={4}>
      {[...reports].map((report) => (
          <Grid size={3}>
              <div>
                <ReportCard title={report.title} loading={report.loading} />
              </div>
          </Grid>
				))}
		</Grid>
	);
};