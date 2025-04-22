import { useState } from 'react';
import {
	Box,
	TextField,
	CircularProgress,
	IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useReportContext } from '../../context/ReportContext';
import { generateReportFromPrompt } from '../../services/openaiService';
import { useActivity } from '../../context/ActivityContext';

export const PromptInputBar = () => {
	const { reports, setReports } = useReportContext();
	const { logActivity } = useActivity();
	const [prompt, setPrompt] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorOpen, setErrorOpen] = useState(false);

	const handleGenerate = async () => {
		if (!prompt.trim()) return;
		setLoading(true);

		const id = `pending-${Date.now()}`;

		const placeholder = {
			id,
			title: 'Generating...',
			content: '',
			loading: true,
		};

		setReports([placeholder, ...reports]);

		try {
			const content = await generateReportFromPrompt(prompt);
			const generated = {
				id,
				title: prompt,
				content,
			};

			setReports((prev) => [generated, ...prev.filter((r) => r.id !== id)]);
			logActivity(`AI draft generated from prompt: "${prompt}"`);
		} catch (err) {
			console.error('OpenAI error:', err);

			setReports((prev) => prev.filter((r) => r.id !== id));
			setErrorOpen(true); // ✅ Show snackbar
		} finally {
			setPrompt('');
			setLoading(false);
		}
	};

	return (
		<>
			<Box position="relative">
				<TextField
					label="✦ Type a prompt to generate a draft report..."
					variant="outlined"
					multiline
					rows={4}
					fullWidth
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<IconButton
					onClick={handleGenerate}
					disabled={loading || !prompt.trim()}
					sx={{
						position: 'absolute',
						bottom: 16,
						right: 16,
						color: 'white',
						backgroundColor: 'primary.light',
						boxShadow: 1,
						'&:hover': {
							backgroundColor: 'primary.dark',
						},
					}}
				>
					{loading ? <CircularProgress size={20} /> : <ArrowForwardIcon />}
				</IconButton>
			</Box>

			<Snackbar
				open={errorOpen}
				autoHideDuration={4000}
				onClose={() => setErrorOpen(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					severity="error"
					variant="filled"
					onClose={() => setErrorOpen(false)}
				>
					Failed to generate report. Please try again.
				</Alert>
			</Snackbar>
		</>
	);
};
