import { React, Fragment } from 'react';
import PricingData from '../pricing-data/pricing-data.components';

import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';

function PricingFields({ prices, tiers, currentUser }) {
	return (
		<Fragment>
			{!prices ? (
				<tr>
					<td>Loading...</td>
				</tr>
			) : (
				prices.map((price) => {
					return (
						<PricingData
							key={price.No_ + price['Customer No_']}
							prices={price}
							tiers={tiers}
							currentUser={currentUser}
						/>
					);
				})
			)}
		</Fragment>
	);
}

export default PricingFields;
