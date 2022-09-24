type dataType = {
	name: string;
	list: { name: string; link: string }[];
	action: (action: string) => void;
};

import Link from 'next/link';
import { useState } from 'react';
import Styles from '../../styles/toggle.module.scss';

const Toggle = ({ name, list, action }: dataType) => {
	const [submenu, setSubmenu] = useState(false);
	const handleMenu = () => {
		setSubmenu(!submenu);
	};
	return (
		<div className={Styles.container}>
			<div
				className={
					submenu ? `${Styles.toggle} ${Styles.active}` : Styles.toggle
				}
				onClick={handleMenu}>
				{name}
			</div>
			{submenu && (
				<div className={Styles.innerContainer}>
					{list.map((item) => (
						<div className={Styles.itemHolder}>
							<Link href={item.link}>
								<a>
									<div
										className={Styles.item}
										onClick={(e) => {
											action(name);
										}}>
										{item.name}
									</div>
								</a>
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Toggle;
