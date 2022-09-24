import { type } from 'os';
import Styles from '../../styles/matangazo.module.scss';

type dataType = {
	title: string;
	message: string;
	date: string;
};

const Matangazo = ({ title, message, date }: dataType) => {
	return (
		<div className={Styles.wrapper}>
			<div className={Styles.notifications}>
				<div className={Styles.notificationsItem}>
					<div className={Styles.notificationsItemcontent}>
						<span className={Styles.notificationsItemtitle}>{title}</span>
						<span className={Styles.notificationsItemmessage}>{message}</span>
						<span className={Styles.notificationsItemFooter}>
							Posted: {date}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Matangazo;
