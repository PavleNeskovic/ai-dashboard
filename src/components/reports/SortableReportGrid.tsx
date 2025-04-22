import React from 'react';
import {
	DndContext,
	closestCenter,
	useSensor,
	useSensors,
	PointerSensor,
	TouchSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useReportContext, Report } from '../../context/ReportContext';
import { ReportGrid } from './ReportGrid';

interface SortableGridProps {
	searchTerm: string;
	onEdit: (report: Report) => void;
	onSummarize: (report: Report) => void;
}

export const SortableReportGrid: React.FC<SortableGridProps> = ({
	searchTerm,
	onEdit,
	onSummarize,
}) => {
	const { reports, setReports } = useReportContext();
  const sensors = useSensors(
    useSensor(PointerSensor), // still good for desktop
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

	const filtered = reports.filter((r) =>
		r.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (active.id !== over?.id) {
			const oldIndex = reports.findIndex((r) => r.id === active.id);
			const newIndex = reports.findIndex((r) => r.id === over?.id);
			const updated = [...reports];
			const [moved] = updated.splice(oldIndex, 1);
			updated.splice(newIndex, 0, moved);
			setReports(updated);
		}
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={filtered.map((r) => r.id)} strategy={verticalListSortingStrategy}>
				<ReportGrid
					reports={filtered}
					onEdit={onEdit}
					onSummarize={onSummarize}
				/>
			</SortableContext>
		</DndContext>
	);
};
