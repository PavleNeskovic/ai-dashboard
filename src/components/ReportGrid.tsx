import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Report, useReportContext } from '../context/ReportContext';
import { ReportCard } from './ReportCard';
import { SummaryModal } from './SummaryModal';

interface ReportGridProps {
	searchTerm: string;
  onEdit: (report: Report) => void;
}

export const ReportGrid: React.FC<ReportGridProps> = ({ searchTerm, onEdit }) => {
	const { reports } = useReportContext();
  const [showSummary, setShowSummary] = useState(false);
	const [selectedContent, setSelectedContent] = useState('');

  const filtered = reports.filter((r) =>
		r.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
    <>
      <Grid container spacing={2} mt={4}>
        {filtered.map((report) => (
            <Grid size={{ xs: 12, sm: 3 }} key={report.id}>
                <div>
                  <ReportCard 
                    title={report.title} 
                    loading={report.loading} 
                    onEdit={() => onEdit(report)} 
                    onSummarize={() => {
                      setSelectedContent(report.content);
                      setShowSummary(true);
                    }}  
                  />
                </div>
            </Grid>
          ))}
      </Grid>
      <SummaryModal
				open={showSummary}
				onClose={() => setShowSummary(false)}
				content={selectedContent}
			/>
    </>
	);
};