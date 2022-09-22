import React, { useContext, useEffect } from 'react';
import { NavContext } from '../components/context/StateContext';

const Vikundi = ({}) => {
	const { navActive, setNavActive } = useContext(NavContext);

	useEffect(() => {
		setNavActive('Vikundi');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navActive]);
	return <div>Vikundi</div>;
};

export default Vikundi;
