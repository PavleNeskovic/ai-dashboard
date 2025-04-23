import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { ReportCard } from './ReportCard';
import { Report } from '../../context/ReportContext';

interface SortableReportCardProps {
	report: Report;
	onEdit: (report: Report) => void;
	onSummarize: (report: Report) => void;
}

export const SortableReportCard: React.FC<SortableReportCardProps> = ({
	report,
	onEdit,
	onSummarize,
}) => {
	const {
		setNodeRef,
		transform,
		transition,
		attributes,
		listeners,
	} = useSortable({ id: report.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		position: 'relative' as const,
	};

	return (
		<Grid
			ref={setNodeRef}
			style={style}
		>
    <IconButton
      {...attributes}
      {...listeners}
      sx={{
        position: 'absolute',
        zIndex: 1,
        cursor: 'grab',
        backgroundColor: 'white',
				width: 50,
				height: 50,
      }}
      size="small"
    >
      <DragIndicatorIcon fontSize="small" />
    </IconButton>

			<ReportCard
				title={report.title}
        loading={report.loading}
				onEdit={() => onEdit(report)}
				onSummarize={() => onSummarize(report)}
			/>
		</Grid>
	);
};
