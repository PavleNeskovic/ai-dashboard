import React, { useState } from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { Report, useReportContext } from '../context/ReportContext';

export const PromptInputBar = () => {
	const { reports, setReports } = useReportContext();
	const [prompt, setPrompt] = useState('');
	const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
  
    setLoading(true);
  
    const id = `pending-${Date.now()}`;
    const placeholderReport = {
      id,
      title: 'Generating...',
      content: '',
      loading: true,
    };
  
    setReports([placeholderReport, ...reports]); // put at the top
  
    setTimeout(() => {
      const mockReport = {
        id: Date.now().toString(),
        title: `Mock Report - ${prompt.slice(0, 15)}...`,
        content: `This is a generated report based on the prompt: "${prompt}"`,
      };
  
      setReports((prev: Report[]) =>
        [mockReport, ...prev.filter((r: Report) => r.id !== id)]
      );
      
      setPrompt('');
      setLoading(false);
    }, 1500);
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
