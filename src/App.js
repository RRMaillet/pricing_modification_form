import { Routes, Route } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import Navi from './components/navigation/nav-bar/navigation.component';
import Home from './routes/home/home.component';
import Admin from './routes/admin/admin.component';
import { useIsAuthenticated } from '@azure/msal-react';
import './App.scss';
import PricingRequest from './routes/pricing-requests/pricing-req.components';


function App() {
	const [
		isAdmin,
		setIsAdmin
	] = useState(false);
	const isAuthenticated = useIsAuthenticated();
	const { accounts } = useMsal();

	useEffect(() => {
		if (isAuthenticated) {
			const roles = accounts[0].idTokenClaims.roles;
			const adminRole = roles.includes('admin');
			adminRole ? setIsAdmin(true) : setIsAdmin(false);
		}
	}, []);

	return (
		<Fragment>
			<Navi />
			<Routes>
				<Route index element={<Home />} />
				<Route path="pricing_req" element={<PricingRequest />} />
				{isAdmin ? <Route path="admin" element={<Admin isAdmin={isAdmin} />} /> : ''}
			</Routes>
		</Fragment>
	);
}

export default App;
