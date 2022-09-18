import Link from 'next/link';
import Styles from '../../styles/footer.module.scss';

const Footer = () => {
	return (
		<div className={Styles.container}>
			<div className={Styles.innerContainer}>
				<div className={Styles.footerDetails}>
					<div className={Styles.header}>Shule Info</div>
					<Link href='/AboutUs'>
						<a>
							<div className={Styles.body}>About Us</div>
						</a>
					</Link>
					<Link href='/ContactUs'>
						<a>
							<div className={Styles.body}>Contact Us</div>
						</a>
					</Link>
					<div className={Styles.body}>Help Line: +255784477999</div>
				</div>
				<div className={Styles.footerDetails}>
					<div className={Styles.header}>INTERNAL LINKS</div>
					<Link href='/'>
						<a>
							<div className={Styles.body}>Notes</div>
						</a>
					</Link>

					<Link href='/Review'>
						<a>
							<div className={Styles.body}>Review</div>
						</a>
					</Link>

					<Link href='/Exams'>
						<a>
							<div className={Styles.body}>Exams</div>
						</a>
					</Link>

					<Link href='/References'>
						<a>
							<div className={Styles.body}>References</div>
						</a>
					</Link>
				</div>
				<div className={Styles.footerDetails}>
					<div className={Styles.header}>Guide lines</div>
					<Link href='/TermsAndConditions'>
						<a>
							<div className={Styles.body}>Terms and Conditions </div>
						</a>
					</Link>
					<Link href='/PrivacyPolicy'>
						<a>
							<div className={Styles.body}>Privacy Policy </div>
						</a>
					</Link>
					<Link href='/Disclaimer'>
						<a>
							<div className={Styles.body}>Disclaimer</div>
						</a>
					</Link>
				</div>

				<div className={Styles.footerDetails}>
					<div className={Styles.header}>Social Media</div>
					<div className={Styles.body}>Instagram: </div>
					<div className={Styles.body}>Twitter: </div>
					<div className={Styles.body}>Facebook: </div>
				</div>
			</div>
			<div className={Styles.copyrights}>www.shule.co.tz &copy; 2022</div>
			<div className={Styles.product}>Product of DataSoft Technologies</div>
		</div>
	);
};

export default Footer;
