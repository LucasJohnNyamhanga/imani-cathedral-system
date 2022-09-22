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
					<Matangazo />
					<Matangazo />
				</div>
			</div>
		</div>
	);
};

export default ArticleLayout;
