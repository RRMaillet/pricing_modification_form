import Container from '@mui/material/Container';
import PricingNavi from '../pricing-navbar/pricing-navbar.components';
import PricingAlert from '../pricing-alert/pricing-alert.components';
import PricingRows from '../pricing-rows/pricing-rows.components';

function PricingRequestBody({
	alertStatus,
	currentCustomer,
	currentUser,
	handleChange,
	handleTMChange,
	handleSearchChange,
	handleAlertClick,
	search,
	customerData
}) {
	return (
		<Container maxWidth="xl">
			<PricingNavi
				currentCustomer={currentCustomer}
				handleChange={handleChange}
				handleSearchChange={handleSearchChange}
				currentUser={currentUser}
				handleTMChange={handleTMChange}
			/>

			<PricingAlert
				show={alertStatus.status ? alertStatus.status : false}
				variant="info"
				handleAlertClick={handleAlertClick}
				message={alertStatus.Message}
			/>

			<PricingRows
				pricingData={customerData ? search(customerData) : customerData}
				currentCustomer={currentCustomer.customer}
				currentUser={currentUser}
			/>
		</Container>
	);
}

export default PricingRequestBody;
