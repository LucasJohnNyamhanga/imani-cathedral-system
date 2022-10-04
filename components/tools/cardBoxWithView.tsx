import React, { useEffect, useState } from 'react';
import Styles from '../../styles/cardBoxStyle.module.scss';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';

type dataType = {
	label: string;
	id: number;
	published: boolean | string;
	link: string;
	time: string;
};

const CardBoxStyle = ({ label, id, published, link, time }: dataType) => {
	const [showHidePublish, setShowHidePublish] = useState(false);

	useEffect(() => {
		typeof published == 'string'
			? setShowHidePublish(false)
			: setShowHidePublish(true);
	}, [published]);

	return (
		<>
			<Link passHref href={link}>
				<a>
					<div className={Styles.card}>
						<div className={Styles.labelTextView}>
							<div className={Styles.labelTextInText}>{label}</div>
							{showHidePublish && (
								<Tooltip title='Order Status'>
									<IconButton>
										<div className={Styles.published}>
											{published ? (
												<div className={Styles.publisedPublised}>Pending</div>
											) : (
												<div className={Styles.publisedUnPublised}>Done</div>
											)}
										</div>
									</IconButton>
								</Tooltip>
							)}
						</div>

						<div className={Styles.labelTextInTextOnly}>
							<Tooltip title='View'>
								<IconButton>
									<div className={Styles.published}>
										<div className={Styles.publisedPublised}>{time}</div>
									</div>
								</IconButton>
							</Tooltip>
						</div>
					</div>
				</a>
			</Link>
		</>
	);
};

export default CardBoxStyle;
