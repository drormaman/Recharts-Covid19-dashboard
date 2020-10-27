import React from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend
} from "recharts";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	countriesDataState,
	selectedCountriesNamesState,
	selectedCountriesDataState
} from "../Atoms/recoilAtoms";

const colors = ["#111d5e", "#c70039", "#f37121", "#ffbd69", "#0e918c"];

function CounrtyComparisonChart() {
	const selectedCountriesData = useRecoilValue(selectedCountriesDataState);
	const selectedCountriesNames = useRecoilValue(selectedCountriesNamesState);

	return (
		<LineChart width={600} height={300} data={selectedCountriesData}>
			<Tooltip />
			<Legend />
			{selectedCountriesNames.map((name, i) => (
				<Line
					type="natural"
					// legendType="none"
					dot={false}
					key={name}
					dataKey={name}
					stroke={colors[i]}
				/>
			))}
			<CartesianGrid stroke="#ccc" />
			<XAxis dataKey="date" />
			<YAxis />
		</LineChart>
	);
}

export default CounrtyComparisonChart;
