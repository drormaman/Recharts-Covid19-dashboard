import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	countriesNamesState,
	selectedCountriesNamesState,
	selectedCountriesDataState
} from "../../Atoms/recoilAtoms";

function CountryChooser() {
	const [selectedCountriesNames, setSelectedCountriesNames] = useRecoilState(
		selectedCountriesNamesState
	);
	const countriesNames = useRecoilValue(countriesNamesState);

	function handleAddCountryLine(countryName) {
		setSelectedCountriesNames(array => [...array, countryName]);
	}
	function removeCountryFromSelected(countryName) {
		setSelectedCountriesNames(array =>
			array.filter(name => (name !== countryName ? name : undefined))
		);
	}

	return (
		<div>
			<select
				// value={selectedCountry}
				onChange={({ target: { value } }) => handleAddCountryLine(value)}>
				{countriesNames.map((name, i) => (
					<option key={i} disabled={selectedCountriesNames.includes(name)}>
						{name}
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
		</div>
	);
}

export default CountryChooser;
