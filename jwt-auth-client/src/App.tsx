import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';

import { Context } from '.';
import LoginForm from './components/login-form';

function App(): JSX.Element {
	const { store } = useContext(Context);

	useEffect(() => {
		store.checkAuth();
	}, []);

	return (
		<div className="App">
			<h1>{ store.isAuth ? store.user?.email : 'Not authorized' }</h1>
			<LoginForm></LoginForm>
		</div>
	);
}

export default observer(App);
