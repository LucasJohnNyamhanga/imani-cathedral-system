import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import Styles from '../../styles/auth.module.scss';
import Loader from '../../components/tools/loader';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
//! insta @ johnsavanter
const SignIn = ({}) => {
	const [register, setRegister] = useState({
		firstName: '',
		lastName: '',
		username: '',
		password: '',
		password2: '',
	});
	const [loadingDisplay, setLoadingDisplay] = useState(false);
	const [signUpAccount, setSignUpAccount] = useState(false);
	const [signInAccount, setSignInAccount] = useState(true);

	const password1 = useRef<HTMLInputElement>(null!);
	const password2 = useRef<HTMLInputElement>(null!);
	const username = useRef<HTMLInputElement>(null!);

	const { push } = useRouter();

	const notify = (message: string) => toast(message);
	const notifySuccess = (message: string) => toast.success(message);
	const notifyError = (message: string) => toast.error(message);
	//! insta @ johnsavanter

	let handletextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		let name = e.target.name;
		setRegister({ ...register, [name]: value });
		username.current.style.color = 'black';
		password1.current.style.color = 'black';
		password2.current.style.color = 'black';
	};
	//! insta @ johnsavanter

	let togglePasswordSignUp = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			password1.current.type = 'text';
			password2.current.type = 'text';
		} else {
			password1.current.type = 'password';
			password2.current.type = 'password';
		}
	};

	let signTo = () => {
		push(`/Auth/SignIn`);
	};

	let createAccount = () => {
		if (
			register.firstName != '' &&
			register.lastName != '' &&
			register.password != '' &&
			register.password2 != '' &&
			register.username != ''
		) {
			if (register.password === register.password2) {
				if (register.password.length > 6 && register.password2.length > 6) {
					checkUser({ username: register.username });
				} else {
					notifyError('Password should exceed 6 characters.');
					password1.current.focus();
					password1.current.style.color = 'red';
					password2.current.style.color = 'red';
				}
			} else {
				notifyError('Password does not match');
				password1.current.focus();
				password1.current.style.color = 'red';
				password2.current.style.color = 'red';
			}
		} else {
			notifyError(`Fill In All Fields`);
		}
	};

	let checkUser = (data: {}) => {
		setLoadingDisplay(true);
		axios
			.post('http://localhost:3000/api/getUser', data)
			.then(function (response) {
				//responce
				const userData = JSON.parse(JSON.stringify(response.data));
				console.log(userData);
				setLoadingDisplay(false);
				if (Object.keys(userData).length > 0) {
					notifyError('Username already taken');
					username.current.focus();
					username.current.style.color = 'red';
				}
			})
			.catch(function (error) {
				// handle error
				registration(register.password);
			});
	};

	let registration = (password: string) => {
		let dataUser = {
			name: `${
				register.firstName.charAt(0).toUpperCase() +
				register.firstName.toLowerCase().slice(1)
			} ${
				register.lastName.charAt(0).toUpperCase() +
				register.lastName.toLowerCase().slice(1)
			}`,
			image: null,
			username: register.username,
			password,
		};

		axios
			.post('http://localhost:3000/api/createUser', dataUser)
			.then(function (response) {
				//responce
				if (response.data.type == 'success') {
					notifySuccess(response.data.message);
					setLoadingDisplay(false);
					signTo();
				} else {
					notifyError(response.data.message);
					setLoadingDisplay(false);
				}
			})
			.catch(function (error) {
				// handle error
			});
	};

	return (
		<div className={Styles.container}>
			<Toaster position='top-center' />
			<div className={Styles.innerContainer}>
				<div>
					<form
						className={Styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							createAccount();
						}}>
						<div className={Styles.logInHeader}>
							<div>
								<Image
									alt=''
									src={'/imani.png'}
									objectFit={'contain'}
									placeholder='blur'
									blurDataURL={'/imani.png'}
									width={150}
									height={150}
								/>
							</div>
							<div className={Styles.text}>Sajili Akaunti Mpya</div>
						</div>
						<div className={Styles.credential}>
							<div className={Styles.inputBox}>
								<input
									type='text'
									required
									value={register.firstName}
									placeholder={``}
									name={'firstName'}
									onChange={(event) => {
										handletextChange(event);
									}}
									autoComplete='off'
									autoCorrect='off'
									spellCheck={false}
								/>
								<span>Jina La Kwanza</span>
							</div>
							<div className={Styles.inputBox}>
								<input
									type='text'
									required
									value={register.firstName}
									placeholder={``}
									name={'firstName'}
									onChange={(event) => {
										handletextChange(event);
									}}
									autoComplete='off'
									autoCorrect='off'
									spellCheck={false}
								/>
								<span>Jina La Kati</span>
							</div>
							<div className={Styles.inputBox}>
								<input
									type='text'
									required
									value={register.lastName}
									placeholder={``}
									name={'lastName'}
									onChange={(event) => {
										handletextChange(event);
									}}
									autoComplete='off'
									autoCorrect='off'
									spellCheck={false}
								/>
								<span>Jina La Mwisho</span>
							</div>
							<div className={Styles.inputBox}>
								<input
									ref={username}
									required
									type='number'
									value={register.username}
									placeholder={``}
									name={'username'}
									onChange={(event) => {
										handletextChange(event);
									}}
									autoComplete='off'
									autoCorrect='off'
									spellCheck={false}
								/>
								<span>Namba Ya Bahasha</span>
							</div>
							<div className={Styles.inputBox}>
								<input
									ref={password1}
									type='password'
									value={register.password}
									placeholder={``}
									name={`password`}
									onChange={(event) => {
										handletextChange(event);
									}}
									autoComplete='off'
									autoCorrect='off'
									spellCheck={false}
									required
								/>
								<span>Neno La Siri</span>
							</div>
							<div className={Styles.inputBox}>
								<input
									required
									ref={password2}
									type='password'
									value={register.password2}
									placeholder={``}
									name={`password2`}
									onChange={(event) => {
										handletextChange(event);
									}}
									autoComplete='off'
									autoCorrect='off'
									spellCheck={false}
								/>
								<span>Ingiza Tena Neno La Siri</span>
							</div>
							<div className={Styles.check}>
								<input
									required
									type='checkbox'
									onChange={(e) => {
										togglePasswordSignUp(e);
									}}
								/>
								Onyesha Neno La Siri
							</div>
						</div>
						<div onClick={createAccount} className={Styles.button}>
							Tengeneza Akaunti
						</div>

						<div className={Styles.separator}>
							<hr className={Styles.line} />
							<div className={Styles.or}>Tayari Mtumiaji?</div>
							<hr className={Styles.line} />
						</div>
						<div className={Styles.buttonSignUp} onClick={signTo}>
							<div>Ingia Kwenye Akaunti Yako</div>
						</div>
					</form>
				</div>
				<div className={Styles.loader}>{loadingDisplay && <Loader />}</div>
			</div>
		</div>
	);
};

export default SignIn;

//*Removing default search bar :)
SignIn.getLayout = function PageLayout(page: ReactNode) {
	return <>{page}</>;
};
