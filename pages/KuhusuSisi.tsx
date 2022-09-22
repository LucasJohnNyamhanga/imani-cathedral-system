import React, { useContext, useEffect } from 'react';
import { NavContext } from '../components/context/StateContext';

const KuhusuSisi = ({}) => {
	const { navActive, setNavActive } = useContext(NavContext);

	useEffect(() => {
		setNavActive('KuhusuSisi');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navActive]);
	return <div>KuhusuSisi</div>;
};

export default KuhusuSisi;
