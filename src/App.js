import { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend
} from "recharts";
import { readString } from "react-papaparse";

const colors = ["#111d5e", "#c70039", "#f37121", "#ffbd69", "#0e918c"];

function App() {
	const [countriesData, setCountriesData] = useState({});
	const [selectedCountriesNames, setSelectedCountriesNames] = useState([]);
	const [selectedCountriesData, setSelectedCountriesData] = useState([]);
	// console.log(countriesData);
	console.log(selectedCountriesNames);
	console.log(selectedCountriesData);
	// console.log(countriesData[selectedCountries[0]]);

	useEffect(() => {
		(async () => {
			const response = await fetch(
				"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
			);
			const responseData = await response.text();
			const { data } = readString(responseData, { header: true });

			const formattedData = {};
			const datesArr = [];
			data.map((country, i) => {
				const name = country["Province/State"]
					? country["Province/State"] + ", " + country["Country/Region"]
					: country["Country/Region"];
				const value = {};
				for (let key in country) {
					if (/\d{1,2}\/\d{1,2}\/\d{1,2}/.test(key)) {
						// value.push({ date: key, confirmedCases: Number(country[key]) });
						value[key] = Number(country[key]);
						if (i === 0) datesArr.push({ date: key });
					}
				}
				formattedData[name] = value;
			});
			setCountriesData(formattedData);
			setSelectedCountriesData(datesArr);
		})();
	}, []);

	function handleAddCountryLine(countryName) {
		setSelectedCountriesNames(array => [...array, countryName]);
		// setSelectedCountries(countryName);

		const data = selectedCountriesData.map(dateObj => ({
			...dateObj,
			[countryName]: countriesData[countryName][dateObj.date]
		}));
		setSelectedCountriesData(data);
	}
	function removeCountryFromSelected(countryName) {
		setSelectedCountriesNames(array =>
			array.filter(name => (name !== countryName ? name : undefined))
		);
		setSelectedCountriesData(array =>
			array.map(dateObj => {
				const tempObj = dateObj;
				delete tempObj[countryName];
				return tempObj;
			})
		);
	}

	return (
		<div className="App">
			<select
				// value={selectedCountry}
				onChange={({ target: { value } }) => handleAddCountryLine(value)}>
				{Object.keys(countriesData).map((key, i) => (
					<option key={i} disabled={selectedCountriesNames.includes(key)}>
						{key}
					</option>
				))}
			</select>
			<ul>
				{selectedCountriesNames.map(name => (
					<li key={name} onClick={() => removeCountryFromSelected(name)}>
						{name}
					</li>
				))}
			</ul>
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
		</div>
	);
}

export default App;
