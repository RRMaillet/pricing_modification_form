import Alert from 'react-bootstrap/esm/Alert';
import Button from 'react-bootstrap/esm/Button';
import './pricing-alert.styles.scss';

function PricingAlert({ show, variant, handleAlertClick, message }) {
	return (
		<Alert show={show} variant={variant}>
			<Alert.Heading>Warning</Alert.Heading>
			<p>{message}</p>
			<Button className="ms-auto" onClick={() => handleAlertClick(false)} variant="outline-secondary">
				X
			</Button>
		</Alert>
	);
}

export default PricingAlert;
