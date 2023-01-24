import { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';

import { useMsal } from '@azure/msal-react';

import { hideAlert } from '../../store/alerts/alerts.actions';
import { resetPricingMod } from '../../store/pricing/pricing.actions';

import './pricing-req.styles.scss';
import { addCustData, changeCustomer, changeTM, resetCustData } from '../../store/customers/customers.actions';
import { setAcctsUser, setCustomers, setCustUser } from '../../store/user/user.actions';

import PricingRequestBody from '../../components/pricing-requests/pricing-req-body/pricing-req-body.components';
import { useFetchData } from '../../utils/useFetchData.utils';

function PricingRequest({ alertStatus, currentCustomer, currentUser }) {
	const { accounts } = useMsal();
	const dispatch = useDispatch();
	const [
		query,
		setQuery
	] = useState('');

	const request = {
		scopes  : [
			'api://c0bf7240-9d36-4ec7-b759-e21d03f48194/Token_Validation'
		],
		account : accounts[0]
	};

	const fetchDataSub = useFetchData();

	useEffect(() => {
		const fetching = async () => {
			await fetchDataSub(`/pricing/currUser/${accounts[0].username}`, request)
				.then((data) => dispatch(setCustomers(data)))
				.then(() => fetchDataSub(`/pricing/tm/${accounts[0].username}`, request))
				.then((data2) => dispatch(setAcctsUser(data2)));
		};

		fetching();
	}, []);

	const handleSubmit = async (cust) => {
		await fetchDataSub(`/pricing/cust/${cust}`, request).then((data) => dispatch(addCustData(data)));
	};

	const handleChange = (event) => {
		dispatch(changeCustomer(event.target.value));
		handleSubmit(event.target.value);
		dispatch(resetPricingMod());
	};

	const handleTMChange = async (event) => {
		await fetchDataSub(`/pricing/tmCust/${event.target.value}`, request).then((data) => {
			dispatch(setCustUser(data));
			dispatch(changeTM(event.target.value));
			dispatch(resetCustData());
		});
	};

	const handleSearchChange = (event) => {
		setQuery(event.target.value);
	};

	const handleAlertClick = () => {
		dispatch(hideAlert());
	};

	const search = (newQuery) => {
		return newQuery.filter(
			(newPrice) =>
				newPrice.No_.toLowerCase().includes(query.toLowerCase()) ||
				newPrice.Description.toLowerCase().includes(query.toLowerCase())
		);
	};

	return (
		<PricingRequestBody
			alertStatus={alertStatus}
			currentCustomer={currentCustomer}
			currentUser={currentUser}
			handleChange={handleChange}
			handleTMChange={handleTMChange}
			handleSearchChange={handleSearchChange}
			handleAlertClick={handleAlertClick}
			search={search}
			customerData={currentCustomer.custData}
		/>
	);
}

const MapStateToProps = (state) => {
	return {
		alertStatus     : state.alerts,
		currentCustomer : state.customers,
		currentUser     : state.user
	};
};

export default connect(MapStateToProps)(PricingRequest);
