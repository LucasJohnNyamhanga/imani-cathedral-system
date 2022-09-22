import React, { useContext, useEffect } from 'react';
import { NavContext } from '../components/context/StateContext';

const Huduma = ({}) => {
	const { navActive, setNavActive } = useContext(NavContext);

	useEffect(() => {
		setNavActive('Huduma');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navActive]);
	return <div>Huduma</div>;
};

export default Huduma;
