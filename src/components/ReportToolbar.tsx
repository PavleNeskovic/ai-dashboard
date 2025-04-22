import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

interface ReportToolbarProps {
	onAdd: () => void;
}

export const ReportToolbar: React.FC<ReportToolbarProps> = ({ onAdd }) => {
	return (
		<Box
			display="flex"
			justifyContent="flex-end"
			alignItems="center"
			py={2}
      my={2}
			sx={{ borderTop: '1px solid #ddd' }}
			gap={1}
		>
			<Tooltip title="Search">
				<IconButton color="primary">
					<SearchIcon />
				</IconButton>
			</Tooltip>
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
	);
};
