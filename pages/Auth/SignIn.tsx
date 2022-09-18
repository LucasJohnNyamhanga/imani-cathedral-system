import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import Styles from '../../styles/auth.module.scss';
import { useSession, getSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { BsGoogle } from 'react-icons/bs';
import Loader from '../../components/tools/loader';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import bcrypt from 'bcryptjs';
//! insta @ johnsavanter
const SignIn = ({}) => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

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

	const password = useRef<HTMLInputElement>(null!);
	const password1 = useRef<HTMLInputElement>(null!);
	const password2 = useRef<HTMLInputElement>(null!);
	const username = useRef<HTMLInputElement>(null!);

	const notify = (message: string) => toast(message);
	const notifySuccess = (message: string) => toast.success(message);
	const notifyError = (message: string) => toast.error(message);
	//! insta @ johnsavanter
	let handletext = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		let name = e.target.name;
		setFormData({ ...formData, [name]: value });
	};

	let handletextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		let name = e.target.name;
		setRegister({ ...register, [name]: value });
		username.current.style.color = 'black';
		password1.current.style.color = 'black';
		password2.current.style.color = 'black';
	};
	//! insta @ johnsavanter
	const { query, push } = useRouter();
	let callback = query.callbackUrl;

	let signInWithGoogle = async () => {
		setLoadingDisplay(true);
		//! use data to proceed
		const data = await signIn('google', { callbackUrl: `${callback}` }).then(
			(responce) => {
				if (responce?.status === 401) {
					notifyError('Incorrect Username Or Password');
					setLoadingDisplay(false);
				} else {
					setLoadingDisplay(false);
				}
			}
		);
	};
	let signInWithCredentials = async () => {
		if (formData.password != '' && formData.username != '') {
			setLoadingDisplay(true);
			//!use data to proceed
			const data = await signIn('credentials', {
				redirect: false,
				...formData,
			}).then((responce) => {
				if (responce?.status === 401) {
					notifyError('Incorrect Username Or Password');
					setLoadingDisplay(false);
				} else if (responce?.status === 200) {
					setLoadingDisplay(false);
					if (typeof callback != 'undefined') {
						if (callback.includes('/Auth')) {
							push(`/`);
						} else {
							push(`${callback}`);
						}
					} else {
						push('/');
					}
				}
			});
		} else {
			notifyError('Fill in all fields.');
		}
	};

	let togglePassword = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.checked
			? (password.current.type = 'text')
			: (password.current.type = 'password');
	};

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
		setSignInAccount(!signInAccount);
		setSignUpAccount(!signUpAccount);
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

				bcrypt.hash(register.password, 10, function (err, hash) {
					registration(hash);
				});
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
					{signInAccount && (
						<form
							className={Styles.form}
							onSubmit={(e) => {
								e.preventDefault();
								signInWithCredentials();
							}}>
							<div className={Styles.logInHeader}>
								<div>
									<AutoStoriesIcon className={Styles.icon} />
								</div>
								<div className={Styles.text}>Shule Account</div>
							</div>
							<div className={Styles.credential}>
								<div className={Styles.inputBox}>
									<input
										type='text'
										required
										value={formData.username}
										placeholder={``}
										name={'username'}
										onChange={(event) => {
											handletext(event);
										}}
										autoComplete='off'
										autoCorrect='off'
										spellCheck={false}
									/>
									<span>Username</span>
								</div>
								<div className={Styles.inputBox}>
									<input
										ref={password}
										required
										type='password'
										value={formData.password}
										placeholder={``}
										name={`password`}
										onChange={(event) => {
											handletext(event);
										}}
										autoComplete='off'
										autoCorrect='off'
										spellCheck={false}
									/>
									<span>Password</span>
								</div>
								<div className={Styles.check}>
									<input
										type='checkbox'
										onChange={(e) => {
											togglePassword(e);
										}}
									/>
									Show Password
								</div>
							</div>
							<div
								onSubmit={(e) => {
									e.preventDefault();
									signInWithCredentials();
								}}
								onClick={signInWithCredentials}
								className={Styles.button}>
								Sign In
							</div>
							<div className={Styles.separator}>
								<hr className={Styles.line} />
								<div className={Styles.or}>Or</div>
								<hr className={Styles.line} />
							</div>
							<div className={Styles.button} onClick={signInWithGoogle}>
								<BsGoogle className={Styles.google} />
								<div>Sign in with Google</div>
							</div>
							<div className={Styles.separator}>
								<hr className={Styles.line} />
								<div className={Styles.or}>New User</div>
								<hr className={Styles.line} />
							</div>
							<div className={Styles.buttonSignUp} onClick={signTo}>
								<div>Create Account</div>
							</div>
						</form>
					)}
				</div>
				<div>
					{signUpAccount && (
						<form
							className={Styles.form}
							onSubmit={(e) => {
								e.preventDefault();
								createAccount();
							}}>
							<div className={Styles.logInHeader}>
								<div>
									<AutoStoriesIcon className={Styles.icon} />
								</div>
								<div className={Styles.text}>Register to Shule</div>
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
									<span>First Name</span>
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
									<span>Last Name</span>
								</div>
								<div className={Styles.inputBox}>
									<input
										ref={username}
										required
										type='text'
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
									<span>Username</span>
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
									<span>Password</span>
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
									<span>Retype Password</span>
								</div>
								<div className={Styles.check}>
									<input
										required
										type='checkbox'
										onChange={(e) => {
											togglePasswordSignUp(e);
										}}
									/>
									Show Password
								</div>
							</div>
							<div onClick={createAccount} className={Styles.button}>
								Create Account
							</div>

							<div className={Styles.separator}>
								<hr className={Styles.line} />
								<div className={Styles.or}>Already User</div>
								<hr className={Styles.line} />
							</div>
							<div className={Styles.buttonSignUp} onClick={signTo}>
								<div>Sign In</div>
							</div>
						</form>
					)}
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
