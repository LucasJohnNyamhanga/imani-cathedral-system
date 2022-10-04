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
	handleUpdate: (published: boolean, id: number) => void;
	link: string;
};

const CardBoxStyle = ({
	label,
	id,
	published,
	link,
	handleUpdate,
}: dataType) => {
	const [showHidePublish, setShowHidePublish] = useState(false);

	useEffect(() => {
		typeof published == 'string'
			? setShowHidePublish(true)
			: setShowHidePublish(true);
	}, [published]);

	return (
		<div className={Styles.card}>
			<div className={Styles.labelText}>
				<div className={Styles.labelTextInText}>{label}</div>
				{showHidePublish && (
					<Tooltip title='Update Status'>
						<IconButton
							onClick={() => {
								typeof published != 'string' ? handleUpdate(published, id) : '';
							}}>
							<div className={Styles.published}>
								{typeof published != 'string' ? (
									published ? (
										<div className={Styles.publisedPublised}>Published</div>
									) : (
										<div className={Styles.publisedUnPublised}>Draft</div>
									)
								) : (
									<div className={Styles.publisedPublised}>{published}</div>
								)}
							</div>
						</IconButton>
					</Tooltip>
				)}
			</div>

			<div className={Styles.controls}>
				{/* <Tooltip title="Delete">
          <IconButton>
            <DeleteForeverSharpIcon className={Styles.icons} />
          </IconButton>
        </Tooltip> */}
				<Link passHref href={link}>
					<a>
						<Tooltip title='Edit'>
							<IconButton>
								<EditSharpIcon className={Styles.icons} />
							</IconButton>
						</Tooltip>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default CardBoxStyle;
