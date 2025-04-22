import React, { createContext, useState, useContext } from "react";

export interface Report {
	id: string;
	title: string;
	content: string;
	loading?: boolean;
}

type ReportContextType = {
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
};

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([]);


  return (
    <ReportContext.Provider value={{ reports, setReports }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReportContext must be used within a ReportProvider");
  }
  return context;
};
