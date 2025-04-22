import React from 'react';
import {
	Box,
	Modal,
	Paper,
	Typography,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalWrapperProps {
	open: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
	open,
	onClose,
	title,
	children,
}) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box
				component={Paper}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '80%',
					p: 4,
				}}
			>
				<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
					<Typography variant="h6">{title}</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				{children}
			</Box>
		</Modal>
	);
};
