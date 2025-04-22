import React from 'react';
import { Box, IconButton, Tooltip, TextField } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

interface ReportToolbarProps {
	onAdd: () => void;
	searchTerm: string;
	onSearchChange: (value: string) => void;
}

export const ReportToolbar: React.FC<ReportToolbarProps> = ({ onAdd, searchTerm, onSearchChange }) => {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
      my={2}
			py={2}
			sx={{ borderTop: '1px solid #ddd' }}
			gap={2}
			flexWrap="wrap"
		>
			<TextField
				size="small"
				variant="outlined"
				placeholder="Search reports by title..."
				value={searchTerm}
				onChange={(e) => onSearchChange(e.target.value)}
				sx={{ flexGrow: 1, minWidth: 200 }}
			/>
			<Box display="flex" gap={1}>
				<Tooltip title="Sort">
					<IconButton color="primary">
						<SortIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Filter">
					<IconButton color="primary">
						<FilterListIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Add Report">
					<IconButton color="primary" onClick={onAdd}>
						<AddIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</Box>
	);
};
