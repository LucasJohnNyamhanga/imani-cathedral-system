import React from 'react';
import Styles from '../../styles/articleLayout.module.scss';
import BlogCard from '../tools/BlogCard';
import Card from '../tools/Card';
import Matangazo from '../tools/Matangazo';

const ArticleLayout = () => {
	const habari = [
		{
			title: 'Ushirika wa Imani wazindua website.',
			subTitle: 'Kuelekea mabadiliko ya kidijitali.',
			image: '/kkkt.jpg',
			content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
						dolorum architecto obcaecati enim dicta praesentium, quam nobis!
						Neque ad aliquam facilis numquam. Veritatis, sit.`,
			mwandishi: 'KKKT IMANI Admin',
			tarehe: 'Aug. 24, 2015',
			tag: '',
		},
		{
			title: 'Semina na mafundisho yaendelea.',
			subTitle: 'Mwezi wa kumjua Mungu.',
			image: '/semina.jpg',
			content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
						dolorum architecto obcaecati enim dicta praesentium, quam nobis!
						Neque ad aliquam facilis numquam. Veritatis, sit.`,
			mwandishi: 'KKKT IMANI Admin',
			tarehe: 'Aug. 24, 2015',
			tag: '',
		},
		{
			title: 'Askofu Shoo aongezewa majukumu kimataifa.',
			subTitle: 'Awa Mjumbe wa Kamati Kuu ya Baraza la Makanisa Duniani (WCC).',
			image: '/shoo.jpg',
			content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
						dolorum architecto obcaecati enim dicta praesentium, quam nobis!
						Neque ad aliquam facilis numquam. Veritatis, sit.`,
			mwandishi: 'KKKT IMANI Admin',
			tarehe: 'Aug. 24, 2015',
			tag: '',
		},
		{
			title: 'Wachungaji wanawake wa kwanza na mazito waliyokutana nayo.',
			subTitle: 'Changamoto za wachungaji wanawake na magumu waliopitia.',
			image: '/wachungaji.jpg',
			content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
						dolorum architecto obcaecati enim dicta praesentium, quam nobis!
						Neque ad aliquam facilis numquam. Veritatis, sit.`,
			mwandishi: 'KKKT IMANI Admin',
			tarehe: 'Aug. 24, 2015',
			tag: '',
		},
	];

	const mahubiri = [
		{
			title: 'Maisha ndani ya Kristo Yesu.',
			subTitle: 'Tumjue Kristo na jinsi anavyoishi ndani yetu.',
			image: '/worship2.jpg',
			content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
						dolorum architecto obcaecati enim dicta praesentium, quam nobis!
						Neque ad aliquam facilis numquam. Veritatis, sit.`,
			mwandishi: 'KKKT IMANI Admin',
			tarehe: 'Aug. 24, 2015',
			tag: '',
		},
		{
			title: 'Jinsi baraka zinavyofanya kazi kupitia sadaka.',
			subTitle: 'Sadaka inavyofungua maisha na kuleta baraka.',
			image: '/worship3.jpg',
			content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
						dolorum architecto obcaecati enim dicta praesentium, quam nobis!
						Neque ad aliquam facilis numquam. Veritatis, sit.`,
			mwandishi: 'KKKT IMANI Admin',
			tarehe: 'Aug. 24, 2015',
			tag: '',
		},
	];
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
						<BlogCard data={habari} />
						<div className={Styles.headerTextEndelea}>
							<div>Endelea Habari Na Matukio</div>
						</div>
						<div className={Styles.headerText}>Mahubiri Na Mafundisho</div>
						<BlogCard data={mahubiri} />

						<div className={Styles.headerTextEndelea}>
							<div>Endelea Mahubiri Na Mafundisho</div>
						</div>
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
