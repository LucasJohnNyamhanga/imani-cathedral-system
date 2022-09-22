import Styles from '../../styles/toggle.module.scss';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import React, { useState } from 'react';

type dataUser = {
	name: string;
	action: (neno: string) => void;
	nameList: { name: string; link: string }[];
};

export default function AccountMenu({ name, action, nameList }: dataUser) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [hover, setHover] = useState(false);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		action(name);
		setHover(true);
	};
	const handleClose = () => {
		setAnchorEl(null);
		action('void');
		setHover(false);
	};
	return (
		<React.Fragment>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
					width: '100px',
				}}>
				<div
					className={
						hover ? `${Styles.huduma} ${Styles.checked}` : Styles.huduma
					}
					onClick={handleClick}
					aria-controls={open ? 'account-menu' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}>
					{name}
				</div>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
				{nameList.map((listItem, index) => (
					<div key={index}>
						<Link href={listItem.link}>
							<a>
								<MenuItem>{listItem.name}</MenuItem>
							</a>
						</Link>
						<Divider />
					</div>
				))}
			</Menu>
		</React.Fragment>
	);
}
