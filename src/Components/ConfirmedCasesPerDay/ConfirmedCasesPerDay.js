import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	perDayChartCountryState,
	perDayChartMonthState,
	perDayChartDataState,
	countriesNamesState
} from "../../Atoms/recoilAtoms";
import {
	BarChart,
	Bar,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend
} from "recharts";

const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

function ConfirmedCasesPerDay() {
	const countriesNames = useRecoilValue(countriesNamesState);
	const [chosenCountry, setChosenCountry] = useRecoilState(
		perDayChartCountryState
	);
	const [chosenMonth, setChosenMonth] = useRecoilState(perDayChartMonthState);
	const countryData = useRecoilValue(perDayChartDataState);
	console.log(countryData);

	return (
		<div>
			<select onChange={({ target: { value } }) => setChosenCountry(value)}>
				{countriesNames.map((name, i) => (
					<option key={i} disabled={name === chosenCountry}>
						{name}
					</option>
				))}
			</select>
			<select onChange={({ target: { value } }) => setChosenMonth(value)}>
				{months.map(month => (
					<option key={month} disabled={month === chosenMonth}>
						{month}
					</option>
				))}
			</select>
			<BarChart width={600} height={300} data={countryData}>
				<Tooltip />
				<Legend />
				<Bar dataKey="confirmedCases" fill="#c70039" />

				<CartesianGrid stroke="#ccc" />
				<XAxis dataKey="date" />
				<YAxis />
			</BarChart>
		</div>
	);
}

export default ConfirmedCasesPerDay;
