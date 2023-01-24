import PricingFields from '../pricing-fields/pricing-fields.components';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Table from 'react-bootstrap/esm/Table';
import './pricing-rows.styles.scss';

import moment from 'moment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	fontSize : '.95rem'
}));

function PricingRows({ pricingData, currentCustomer, currentUser }) {
	const tiers = require('./pricing-tiers.json');
	const headerSpan = currentUser.dept_code === 'QC' ? 12 : 11;
	const advSpan = currentUser.dept_code === 'QC' ? 4 : 3;
	moment.locale('ca');

	return (
		<Paper sx={{ maxWidth: '100%', margin: 'auto', padding: 0.5, background: 'whitesmoke' }}>
			<TableContainer>
				<Table sx={{ minWidth: 650 }} size="small" stickyHeader aria-label="sticky table">
					<TableHead>
						{currentCustomer && Object.keys(pricingData).length > 0 ? (
							<TableRow>
								<StyledTableCell colSpan={headerSpan} className="title" align="center">
									{' '}
									Current Customer: <span className="effectiveDate">{currentCustomer}</span>
									<br />
									Effective Date:{' '}
									<span className="effectiveDate">
										{moment.utc(pricingData[0]['Effective Date']).format('L')}
									</span>
								</StyledTableCell>
							</TableRow>
						) : (
							<TableRow>
								<TableCell colSpan={headerSpan} className="title">
									{' '}
									Please select a customer from the dropdown above...
								</TableCell>
							</TableRow>
						)}
						<TableRow>
							<TableCell colSpan="3" className="program" align="center" />
							<TableCell colSpan="3" className="regTier" align="center">
								{' '}
								Regular Pricing
							</TableCell>

							<TableCell colSpan={advSpan} className="advTier" align="center">
								{' '}
								Advantage Pricing
							</TableCell>

							<TableCell colSpan="1" className="program">
								{' '}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell scope="col" className="program">
								{' '}
								Program No.
							</TableCell>
							<TableCell scope="col" className="program">
								{' '}
								Last 12m Sales
							</TableCell>
							<TableCell scope="col" className="program">
								{' '}
								Display
							</TableCell>
							<TableCell scope="col" className="regTier">
								{' '}
								Current Tier
							</TableCell>
							<TableCell scope="col" className="regTier">
								{' '}
								New Tier
							</TableCell>
							<TableCell scope="col" className="regTier">
								{' '}
								New Tier Start
							</TableCell>
							<TableCell scope="col" className="advTier">
								{' '}
								Current Tier
							</TableCell>
							<TableCell scope="col" className="advTier">
								{' '}
								Current End Date
							</TableCell>
							<TableCell scope="col" className="advTier">
								{' '}
								New Tier
							</TableCell>
							{currentUser.dept_code === 'QC' ? (
								<TableCell scope="col" className="advTier">
									{' '}
									New End Date
								</TableCell>
							) : (
								' '
							)}
							<TableCell scope="col" className="program">
								{' '}
								Submit
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody id="pricing-form-table-body" className="table-group-divider table-divider-color">
						<PricingFields prices={pricingData} tiers={tiers} currentUser={currentUser} />
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
export default PricingRows;
