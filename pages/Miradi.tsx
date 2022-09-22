import React, { useContext, useEffect } from 'react';
import { NavContext } from '../components/context/StateContext';

const Miradi = ({}) => {
	const { navActive, setNavActive } = useContext(NavContext);

	useEffect(() => {
		setNavActive('Miradi');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navActive]);
	return <div>Miradi</div>;
};

export default Miradi;
