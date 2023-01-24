import { Fragment, React, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { addPricingMod } from '../../../store/pricing/pricing.actions';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/esm/Button';
import './pricing-data.styles.scss';
import { matchesAlert, showAlert } from '../../../store/alerts/alerts.actions';
import TierSelection from '../pricing-adv-dropdown/pricing-adv-dropdown.components';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)'               : {
		backgroundColor : theme.palette.action.hover
	},
	// hide last border
	'&:last-child td, &:last-child th' : {
		border : 0
	}
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	fontSize : '.85rem'
}));

const StyledSpanProgNo = styled('span')(({ theme }) => ({
	fontSize   : '.9rem',
	fontWeight : 'bold'
}));

function PricingData({ prices, tiers, currentUser }) {
	const todayDate = new Date();
	const quarter = Math.floor(todayDate.getMonth() / 3 + 1);
	const firstDate = new Date(todayDate.getFullYear(), quarter * 3, 1);
	const endDate = new Date(firstDate.getFullYear(), firstDate.getMonth(), 0);
	const numberFormat = Intl.NumberFormat('en', {
		style                 : 'currency',
		currency              : 'CAD',
		currencyDisplay       : 'narrowSymbol',
		currencySign          : 'accounting',
		maximumFractionDigits : 0
	});
	const price12Month = numberFormat.format(prices.Sales_Dollars);

	const dispatch = useDispatch();

	const [
		modPrices,
		setModPrices
	] = useState(prices);
	const [
		regStartDate,
		setRegStartDate
	] = useState(new Date());
	const [
		advEndDate,
		setAdvEndDate
	] = useState(endDate);
	const [
		buttonState,
		setButtonState
	] = useState('danger');

	useEffect(() => {
		setModPrices({
			...modPrices,
			New_Adv_End_Date   : moment(advEndDate).format('MM/DD/YYYY'),
			New_Reg_Start_Date : moment(regStartDate).format('MM/DD/YYYY')
		});
	}, []);

	const handleRegDateChange = (date) => {
		setRegStartDate(date);
		setModPrices({
			...modPrices,
			New_Reg_Start_Date : moment(date).format('MM/DD/YYYY')
		});
	};

	const handleAdvDateChange = (date) => {
		setAdvEndDate(date);
		setModPrices({
			...modPrices,
			New_Adv_End_Date : moment(date).format('MM/DD/YYYY')
		});
	};

	const updateModPrices = () => {
		dispatch(addPricingMod(modPrices));
		setButtonState('success');
	};

	const handleChange = (e) => {
		console.log(e.target);
		if (
			modPrices.Regular_Price_Tier &&
			e.target.value &&
			(e.target.name.toString() === 'New_Regular_Tier_Price' &&
				e.target.value === tiers[parseInt(modPrices.Regular_Price_Tier)].props.desc)
		) {
			dispatch(matchesAlert(prices.No_));
		} else if (
			modPrices.Advantage_Price_Tier &&
			e.target.value &&
			(e.target.id === 'New_Advantage_Tier_Price' &&
				e.target.value === tiers[parseInt(modPrices.Advantage_Price_Tier)].props.desc)
		) {
			dispatch(matchesAlert(prices.No_));
		}
		setModPrices({ ...modPrices, [e.target.name]: e.target.value });
	};

	const handleClick = (e) => {
		modPrices.New_Advantage_Tier_Price || modPrices.New_Regular_Tier_Price
			? updateModPrices()
			: dispatch(showAlert(prices.No_));
	};

	return (
		<Fragment>
			<StyledTableRow key={prices.No_} size="small">
				<StyledTableCell sx={{ maxWidth: 300 }}>
					<StyledSpanProgNo>{prices.No_}</StyledSpanProgNo> {prices.Description}
				</StyledTableCell>
				<StyledTableCell>{price12Month > 0 ? price12Month : ' - '}</StyledTableCell>
				<StyledTableCell value={prices['Display Type']}>{prices['Display Type']}</StyledTableCell>
				<StyledTableCell
					value={
						prices.Regular_Price_Tier ? (
							tiers[parseInt(prices.Regular_Price_Tier)].props.desc
						) : (
							'No Discount'
						)
					}
				>
					{prices.Regular_Price_Tier ? tiers[parseInt(prices.Regular_Price_Tier)].props.desc : 'No Discount'}
				</StyledTableCell>
				<StyledTableCell>
					<FormControl variant="standard" sx={{ minWidth: 60 }}>
						<InputLabel id="New_Regular_Tier_Price" className="tier_select">
							Select Tier
						</InputLabel>
						<Select
							labelId="New_Regular_Tier_Price"
							name="New_Regular_Tier_Price"
							defaultValue={' '}
							onChange={handleChange}
							label="TM Change"
						>
							<MenuItem value=" "> </MenuItem>
							{parseInt(currentUser.maxApproval) <= 1 && prices.Regular_Price_Tier !== 1 ? (
								<MenuItem value="MGR1">MGR1</MenuItem>
							) : (
								' '
							)}
							{parseInt(currentUser.maxApproval) <= 2 && prices.Regular_Price_Tier !== 2 ? (
								<MenuItem value="MGR2">MGR2</MenuItem>
							) : (
								' '
							)}
							{parseInt(currentUser.maxApproval) <= 3 && prices.Regular_Price_Tier !== 3 ? (
								<MenuItem value="MGR3">MGR3</MenuItem>
							) : (
								' '
							)}
							{prices.Regular_Price_Tier !== 4 ? <MenuItem value="TM1">TM1</MenuItem> : ' '}
							{prices.Regular_Price_Tier !== 5 ? <MenuItem value="TM2">TM2</MenuItem> : ' '}
							{prices.Regular_Price_Tier !== 6 ? <MenuItem value="TM3">TM3</MenuItem> : ' '}
							{prices.Regular_Price_Tier !== 7 ? <MenuItem value="TM4">TM4</MenuItem> : ' '}
							{prices.Regular_Price_Tier !== 8 ? <MenuItem value="TM5">TM5</MenuItem> : ' '}
							{prices.Regular_Price_Tier !== 9 ? <MenuItem value="TM6">TM6</MenuItem> : ' '}
							{prices.Regular_Price_Tier ? <MenuItem value="REMOVE">REMOVE</MenuItem> : ' '}
						</Select>
					</FormControl>
				</StyledTableCell>
				<StyledTableCell>
					<LocalizationProvider dateAdapter={AdapterMoment}>
						<DesktopDatePicker
							label="Reg. Start"
							inputFormat="MM/DD/YY"
							value={regStartDate}
							onChange={(date) => handleRegDateChange(date)}
							renderInput={(params) => <TextField size="small" sx={{ maxWidth: 135 }} {...params} />}
						/>
					</LocalizationProvider>
				</StyledTableCell>
				<StyledTableCell
					value={
						prices.Advantage_Price_Tier ? (
							tiers[parseInt(prices.Advantage_Price_Tier)].props.desc
						) : (
							'No Discount'
						)
					}
				>
					{prices.Advantage_Price_Tier ? (
						tiers[parseInt(prices.Advantage_Price_Tier)].props.desc
					) : (
						'No Discount'
					)}
				</StyledTableCell>
				<StyledTableCell
					value={
						prices.Advantage_Price_End_Date ? (
							moment(prices.Advantage_Price_End_Date).format('MM/DD/YYYY')
						) : (
							' '
						)
					}
				>
					{prices.Advantage_Price_End_Date ? (
						moment(prices.Advantage_Price_End_Date).utc().format('MM/DD/YYYY')
					) : (
						' '
					)}
				</StyledTableCell>
				<StyledTableCell>
					<TierSelection
						setTier={
							modPrices.New_Regular_Tier_Price ? (
								tiers.findIndex((t) => t.props.desc === modPrices.New_Regular_Tier_Price)
							) : (
								prices.Regular_Price_Tier
							)
						}
						handleChange={handleChange}
						maxApproval={currentUser.maxApproval}
						advPrice={prices.Advantage_Price_Tier}
					/>
				</StyledTableCell>
				{currentUser.dept_code === 'QC' ? (
					<StyledTableCell>
						<DatePicker
							selected={advEndDate}
							onChange={(date) => handleAdvDateChange(date)}
							className="datePicker"
						/>
					</StyledTableCell>
				) : (
					' '
				)}
				<StyledTableCell>
					<Button variant={buttonState} onClick={handleClick}>
						Add
					</Button>
				</StyledTableCell>
			</StyledTableRow>
		</Fragment>
	);
}

export default PricingData;
