import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.REACT_APP_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

export const generateReportFromPrompt = async (prompt: string): Promise<string> => {
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{ role: 'system', content: 'You are an assistant that writes business intelligence reports. Return the report as clean HTML formatted for a rich-text editor.' },
			{ role: 'user', content: `Write a detailed report based on this prompt: ${prompt}` },
		],
	});
	return response.choices[0].message.content || 'No response generated.';
};

export const summarizeReportContent = async (content: string): Promise<string> => {
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		messages: [
			{ role: 'system', content: 'You are an assistant that summarizes business reports.' },
			{ role: 'user', content: `Summarize this report:\n\n${content}` },
		],
	});
	return response.choices[0].message.content || 'No summary generated.';
};
