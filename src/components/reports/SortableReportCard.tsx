import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Container, IconButton } from '@mui/material';
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
    isDragging,
  } = useSortable({
    id: report.id,
    animateLayoutChanges: () => false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative' as const,
    zIndex: isDragging ? 1000 : 1,
    touchAction: 'none',
    userSelect: 'none' as const,
  };

  return (
    <Container
      ref={setNodeRef}
      style={style}
      className="sortable-report-card"
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
          '&:active': {
            cursor: 'grabbing',
          },
          touchAction: 'none',
        }}
        size="small"
        disableRipple
        disableTouchRipple
      >
        <DragIndicatorIcon fontSize="small" />
      </IconButton>

      <ReportCard
        title={report.title}
        loading={report.loading}
        onEdit={() => onEdit(report)}
        onSummarize={() => onSummarize(report)}
      />
    </Container>
  );
};