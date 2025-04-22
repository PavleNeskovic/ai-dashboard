import React, { useEffect, useState } from 'react';
import {
	Box,
	Modal,
	Typography,
	CircularProgress,
	Paper,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { summarizeReportContent } from '../services/openaiService';

interface SummaryModalProps {
	open: boolean;
	onClose: () => void;
	content: string;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({ open, onClose, content }) => {
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState('');

  useEffect(() => {
    if (open) {
      setLoading(true);
      setSummary('');
  
      summarizeReportContent(content)
        .then((summaryText) => setSummary(summaryText))
        .catch(() => setSummary('Failed to summarize.'))
        .finally(() => setLoading(false));
    }
  }, [open, content]);

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
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Report Summary</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
            <CircularProgress />
            <Typography ml={2}>Analyzing content...</Typography>
          </Box>
        ) : (
          <Typography>{summary}</Typography>
        )}
      </Box>
		</Modal>
	);
};
