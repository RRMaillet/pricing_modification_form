import { React } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function TierSelection({ setTier, handleChange, maxApproval, advPrice }) {
	return (
		<FormControl variant="standard" sx={{ minWidth: 60 }}>
			<InputLabel id="New_Advantage_Tier_Price" className="tier_select">
				Select Tier
			</InputLabel>
			<Select
				labelId="New_Advantage_Tier_Price"
				name="New_Advantage_Tier_Price"
				defaultValue={' '}
				onChange={handleChange}
				label="TM Change"
			>
				<MenuItem value=" "> </MenuItem>
				{setTier > 1 && parseInt(maxApproval) <= 1 && advPrice !== 1 ? (
					<MenuItem value="MGR1">MGR1</MenuItem>
				) : (
					' '
				)}
				{setTier > 2 && parseInt(maxApproval) <= 2 && advPrice !== 2 ? (
					<MenuItem value="MGR2">MGR2</MenuItem>
				) : (
					' '
				)}
				{setTier > 3 && parseInt(maxApproval) <= 3 && advPrice !== 3 ? (
					<MenuItem value="MGR3">MGR3</MenuItem>
				) : (
					' '
				)}
				{setTier > 4 && advPrice !== 4 ? <MenuItem value="TM1">TM1</MenuItem> : ' '}
				{setTier > 5 && advPrice !== 5 ? <MenuItem value="TM2">TM2</MenuItem> : ' '}
				{setTier > 6 && advPrice !== 6 ? <MenuItem value="TM3">TM3</MenuItem> : ' '}
				{setTier > 7 && advPrice !== 7 ? <MenuItem value="TM4">TM4</MenuItem> : ' '}
				{setTier > 8 && advPrice !== 8 ? <MenuItem value="TM5">TM5</MenuItem> : ' '}
				{setTier > 9 && advPrice !== 9 ? <MenuItem value="TM6">TM6</MenuItem> : ' '}
				{advPrice ? <MenuItem value="REMOVE">REMOVE</MenuItem> : ' '}
			</Select>
		</FormControl>
	);
}
export default TierSelection;
