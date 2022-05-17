import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';

import { Context } from '../';

function LoginForm(): JSX.Element {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { store } = useContext(Context);

	return (
		<div>
			<input
				type='text'
				placeholder='Email'
				value={ email }
				onChange={ handleEmailInput }
			/>

			<input
				type='password'
				placeholder='Password'
				value={ password }
				onChange={ handlePasswordInput }
			/>
			<button onClick={ signIn }>Sign in</button>
			<button onClick={ signUp }>Sign up</button>
		</div>
	);

	function handleEmailInput(event: React.ChangeEvent<HTMLInputElement>): void {
		setEmail(event.target.value);
	}

	function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>): void {
		setPassword(event.target.value);
	}

	function signIn(): void {
		store.signIn(email, password);
	}

	function signUp(): void {
		store.signUp(email, password);
	}
}

export default observer(LoginForm);
