import Link from 'next/link';
import Styles from '../../styles/footer.module.scss';

const Footer = () => {
	return (
		<div className={Styles.container}>
			<div className={Styles.innerContainer}>
				<div className={Styles.footerDetails}>
					<div className={Styles.header}>KKKT IMANI MAELEZO</div>
					<Link href='/AboutUs'>
						<a>
							<div className={Styles.body}>Kuhusu Sisi</div>
						</a>
					</Link>
					<Link href='/ContactUs'>
						<a>
							<div className={Styles.body}>Wasiliana Nasi</div>
						</a>
					</Link>
					<div className={Styles.body}>Mawasiliano: 0700000000</div>
				</div>
				<div className={Styles.footerDetails}>
					<div className={Styles.header}>VIUNGANISHI MUHIMU</div>
					<Link href='/'>
						<a>
							<div className={Styles.body}>Makao Makuu</div>
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
					<div className={Styles.header}>MITANDAO YA JAMII</div>
					<div className={Styles.body}>Instagram: </div>
					<div className={Styles.body}>Twitter: </div>
					<div className={Styles.body}>Facebook: </div>
				</div>
			</div>
			<div className={Styles.copyrights}>www.kkktimani.org &copy; 2022</div>
			<div className={Styles.product}>
				Imetengenezwa na DataSoft Technologies
			</div>
		</div>
	);
};

export default Footer;
