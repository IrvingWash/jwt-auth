import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';

import { Context } from '.';
import LoginForm from './components/login-form';
import { IUser } from './models/IUser';
import { UserService } from './services/user-service';

function App(): JSX.Element {
	const { store } = useContext(Context);

	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		store.checkAuth();
	}, []);

	if (store.isLoading) {
		return <div>Loading</div>;
	}

	if (!store.isAuth) {
		return (
			<>
				<LoginForm />
				<button onClick={ getUsers }>List users</button>
			</>
		);
	}

	return (
		<div className="App">
			<h1>{ store.isAuth ? store.user?.email : 'Not authorized' }</h1>
			<button onClick={ getUsers }>List users</button>
			<button onClick={ signOut }>Sign out</button>
			{ usersContent() }
		</div>
	);

	function signOut(): void {
		store.signOut();
	}

	async function getUsers(): Promise<void> {
		try {
			const response = await UserService.users();

			setUsers(response.data);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			throw new Error(error);
		}
	}

	function usersContent(): JSX.Element[] {
		return users.map((user) => {
			const { email } = user;

			return <div key={ email }>{ email }</div>;
		});
	}
}

export default observer(App);
