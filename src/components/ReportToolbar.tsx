import React from 'react';
import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useRole } from '../context/RoleContext';

interface ReportToolbarProps {
	onAdd: () => void;
	searchTerm: string;
	onSearchChange: (value: string) => void;
}

export const ReportToolbar: React.FC<ReportToolbarProps> = ({
	onAdd,
	searchTerm,
	onSearchChange,
}) => {
	const { role } = useRole();
	const isAdmin = role === 'Admin';

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			my={2}
			flexWrap="wrap"
			gap={2}
		>
			{/* Left side: Title */}
			<Typography variant="h6" fontWeight={500}>
				Reports:
			</Typography>

			{/* Right side: Search and Add */}
			<Box display="flex" alignItems="center" gap={2}>
				<TextField
					size="small"
					variant="standard"
					placeholder="Search reports..."
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon sx={{ color: 'text.secondary' }} />
							</InputAdornment>
						),
					}}
					sx={{
						width: { xs: '100%', sm: 150, md: 200 },
					}}
				/>
				{isAdmin && (
					<Button
						variant="text"
						color="inherit"
						startIcon={<AddIcon />}
						onClick={onAdd}
						sx={{
							whiteSpace: 'nowrap',
							fontWeight: 500,
							color: 'primary.main',
						}}
					>
						New
					</Button>
				)}
			</Box>
		</Box>
	);
};
