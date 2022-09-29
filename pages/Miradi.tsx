import React, { useContext, useEffect } from 'react';
import { NavContext } from '../components/context/StateContext';
import Styles from '../styles/miradi.module.scss';

const Miradi = ({}) => {
	const { navActive, setNavActive } = useContext(NavContext);

	useEffect(() => {
		setNavActive('Miradi');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navActive]);
	return (
		<div className={Styles.container}>
			<div className={Styles.section}>
				<div className={Styles.miradi}>Miradi</div>
			</div>
		</div>
	);
};

export default Miradi;
