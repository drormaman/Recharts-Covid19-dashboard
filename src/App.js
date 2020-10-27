import { useEffect } from "react";
import CounrtyComparisonChart from "./Components/CountryComparison/CounrtyComparisonChart";
import ConfirmedCasesPerDay from "./Components/ConfirmedCasesPerDay/ConfirmedCasesPerDay";
import { readString } from "react-papaparse";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	countriesDataState,
	selectedCountriesNamesState,
	selectedCountriesDataState
} from "./Atoms/recoilAtoms";

function App() {
	const [countriesData, setCountriesData] = useRecoilState(countriesDataState);
	console.log(countriesData);

	useEffect(() => {
		(async () => {
			const response = await fetch(
				"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
			);
			const responseData = await response.text();
			const { data } = readString(responseData, { header: true });

			const formattedData = {};
			data.map((country, i) => {
				const name = country["Province/State"]
					? country["Province/State"] + ", " + country["Country/Region"]
					: country["Country/Region"];
				const value = {};
				for (let key in country) {
					if (/\d{1,2}\/\d{1,2}\/\d{1,2}/.test(key)) {
						// value.push({ date: key, confirmedCases: Number(country[key]) });
						value[key] = Number(country[key]);
					}
				}
				formattedData[name] = value;
			});
			setCountriesData(formattedData);
		})();
	}, []);

	return (
		<div className="App">
			<CounrtyComparisonChart />
			<ConfirmedCasesPerDay />
		</div>
	);
}

export default App;
