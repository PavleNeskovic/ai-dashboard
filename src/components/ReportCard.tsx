import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Box, IconButton, Tooltip } from '@mui/material';
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

export const ReportCard: React.FC<ReportCardProps> = ({ title, loading = false, onEdit, onSummarize }) => {
  const { role } = useRole();

	return (
		<Card elevation={3} 
      sx={{ 
        height: { xs: 140, sm: 260 },
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!loading && (
        <>
          <Tooltip title="Summarize Report">
            <IconButton
                size="small"
                onClick={onSummarize}
                sx={{ position: 'absolute', top: 4, right: 4 }}
              >
                <ArticleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {role === 'Admin' && (
          <Tooltip title="Edit Report">
            <IconButton
              size="small"
              onClick={onEdit}
              sx={{ position: 'absolute', top: 36, right: 4 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          )}
          {role === 'Viewer' && (
          <Tooltip title="View Report">
            <IconButton
              size="small"
              onClick={onEdit}
              sx={{ position: 'absolute', top: 36, right: 4 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          )}
        </>
				
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