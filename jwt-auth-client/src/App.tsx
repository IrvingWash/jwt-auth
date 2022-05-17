import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';

import { Context } from '.';
import LoginForm from './components/login-form';

function App(): JSX.Element {
	const { store } = useContext(Context);

	useEffect(() => {
		store.checkAuth();
	}, []);

	if (store.isLoading) {
		return <div>Loading</div>;
	}

	if (!store.isAuth) {
		return <LoginForm />;
	}

	return (
		<div className="App">
			<h1>{ store.isAuth ? store.user?.email : 'Not authorized' }</h1>
			<button onClick={ signOut }>Sign out</button>
		</div>
	);

	function signOut(): void {
		store.signOut();
	}
}

export default observer(App);
