import React from 'react';
import Styles from '../../styles/articleLayout.module.scss';
import BlogCard from '../tools/BlogCard';
import Card from '../tools/Card';
import Matangazo from '../tools/Matangazo';

const ArticleLayout = () => {
	return (
		<div className={Styles.container}>
			<div className={Styles.innerContainer}>
				<div className={Styles.containerLeft}>
					<div>
						<div className={Styles.headerText}>
							Karibu KKKT Ushirika wa Imani
						</div>
						<Card />
					</div>
					<div>
						<div className={Styles.headerText}>Habari Na Matukio</div>
						<BlogCard />
					</div>
				</div>
				<div className={Styles.containerRight}>
					<div className={Styles.headerText}>Matangazo</div>
					<Matangazo
						title={'Nafasi Ya Kazi'}
						message={
							'Muhudumu wa kanisa ambaye atafanya kazi za ndani na nje ya kanisa'
						}
						date={'22 Sep 2022'}
					/>
					<Matangazo
						title={'Matayarisho Siku ya Mikaeli na Watoto'}
						message={
							'Matayarisho ya Siku ya Mikaeli na Watoto yataendela kila jumapili jioni kuanzia saa tisa alasili.'
						}
						date={'17 Sep 2022'}
					/>
				</div>
			</div>
		</div>
	);
};

export default ArticleLayout;
