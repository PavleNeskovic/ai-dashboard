import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface ReportCardProps {
	title: string;
	loading?: boolean;
	onEdit?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ title, loading = false, onEdit }) => {
	return (
		<Card elevation={3} sx={{ height: 260, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {!loading && (
				<IconButton
					size="small"
					onClick={onEdit}
					sx={{ position: 'absolute', top: 4, right: 4 }}
				>
					<EditIcon fontSize="small" />
				</IconButton>
			)}
			<CardContent>
				{loading ? (
					<Box display="flex" alignItems="center" justifyContent="center">
						<CircularProgress />
					</Box>
				) : (
					<Typography variant="h6">{title}</Typography>
				)}
			</CardContent>
		</Card>
	);
};