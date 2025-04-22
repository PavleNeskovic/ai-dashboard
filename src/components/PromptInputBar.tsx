import React, { useState } from 'react';
import {
	Box,
	TextField,
	CircularProgress,
	IconButton,
	Paper,
	Divider,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useReportContext } from '../context/ReportContext';
import { generateReportFromPrompt } from '../services/openaiService';
import { useActivity } from '../context/ActivityContext';

export const PromptInputBar = () => {
	const { reports, setReports } = useReportContext();
  const { logActivity } = useActivity();
	const [prompt, setPrompt] = useState('');
	const [loading, setLoading] = useState(false);

	const handleGenerate = async () => {
		if (!prompt.trim()) return;
		setLoading(true);

		const placeholder = {
			id: `pending-${Date.now()}`,
			title: 'Generating...',
			content: '',
			loading: true,
		};

		setReports([placeholder, ...reports]);

		try {
			const content = await generateReportFromPrompt(prompt);
			const generated = {
				id: Date.now().toString(),
				title: prompt,
				content,
			};
			setReports((prev) => [generated, ...prev.filter((r) => r.id !== placeholder.id)]);
      logActivity(`AI draft generated from prompt: "${prompt}"`);
		} catch (err) {
			console.error('OpenAI error:', err);
			setReports((prev) =>
				prev.map((r) =>
					r.id === placeholder.id ? { ...r, title: 'Failed to generate', loading: false } : r
				)
			);
		} finally {
			setPrompt('');
			setLoading(false);
		}
	};

	return (
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
	);
};
