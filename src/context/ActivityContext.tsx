import React, { createContext, useContext, useEffect, useState } from 'react';

type Activity = {
	timestamp: string;
	message: string;
};

const ActivityContext = createContext<{
	activityLog: Activity[];
	logActivity: (message: string) => void;
}>({
	activityLog: [],
	logActivity: () => {},
});

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activityLog, setActivityLog] = useState<Activity[]>(() => {
    const stored = localStorage.getItem('activityLog');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
  }, [activityLog]);

	const logActivity = (message: string) => {
		const entry = {
			timestamp: new Date().toLocaleString(),
			message,
		};
		setActivityLog((prev) => [entry, ...prev]);
	};

	return (
		<ActivityContext.Provider value={{ activityLog, logActivity }}>
			{children}
		</ActivityContext.Provider>
	);
};

export const useActivity = () => useContext(ActivityContext);
