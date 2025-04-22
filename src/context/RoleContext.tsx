import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'Admin' | 'Viewer';

const RoleContext = createContext<{
	role: UserRole;
	switchRole: () => void;
}>({
	role: 'Admin',
	switchRole: () => {},
});

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('userRole') as UserRole) || 'Admin';
  });

  const switchRole = () => {
    setRole((prev) => {
      const newRole = prev === 'Admin' ? 'Viewer' : 'Admin';
      localStorage.setItem('userRole', newRole);
      return newRole;
    });
  };

	return (
		<RoleContext.Provider value={{ role, switchRole }}>
			{children}
		</RoleContext.Provider>
	);
};

export const useRole = () => useContext(RoleContext);
