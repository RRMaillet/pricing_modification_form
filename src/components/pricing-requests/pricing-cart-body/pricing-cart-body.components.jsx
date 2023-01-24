import { Fragment } from 'react';
import PricingItems from '../pricing-cart-items/pricing-cart-items.components';

function PricingCartBody({ itemCart, itemTiers, handleClick }) {
	return (
		<Fragment>
			{itemCart.map((item) => {
				return <PricingItems key={item.No_} item={item} tiers={itemTiers} handleClick={handleClick} />;
			})}
		</Fragment>
	);
}

export default PricingCartBody;
