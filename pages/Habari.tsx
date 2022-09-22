import React, { useContext, useEffect } from 'react';
import { NavContext } from '../components/context/StateContext';

const Matangazo = ({}) => {
	const { navActive, setNavActive } = useContext(NavContext);

	useEffect(() => {
		setNavActive('Habari');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navActive]);
	return <div>Matangazo</div>;
};

export default Matangazo;
