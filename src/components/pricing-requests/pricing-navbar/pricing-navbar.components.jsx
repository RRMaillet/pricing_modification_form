import * as React from 'react';

import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import { Fragment } from 'react';
import PricingCart from '../pricing-cart/pricing-cart.components';

import './pricing-navbar.styles.scss';

const Search = styled('div')(({ theme }) => ({
	position                     : 'relative',
	borderRadius                 : theme.shape.borderRadius,
	backgroundColor              : alpha(theme.palette.common.white, 0.2),
	'&:hover'                    : {
		backgroundColor : alpha(theme.palette.common.white, 0.35)
	},
	marginLeft                   : 0,
	marginRight                  : 15,
	width                        : '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft : theme.spacing(1),
		width      : 'auto'
	}
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding        : theme.spacing(0, 2),
	height         : '100%',
	position       : 'absolute',
	pointerEvents  : 'none',
	display        : 'flex',
	alignItems     : 'center',
	justifyContent : 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color                   : 'inherit',
	'& .MuiInputBase-input' : {
		padding                      : theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft                  : `calc(1em + ${theme.spacing(4)})`,
		paddingRight                 : `calc(1em + ${theme.spacing(4)})`,
		transition                   : theme.transitions.create('width'),
		width                        : '100%',
		[theme.breakpoints.up('sm')]: {
			width     : '12ch',
			'&:focus' : {
				width : '20ch'
			}
		}
	}
}));

function PricingNavi({ currentCustomer, handleChange, handleSearchChange, currentUser, handleTMChange }) {
	return (
		<Fragment>
			<AppBar position="sticky" variant="elevation">
				<Toolbar>
					<Box sx={{ flexGrow: 1 }}>
						<FormControl variant="standard" sx={{ m: 1, minWidth: 128 }}>
							<InputLabel id="tm_select" className="tm_select">
								Select TM
							</InputLabel>
							<Select
								labelId="tm_select_label"
								id="tm_select"
								className="tm_select"
								value={currentCustomer.tm ? currentCustomer.tm : ''}
								onChange={handleTMChange}
								label="TM Change"
							>
								{currentUser.tm ? (
									currentUser.tm.map((tmUser) => (
										<MenuItem key={tmUser.Code} value={tmUser.Email}>
											{tmUser.Code} - {tmUser.TM_Name}
										</MenuItem>
									))
								) : (
									' '
								)}
							</Select>
						</FormControl>

						<FormControl variant="standard" sx={{ m: 1, minWidth: 128 }}>
							<InputLabel id="tm_select" className="tm_select">
								Select Cust
							</InputLabel>
							<Select
								labelId="cust_select_label"
								id="tm_select"
								className="tm_select"
								value={currentCustomer.customer ? currentCustomer.customer : ''}
								onChange={handleChange}
								label="Customer Change"
							>
								{currentUser.customers.map((cust) => (
									<MenuItem key={cust.No_} value={cust.No_}>
										{cust.No_} - {cust.Name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>

					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							name="searchList"
							id="priceSearchList"
							placeholder="Search..."
							onChange={handleSearchChange}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>

					{currentUser.customers[0] ? (
						<PricingCart
							email={currentUser.customers[0].Email}
							manager={currentUser.customers[0].Manager_Email}
						/>
					) : (
						<PricingCart />
					)}
				</Toolbar>
			</AppBar>
		</Fragment>
	);
}

export default PricingNavi;
