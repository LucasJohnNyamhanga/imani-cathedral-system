import { Drawer, Box, List, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Styles from '../../styles/drawerMobile.module.scss';
import { useSession } from 'next-auth/react';
import Toggle from '../layout/Toggle';

type dataType = {
	handleMenu: (linkValue: string) => void;
	handleSignOut: () => void;
	handleSighIn: () => void;
	handleJisajili: () => void;
	navActive: string;
};

export const MuiDrawer = ({
	handleMenu,
	navActive,
	handleSignOut,
	handleSighIn,
	handleJisajili,
}: dataType) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const humberger = useRef<HTMLDivElement>(null!);
	const { data: session, status } = useSession();
	const [activeName, setactiveName] = useState('');

	useEffect(() => {}, [navActive]);

	const handleSetActiveName = (name: string) => {
		setactiveName(name);
	};

	let handleMenuClick = (linkValue: string) => {
		humberger.current.classList.toggle(Styles.isActive);

		setIsDrawerOpen(!isDrawerOpen);
		if (linkValue != '') {
			handleMenu(linkValue);
		}

		setactiveName('');
	};

	let handleClose = () => {
		setIsDrawerOpen(!isDrawerOpen);
		humberger.current.classList.toggle(Styles.isActive);
		setactiveName('');
	};

	const vikundiList = [
		{ name: 'Kwaya ya Uinjilist', link: '/#' },
		{ name: 'Kwaya ya Imani', link: '/#' },
		{ name: 'Kwaya ya Tumaini', link: '/#' },
		{ name: 'Kwaya ya Vijana', link: '/#' },
		{ name: 'Umoja wa vijana', link: '/#' },
		{ name: 'Umoja wa wakinamama', link: '/#' },
	];

	const hudumaList = [
		{ name: 'Ratiba za Ibada', link: '/#' },
		{ name: 'Ibada za Kusifu na Kuabudu', link: '/#' },

		{ name: 'Semina', link: '/#' },
		{ name: 'Fellowship', link: '/#' },
		{ name: 'Darasa la Ubatizo', link: '/#' },
		{ name: 'Darasa la Kipaimara', link: '/#' },
		{ name: 'Darasa la Ndoa', link: '/#' },
	];

	const sisi = [
		{ name: 'Historia ya Kanisa', link: '/#' },
		{ name: 'Uongozi', link: '/#' },
		{ name: 'Jumuiya', link: '/#' },
		{ name: 'Baraza la Wazee', link: '/#' },
	];

	const habariList = [
		{ name: 'Matangazo', link: '/#' },
		{ name: 'Habari na Matukio', link: '/#' },
		{ name: 'Mahubiri Na Mafundisho', link: '/#' },
	];

	return (
		<>
			<div
				ref={humberger}
				onClick={() => {
					handleMenuClick('');
				}}
				className={`${Styles.buttonsNav}`}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<Drawer anchor='left' open={isDrawerOpen} onClose={handleClose}>
				<Box p={2} width='250px' textAlign='center' role='presentation'>
					<ListItemText primary={`KKKT IMANI`} />

					<List>
						<Divider />
						<Link href={'/'}>
							<a>
								<div
									className={
										'Mwanzo' == navActive ? Styles.active : Styles.setCenter
									}
									onClick={() => {
										handleMenuClick('Mwanzo');
									}}>
									Mwanzo
								</div>
							</a>
						</Link>
						<Divider />

						<Toggle
							list={sisi}
							name={'Kuhusu sisi'}
							action={handleMenuClick}
							activeName={activeName}
							setActiveName={handleSetActiveName}
						/>
						<Divider />

						<Toggle
							list={hudumaList}
							name={'Huduma'}
							action={handleMenuClick}
							activeName={activeName}
							setActiveName={handleSetActiveName}
						/>
						<Divider />
						<Toggle
							list={vikundiList}
							name={'Vikundi'}
							action={handleMenuClick}
							activeName={activeName}
							setActiveName={handleSetActiveName}
						/>

						<Divider />
						<Link href={'/Miradi'}>
							<a>
								<div
									className={
										'Miradi' == navActive ? Styles.active : Styles.setCenter
									}
									onClick={() => {
										handleMenuClick('Miradi');
									}}>
									Miradi
								</div>
							</a>
						</Link>
						<Divider />
						<Toggle
							list={habariList}
							name={'Habari'}
							action={handleMenuClick}
							activeName={activeName}
							setActiveName={handleSetActiveName}
						/>
						<Divider />
					</List>
					<ListItemText primary={`ACCOUNT`} />
					<Divider />
					<List>
						{session ? (
							<>
								<Link href={'/Account'}>
									<a>
										<div
											onClick={() => {
												handleMenuClick('');
											}}
											className={Styles.setCenter}>
											My Account
										</div>
									</a>
								</Link>
								<Divider />
								<div
									className={Styles.activeCredential}
									onClick={() => {
										handleSignOut();
										handleMenuClick('');
									}}>
									Sign Out
								</div>
								<Divider />
							</>
						) : (
							<>
								<div
									className={Styles.activeCredential}
									onClick={() => {
										handleJisajili();
										handleMenuClick('');
									}}>
									Jisajili
								</div>
								<Divider />
								<div
									className={Styles.activeCredential}
									onClick={() => {
										handleSighIn();
										handleMenuClick('');
									}}>
									Ingia
								</div>
								<Divider />
							</>
						)}
						<Divider />
					</List>
				</Box>
			</Drawer>
		</>
	);
};

export default MuiDrawer;
