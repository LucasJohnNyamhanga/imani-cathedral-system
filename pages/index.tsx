import type { NextPage, InferGetStaticPropsType } from 'next';
import Hero from '../components/layout/Hero';
import ArticleLayout from '../components/layout/ArticleLayout';
import { prisma } from '../db/prisma';
import type { GetStaticProps } from 'next';
import { useContext, useEffect } from 'react';
import { NavContext } from '../components/context/StateContext';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
	Navigation,
	Pagination,
	EffectCreative,
	Keyboard,
	Autoplay,
} from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

type userData = {
	id: number;
	subjectName: string;
	subjectDefinition: string | null;
	imageLocation: string | null;
	forms: {
		formName: String;
	}[];
}[];

export const getStaticProps: GetStaticProps = async () => {
	// const subjectsFromServer: userData = await prisma.subject.findMany({
	// 	where: {
	// 		published: true,
	// 	},
	// 	select: {
	// 		id: true,
	// 		subjectName: true,
	// 		subjectDefinition: true,
	// 		imageLocation: true,
	// 		forms: {
	// 			select: {
	// 				formName: true,
	// 			},
	// 		},
	// 	},
	// });
	// const subjects = JSON.parse(JSON.stringify(subjectsFromServer));

	// //* FUNCTION TO UPDATE
	//   let update = async () => {
	//     for (let subject of subjects) {
	//       await prisma.subject.update({
	//         where: { id: subject.id },
	//         data: {
	//           category: { set: [{ id: 1 }, { id: 2 }, ],},
	//         },
	//     })
	//     }

	//  }

	//    update();

	return {
		props: {
			// subjects,
		},
		revalidate: 15,
	};
};

const Home: NextPage = ({
    	subjects,
    }: InferGetStaticPropsType<typeof getStaticProps>) => {
	const { navActive, setNavActive } = useContext(NavContext);

	useEffect(() => {
		setNavActive('Mwanzo');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navActive]);

	return (
		<>
			<Swiper
				navigation={true}
				pagination={{
					dynamicBullets: true,
				}}
				grabCursor={true}
				effect={'creative'}
				creativeEffect={{
					prev: {
						shadow: true,
						translate: [0, 0, -400],
					},
					next: {
						translate: ['100%', 0, 0],
					},
				}}
				keyboard={{
					enabled: true,
				}}
				autoplay={{
					delay: 5000,
					disableOnInteraction: true,
				}}
				modules={[Navigation, Pagination, EffectCreative, Keyboard, Autoplay]}
				className='mySwiper'>
				<SwiperSlide>
					<Hero
						image={'/worship.avif'}
						header={`Njoni, tumwimbie BWANA kwa furaha. - Zaburi 95:1`}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Hero
						image={'/worship2.avif'}
						header={`Kueni katika neema, na katika kumjua Bwana wetu na Mwokozi Yesu Kristo. - 2 Petro 3:18`}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Hero
						image={'/worship.jpg'}
						header={`Basi, jiwekeni chini ya Mungu; mpingeni Ibilisi naye atawakimbieni. Mkaribieni Mungu, naye atakuja karibu nanyi. - Yakobo 4:7`}
					/>
				</SwiperSlide>
				<SwiperSlide>
					<Hero
						image={'/test.jpg'}
						header={`Yesu akamwambia, Mimi ndimi njia, na kweli, na uzima; mtu haji kwa Baba, ila kwa njia ya mimi. - Yohana 14:6`}
					/>
				</SwiperSlide>
			</Swiper>
			<ArticleLayout />
		</>
	);
};

export default Home;
