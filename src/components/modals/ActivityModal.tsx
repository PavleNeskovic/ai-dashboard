import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { useActivity } from '../../context/ActivityContext';
import { ModalWrapper } from './ModalWrapper';

export const ActivityModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
	const { activityLog } = useActivity();

	return (
		<ModalWrapper open={open} onClose={onClose} title="Activity Log">
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
		</ModalWrapper>
	);
};
