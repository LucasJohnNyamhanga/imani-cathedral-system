import React, { useContext, useEffect, useState } from 'react';
import Styles from '../../styles/NavMobile.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import DrawerMobile from '../tools/DrawerMobileMenu';
import { NavContext } from '../context/StateContext';
import { useSession, getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export const NavMobile = () => {
	const { navActive, setNavActive } = useContext(NavContext);
	const { data: session, status } = useSession();
	const [limt, setLimit] = useState(0);

	const { push, asPath } = useRouter();

	let handleSignIn = () => {
		push(`/Auth/SignIn?callbackUrl=${asPath}`);
	};

	let handleLogOut = () => {
		signOut({ redirect: false }).then(() => {
			setLimit(0);
			push('/');
		});
	};

	useEffect(() => {}, [navActive]);

	let handleMobileMenu = (linkValue: string) => {
		setNavActive(linkValue);
	};

	return (
		<div className={Styles.container}>
			<div className={Styles.innerContainerTop}>
				<div className={Styles.NavDetails}>
					<div className={Styles.topAdvatisment}>
						<p>Mawasiliano : 0700 000 000 | huduma@kkktimani.org</p>
					</div>
				</div>
				<div className={Styles.NavHeader}>
					<nav className={Styles.nav}>
						<Link passHref href='/'>
							<div className={Styles.logo}>
								<div className={Styles.icon}>
									<Image
										alt=''
										src={'/imani.png'}
										objectFit={'contain'}
										placeholder='blur'
										blurDataURL={'/imani.png'}
										width={40}
										height={40}
									/>
								</div>
								<div className={Styles.shule}>KKKT IMANI</div>
							</div>
						</Link>
						<div className={Styles.links}></div>
						<DrawerMobile
							handleMenu={handleMobileMenu}
							navActive={navActive}
							handleSignOut={handleLogOut}
							handleSighIn={handleSignIn}
						/>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default NavMobile;
