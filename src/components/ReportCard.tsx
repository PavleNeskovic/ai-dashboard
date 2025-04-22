import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	CircularProgress,
	Box,
	IconButton,
	Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRole } from '../context/RoleContext';

interface ReportCardProps {
	title: string;
	loading?: boolean;
	onEdit?: () => void;
	onSummarize?: () => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
	title,
	loading = false,
	onEdit,
	onSummarize,
}) => {
	const { role } = useRole();

	return (
		<Card
			elevation={2}
			sx={{
				height: 50,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				px: 2,
        pl: 5,
			}}
		>
			{/* Left: Title or Loading */}
			{loading ? (
				<Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
					<CircularProgress size={20} />
				</Box>
			) : (
				<Typography variant="subtitle1" noWrap>
					{title}
				</Typography>
			)}

			{/* Right: Action buttons */}
			{!loading && (
				<Box display="flex" gap={1}>
					<Tooltip title="Summarize Report">
						<IconButton size="small" onClick={onSummarize}>
							<ArticleIcon fontSize="small" />
						</IconButton>
					</Tooltip>

					{role === 'Admin' && (
						<Tooltip title="Edit Report">
							<IconButton size="small" onClick={onEdit}>
								<EditIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					)}

					{role === 'Viewer' && (
						<Tooltip title="View Report">
							<IconButton size="small" onClick={onEdit}>
								<VisibilityIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					)}
				</Box>
			)}
		</Card>
	);
};
