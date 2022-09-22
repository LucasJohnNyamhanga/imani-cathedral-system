import Styles from '../../styles/matangazo.module.scss';

const Matangazo = () => {
	return (
		<div className={Styles.wrapper}>
			<div className={Styles.notifications}>
				<div className={Styles.notificationsItem}>
					<div className={Styles.notificationsItemcontent}>
						<span className={Styles.notificationsItemtitle}>
							Nafasi ya kazi
						</span>
						<span className={Styles.notificationsItemmessage}>
							Muhudumu wa kanisa atakaesimamia kazi mbalimbali za kanisa.
						</span>
						<span className={Styles.notificationsItemFooter}>
							Posted: Feb 12 2022
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Matangazo;
