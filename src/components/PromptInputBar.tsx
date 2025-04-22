import React, { useState } from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { Report, useReportContext } from '../context/ReportContext';
import { generateReportFromPrompt } from '../services/openaiService';

export const PromptInputBar = () => {
	const { reports, setReports } = useReportContext();
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
        title: `Report - ${prompt.slice(0, 20)}...`,
        content,
      };
      setReports((prev) => [generated, ...prev.filter((r) => r.id !== placeholder.id)]);
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
		<Box display="flex" flexDirection="column" gap={2} mt={4}>
			<TextField
				label="Enter your prompt"
				variant="outlined"
				multiline
				rows={4}
				fullWidth
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={handleGenerate}
				disabled={loading}
				sx={{ alignSelf: 'flex-end', width: 200 }}
			>
				{loading ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
			</Button>
		</Box>
	);
};
