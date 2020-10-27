import { atom, selector } from "recoil";

export const countriesDataState = atom({
	key: "countriesDataState",
	default: {}
});

export const selectedCountriesDataState = selector({
	key: "selectedCountriesDataState",
	get: ({ get }) => {
		const allData = get(countriesDataState);
		console.log(allData);
		const selectedCountries = get(selectedCountriesNamesState);
		console.log(selectedCountries);
		if (Object.keys(allData).length > 0) {
			if (selectedCountries.length < 1) {
				return [];
			} else {
				const datesArray = Object.keys(allData[selectedCountries[0]]);
				return datesArray.map(date => {
					const dateObj = { date };
					for (let i = 0; i < selectedCountries.length; i++) {
						dateObj[selectedCountries[i]] = allData[selectedCountries[i]][date];
					}
					return dateObj;
				});
			}
		}
		return ["hey"];
	}
});

export const selectedCountriesNamesState = atom({
	key: "selectedCountriesNamesState",
	default: []
});
