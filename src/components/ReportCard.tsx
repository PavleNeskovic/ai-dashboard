import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';

interface ReportCardProps {
	title: string;
	loading?: boolean;
}

export const ReportCard: React.FC<ReportCardProps> = ({ title, loading = false }) => {
	return (
		<Card elevation={3} sx={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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