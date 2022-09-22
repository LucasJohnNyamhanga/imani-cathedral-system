import React from 'react';
import Styles from '../../styles/blogCard.module.scss';

const BlogCard = () => {
	return (
		<div>
			<div className={Styles.blogcard}>
				<div className={Styles.meta}>
					<div
						className={Styles.photo}
						style={{
							backgroundImage: `url(/kkkt.jpg)`,
						}}></div>
					<ul className={Styles.details}>
						<li className={Styles.author}>
							<a href='#'>John Doe</a>
						</li>
						<li className={Styles.date}>Aug. 24, 2015</li>
						<li className={Styles.tags}>
							<ul>
								<li>
									<a href='#'>Learn</a>
								</li>
								<li>
									<a href='#'>Code</a>
								</li>
								<li>
									<a href='#'>HTML</a>
								</li>
								<li>
									<a href='#'>CSS</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div className={Styles.description}>
					<h1>Ushirika wa Imani wazindua website.</h1>
					<h2>Kuelekea mabadiliko ya kidijitali.</h2>
					<p>
						{' '}
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
						dolorum architecto obcaecati enim dicta praesentium, quam nobis!
						Neque ad aliquam facilis numquam. Veritatis, sit.
					</p>
					<p className={Styles.readmore}>
						<a href='#'>Soma zaidi</a>
					</p>
				</div>
			</div>
			<div className={`${Styles.blogcard} ${Styles.alt}`}>
				<div className={Styles.meta}>
					<div
						className={Styles.photo}
						style={{
							backgroundImage: `url(/semina.jpg)`,
						}}></div>
					<ul className={Styles.details}>
						<li className={Styles.author}>
							<a href='#'>Jane Doe</a>
						</li>
						<li className={Styles.date}>July. 15, 2015</li>
						<li className={Styles.tags}>
							<ul>
								<li>
									<a href='#'>Learn</a>
								</li>
								<li>
									<a href='#'>Code</a>
								</li>
								<li>
									<a href='#'>JavaScript</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div className={Styles.description}>
					<h1>Semina na mafundisho yaendelea.</h1>
					<h2>Mafundisho ya jioni</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
						dolorum architecto obcaecati enim dicta praesentium, quam nobis!
						Neque ad aliquam facilis numquam. Veritatis, sit.
					</p>
					<p className={Styles.readmore}>
						<a href='#'>Soma zaidi</a>
					</p>
				</div>
			</div>
			<div className={Styles.blogcard}>
				<div className={Styles.meta}>
					<div
						className={Styles.photo}
						style={{
							backgroundImage: `url(/shoo.jpg)`,
						}}></div>
					<ul className={Styles.details}>
						<li className={Styles.author}>
							<a href='#'>John Doe</a>
						</li>
						<li className={Styles.date}>Aug. 24, 2015</li>
						<li className={Styles.tags}>
							<ul>
								<li>
									<a href='#'>Learn</a>
								</li>
								<li>
									<a href='#'>Code</a>
								</li>
								<li>
									<a href='#'>HTML</a>
								</li>
								<li>
									<a href='#'>CSS</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div className={Styles.description}>
					<h1>Askofu Shoo aongezewa majukumu kimataifa.</h1>
					<h2>Awa Mjumbe wa Kamati Kuu ya Baraza la Makanisa Duniani (WCC).</h2>
					<p>
						{' '}
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
						dolorum architecto obcaecati enim dicta praesentium, quam nobis!
						Neque ad aliquam facilis numquam. Veritatis, sit.
					</p>
					<p className={Styles.readmore}>
						<a href='#'>Soma zaidi</a>
					</p>
				</div>
			</div>
			<div className={`${Styles.blogcard} ${Styles.alt}`}>
				<div className={Styles.meta}>
					<div
						className={Styles.photo}
						style={{
							backgroundImage: `url(/wachungaji.jpg)`,
						}}></div>
					<ul className={Styles.details}>
						<li className={Styles.author}>
							<a href='#'>Jane Doe</a>
						</li>
						<li className={Styles.date}>July. 15, 2015</li>
						<li className={Styles.tags}>
							<ul>
								<li>
									<a href='#'>Learn</a>
								</li>
								<li>
									<a href='#'>Code</a>
								</li>
								<li>
									<a href='#'>JavaScript</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div className={Styles.description}>
					<h1>Wachungaji wanawake wa kwanza na mazito waliyokutana nayo.</h1>
					<h2>Changamoto za wachungaji wanawake na magumu waliopitia.</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum
						dolorum architecto obcaecati enim dicta praesentium, quam nobis!
						Neque ad aliquam facilis numquam. Veritatis, sit.
					</p>
					<p className={Styles.readmore}>
						<a href='#'>Soma zaidi</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
