import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navigator from '../components/layout/Nav';
import NavMobile from '../components/layout/NavMobile';
import Footer from '../components/layout/Footer';
import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode, useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Progress } from '../components/tools/progress';
import { useProgressStore } from '../Store';
import { NavContext } from '../components/context/StateContext';
import { SessionProvider } from 'next-auth/react';

type Page<P = {}> = NextPage<P> & {
	// You can disable whichever you don't need
	getLayout?: (page: ReactElement) => ReactNode;
	layout?: ComponentType;
};

type dataProps = AppProps & {
	Component: Page;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: dataProps) {
	const matches = useMediaQuery('(min-width:958px)');

	const [navActive, setNavActive] = useState('Notes');

	//*progress router
	const setIsAnimating = useProgressStore(
		({ setIsAnimating }: any) => setIsAnimating
	);
	const isAnimating = useProgressStore(({ isAnimating }: any) => isAnimating);
	const router = useRouter();
	useEffect(() => {
		const handleStart = () => {
			setIsAnimating(true);
		};
		const handleStop = () => {
			setIsAnimating(false);
		};

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleStop);
		router.events.on('routeChangeError', handleStop);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleStop);
			router.events.off('routeChangeError', handleStop);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	if (Component.getLayout) {
		return Component.getLayout(
			<div className='container'>
				{/* <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }
    `}</style> */}

				<Progress isAnimating={isAnimating} />
				<SessionProvider session={session} refetchInterval={0}>
					<NavContext.Provider
						value={{
							setNavActive,
							navActive,
						}}>
						{matches ? <Navigator /> : <NavMobile />}
						<Component {...pageProps} />
						<Footer />
					</NavContext.Provider>
				</SessionProvider>
			</div>
		);
	}

	return (
		<div className='container'>
			<Progress isAnimating={isAnimating} />
			<SessionProvider
				session={session}
				refetchInterval={5 * 60}
				refetchOnWindowFocus={true}>
				<NavContext.Provider
					value={{
						setNavActive,
						navActive,
					}}>
					{matches ? <Navigator /> : <NavMobile />}
					{/* <Search /> */}
					<Component {...pageProps} />
					<Footer />
				</NavContext.Provider>
			</SessionProvider>
			{/* <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }
    `}</style> */}
		</div>
	);
}

export default MyApp;
