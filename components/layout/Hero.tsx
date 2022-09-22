import styles from '../../styles/hero.module.scss';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

type dataHero = {
	header: string;
	image: string;
};

function hero({ header, image }: dataHero) {
	const matches = useMediaQuery('(min-width:860px)');
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<div className={styles.hero}>
					<div className={styles.info}>
						<div className={styles.details}>
							<p>{header}</p>
						</div>
					</div>
					<div className={styles.image}>
						<Image
							alt=''
							src={image}
							objectFit={'cover'}
							placeholder='blur'
							blurDataURL={image}
							layout='fill'
							objectPosition={'top'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default hero;
