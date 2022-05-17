import React, { useState } from 'react';

export function LoginForm(): JSX.Element {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
			<button>Sign in</button>
			<button>Sign up</button>
		</div>
	);

	function handleEmailInput(event: React.ChangeEvent<HTMLInputElement>): void {
		setEmail(event.target.value);
	}

	function handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>): void {
		setPassword(event.target.value);
	}
}
