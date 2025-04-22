import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { summarizeReportContent } from '../../services/openaiService';
import { ModalWrapper } from './ModalWrapper';

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
		<ModalWrapper open={open} onClose={onClose} title="Report Summary">
			{loading ? (
				<Box display="flex" alignItems="center" justifyContent="center" mt={3}>
					<CircularProgress />
					<Typography ml={2}>Analyzing content...</Typography>
				</Box>
			) : (
				<Typography>{summary}</Typography>
			)}
		</ModalWrapper>
	);
};
