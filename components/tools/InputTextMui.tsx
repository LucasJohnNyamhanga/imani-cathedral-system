import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Styles from '../../styles/InputTextMui.module.scss';
import { alpha, styled } from '@mui/material/styles';
import { type } from 'os';

const ValidationTextField = styled(TextField)({
	'& input:valid + fieldset': {
		borderColor: 'RGB(128, 0, 0)',
		borderWidth: 2,
	},
	'& input:valid:focus + fieldset': {
		borderLeftWidth: 2,
		borderColor: '#007aff',
		padding: '4px !important', // override inline-style
	},
});

type dataType = {
	label: string;
	name: string;
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		name: string
	) => void;
	content: string;
};

const Search = ({ label, name, handleChange, content }: dataType) => {
	useEffect(() => {}, [content]);

	return (
		<div className={Styles.searchContainer}>
			<div className={Styles.searchText}>
				<ValidationTextField
					multiline
					maxRows={4}
					fullWidth
					value={content}
					size='small'
					className={Styles.searchTool}
					label={label}
					onChange={(event) => handleChange(event, name)}
					variant='outlined'
				/>
			</div>
		</div>
	);
};

export default Search;
