import React, { useState } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Box,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ListIcon from '@mui/icons-material/List';
import { useRole } from '../context/RoleContext';
import { ActivityModal } from './ActivityModal';


export const Navbar = () => {
	const { role, switchRole } = useRole();
	const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
	const [activityOpen, setActivityOpen] = useState(false);

	const handleMenu = (e: React.MouseEvent<HTMLElement>) => setMenuAnchor(e.currentTarget);
	const handleClose = () => setMenuAnchor(null);

	return (
		<>
			<AppBar position="static" color="default" elevation={1}>
				<Toolbar>
					<Box flexGrow={1}>
						<Typography variant="h6">AI Intelligence Dashboard</Typography>
					</Box>
					<IconButton onClick={handleMenu}>
						<AccountCircle />
					</IconButton>
					<Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleClose}>
						<MenuItem disabled>Current Role: {role}</MenuItem>
						<MenuItem onClick={() => { switchRole(); handleClose(); }}>
              <BadgeOutlinedIcon sx={{ mr: 1 }} />
							Switch Role to {role === 'Admin' ? 'Viewer' : 'Admin'}
						</MenuItem>
						<MenuItem onClick={() => { setActivityOpen(true); handleClose(); }}>
							<ListIcon sx={{ mr: 1 }} />
							Activity Tracker
						</MenuItem>
            <MenuItem disabled>
							Local Storage: on
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>

			<ActivityModal open={activityOpen} onClose={() => setActivityOpen(false)} />
		</>
	);
};