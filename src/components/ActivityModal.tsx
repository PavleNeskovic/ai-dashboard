import React from 'react';
import {
	Box,
	Modal,
	Paper,
	Typography,
	IconButton,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useActivity } from '../context/ActivityContext';

export const ActivityModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
	const { activityLog } = useActivity();

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				component={Paper}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 500,
					p: 3,
				}}
			>
				<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h6">Activity Log</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<List>
					{activityLog.map((entry, i) => (
						<ListItem key={i} dense>
							<ListItemText
								primary={entry.message}
								secondary={entry.timestamp}
							/>
						</ListItem>
					))}
				</List>
			</Box>
		</Modal>
	);
};
