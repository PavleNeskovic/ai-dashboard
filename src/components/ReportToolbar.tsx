import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
			justifyContent="flex-end"
			alignItems="center"
			my={2}
			flexWrap="wrap"
			gap={2}
		>
			<TextField
				size="small"
				variant="outlined"
				placeholder="Search reports..."
				value={searchTerm}
				onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          width: { xs: '100%', sm: 200, md: 250 },
        }}
			/>
      {isAdmin && (
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{
            width: { xs: '100%', sm: 200, md: 250 },
            whiteSpace: 'nowrap',
            fontWeight: 500,
            color: 'primary.main',
          }}
        >
          Create Report
        </Button>
      )}
		</Box>
	);
};
