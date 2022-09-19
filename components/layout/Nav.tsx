import React, { useContext, useEffect, useState } from 'react';
import Styles from '../../styles/navigation.module.scss';
import Link from 'next/link';
import { NavContext } from '../../components/context/StateContext';
import { useSession, getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import User from '../layout/User';
import Image from 'next/image';

const Nav = () => {
	const { setNavActive, navActive } = useContext(NavContext);
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

	return (
		<div className={Styles.container}>
			<div className={Styles.innerContainerTop}>
				<div className={Styles.NavDetails}>
					<div className={Styles.topAdvatisment}>
						<p>Mawasiliano : 0700 000 000 | huduma@kkktimani.org</p>
					</div>
				</div>
				<div className={Styles.NavHeaderDetails}>
					<div className={Styles.utangulizi}>
						<div className={Styles.logo}>
							<div className={Styles.icon}>
								<Image
									alt=''
									src={'/imani.png'}
									objectFit={'contain'}
									placeholder='blur'
									blurDataURL={'/imani.png'}
									width={100}
									height={100}
								/>
							</div>
							<div className={Styles.kkkt}>KKKT USHARIKA WA IMANI</div>
							<div className={Styles.verse}>
								<div className={Styles.details}>
									&ldquo;Kabla sijasema neno lolote, wewe, ee Mwenyezi-Mungu,
									walijua kabisa.&rdquo;
								</div>
								<div className={Styles.number}>Zaburi 139:4</div>
							</div>
						</div>
					</div>
				</div>
				<div className={Styles.NavHeader}>
					<nav className={Styles.nav}>
						<div className={Styles.links}>
							<ul>
								<Link href='/'>
									<a>
										<div
											onClick={() => {
												setNavActive('Notes');
											}}>
											<li
												className={
													'Notes' == navActive ? Styles.active : Styles.links
												}>
												Mwanzo
											</li>
										</div>
									</a>
								</Link>
								<Link href='/Review'>
									<a>
										<div
											onClick={() => {
												setNavActive('Review');
											}}>
											<li
												className={
													'Review' == navActive ? Styles.active : Styles.links
												}>
												Kuhusu Sisi
											</li>
										</div>
									</a>
								</Link>
								<Link href='/Review'>
									<a>
										<div
											onClick={() => {
												setNavActive('Review');
											}}>
											<li
												className={
													'Review' == navActive ? Styles.active : Styles.links
												}>
												Huduma
											</li>
										</div>
									</a>
								</Link>
								<Link href='/Exams'>
									<a>
										<div
											onClick={() => {
												setNavActive('Exams');
											}}>
											<li
												className={
													'Exams' == navActive ? Styles.active : Styles.links
												}>
												Vikundi
											</li>
										</div>
									</a>
								</Link>
								<Link href='/References'>
									<a>
										<div
											onClick={() => {
												setNavActive('References');
											}}>
											<li
												className={
													'References' == navActive
														? Styles.active
														: Styles.links
												}>
												Miradi
											</li>
										</div>
									</a>
								</Link>
								<Link href='/References'>
									<a>
										<div
											onClick={() => {
												setNavActive('References');
											}}>
											<li
												className={
													'References' == navActive
														? Styles.active
														: Styles.links
												}>
												Matangazo
											</li>
										</div>
									</a>
								</Link>
							</ul>
						</div>
						<div className={Styles.buttonsNav}>
							{status == 'loading' ? (
								<div className={Styles.validating}>Validating...</div>
							) : session ? (
								<>
									<User signOut={handleLogOut} />
								</>
							) : (
								<>
									<div className={Styles.Sign}>Jisajili</div>
									<div onClick={handleSignIn} className={Styles.Register}>
										Ingia
									</div>
								</>
							)}
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Nav;
