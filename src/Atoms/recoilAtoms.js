import { atom, selector } from "recoil";

export const countriesDataState = atom({
	key: "countriesDataState",
	default: {}
});

export const countriesNamesState = selector({
	key: "countriesNamesState",
	get: ({ get }) => {
		const countries = get(countriesDataState);
		return Object.keys(countries);
	}
});

export const selectedCountriesDataState = selector({
	key: "selectedCountriesDataState",
	get: ({ get }) => {
		const allData = get(countriesDataState);
		const selectedCountries = get(selectedCountriesNamesState);
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
});

export const selectedCountriesNamesState = atom({
	key: "selectedCountriesNamesState",
	default: []
});

export const perDayChartCountryState = atom({
	key: "perDayChartCountryState",
	default: ""
});
export const perDayChartMonthState = atom({
	key: "perDayChartMonthState",
	default: ""
});

export const perDayChartDataState = selector({
	key: "perDayChartDataState",
	get: ({ get }) => {
		const country = get(perDayChartCountryState);
		const month = get(perDayChartMonthState);
		const allData = get(countriesDataState);

		if (country && month) {
			const countryData = Object.keys(allData[country]).map(
				(dateKey, i, array) => {
					if (i < 1) {
						return { date: dateKey, confirmedCases: allData[country][dateKey] };
					} else {
						return {
							date: dateKey,
							confirmedCases:
								allData[country][dateKey] - allData[country][array[i - 1]]
						};
					}
				}
			);
			return countryData.filter(
				dateObj => dateObj.date.indexOf(`${month}/`) === 0
			);
		}
		return [];
	}
});
