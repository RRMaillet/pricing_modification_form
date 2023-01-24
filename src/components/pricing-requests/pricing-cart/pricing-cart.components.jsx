import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { deletePricingMod, resetPricingMod } from '../../../store/pricing/pricing.actions';
import { useDispatch } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import { useMsal } from '@azure/msal-react';
import { setAuthToken } from '../../../store/user/user.actions';
import { resetCustData } from '../../../store/customers/customers.actions';
import PricingCartBody from '../pricing-cart-body/pricing-cart-body.components';

function PricingCart({ pricingItems, pricingTiers, currentCustomer, email, manager }) {
	const [
		show,
		setShow
	] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { instance, accounts } = useMsal();
	const request = {
		scopes  : [
			"Token_Validation_URI"
		],
		account : accounts[0]
	};

	const dispatch = useDispatch();

	const handleClick = (itemNo) => dispatch(deletePricingMod(itemNo));

	const getAuthToken = async () => {
		try {
			const newToken = await instance.acquireTokenSilent(request);
			if (newToken) {
				dispatch(setAuthToken(newToken.accessToken));
				return newToken.accessToken;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchData = async (params, subPath) => {
		try {
			const newFetch = await getAuthToken().then((authToken) =>
				fetch(`${process.env.REACT_APP_PHONE_LIST_API}${subPath}`, {
					method  : 'POST',
					mode    : 'cors',
					body    : JSON.stringify(params),
					headers : {
						'Content-Type' : 'application/json',
						Authorization  : `Bearer ${authToken}`
					}
				})
			);

			if (newFetch) {
				return newFetch;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (event) => {
		const params = {
			pricingItems  : pricingItems,
			email         : email,
			manager_email : manager,
			current_user  : accounts[0].username,
			custNo        : currentCustomer.customer
		};

		fetchData(params, '/pricing/submit')
			.then((res) => {
				if (res.status === 200) {
					dispatch(resetPricingMod());
					dispatch(resetCustData());
					setShow(false);
				} else {
					setShow(true);
				}
			})
			.catch((err) => err);

		return;
	};

	return (
		<Fragment>
			<Button
				variant="primary"
				className="pricingCartButton"
				onClick={handleShow}
				disabled={currentCustomer.customer && pricingItems.length > 0 ? false : true}
			>
				Pricing Request {pricingItems.length === 0 ? ' ' : <Badge bg="danger"> {pricingItems.length} </Badge>}
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Pricing Items</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<PricingCartBody itemCart={pricingItems} itemTiers={pricingTiers} handleClick={handleClick} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

const MapStateToProps = (state) => {
	return {
		pricingItems    : state.pricing,
		pricingTiers    : state.tiers,
		currentCustomer : state.customers,
		currentUser     : state.User
	};
};

export default connect(MapStateToProps)(PricingCart);
