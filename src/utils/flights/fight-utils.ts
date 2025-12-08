import airporData from "@/data/aiportData.json";
import AirporData from "@/data/airportSData.js";
import airlineData from "@/data/airlineData.json";
import { parseISO, subYears, format, differenceInMinutes } from "date-fns";

/**
 * Calculates birthdate from departure date and age in years
 * @param {string} departureDate - Date in ISO format (e.g. '2025-07-14')
 * @param {number} age - Age in years
 * @returns {string} - Birthdate in 'yyyy-MM-dd' format
 */
export function getBirthDate(departureDate, age) {
  const departure = parseISO(departureDate);
  const birthDate = subYears(departure, age);
  return format(birthDate, "yyyy-MM-dd");
}

export function getYMDDate(date) {
  if (!date) return "";
  const parsedDate = parseISO(date);
  return format(parsedDate, "yyyy-MM-dd");
}

// Flight card details
export function getAirportName(airportCode) {
  if (!airportCode) return "";
  if (!airporData || airporData.length === 0) return "";
  const airport = airporData.find((item) => item.airportCode === airportCode);
  return airport ? airport.airportName : "";
}

export function getAirlineData(airportCode) {
  if (!airlineData || airlineData.length === 0) return {};
  const airport = airlineData.find((item) => item.code === airportCode);
  return airport ? airport : {};
}

export const differenceOfTiming = (startTime, endTime) => {
  const start = parseISO(startTime);
  const end = parseISO(endTime);
  const totalMinutes = differenceInMinutes(end, start);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

export function getStopCount(segments) {
  if (!segments || segments.length === 0 || segments.length - 1 === 0)
    return "Non Stop";
  return segments.length - 1 + " Stop";
}

// fare utils
export function farePriceFormatter(price) {
  if (!price) return "0";
  return Math.ceil(price);
}

// filters
export const filterOneWithSort = (finalcityTo, countryCode) => {
  const inputAirportCode = finalcityTo.toLowerCase();
  return AirporData.sort((a, b) => {
    if (
      a.airportCode.toLowerCase() === inputAirportCode &&
      b.airportCode.toLowerCase() !== inputAirportCode
    )
      return -1;
    if (
      a.airportCode.toLowerCase() !== inputAirportCode &&
      b.airportCode.toLowerCase() === inputAirportCode
    )
      return 1;

    if (
      a.airportName.toLowerCase().includes(inputAirportCode) &&
      !b.airportName.toLowerCase().includes(inputAirportCode)
    )
      return -1;
    if (
      b.airportName.toLowerCase().includes(inputAirportCode) &&
      !a.airportName.toLowerCase().includes(inputAirportCode)
    )
      return 1;

    if (
      a.cityName.toLowerCase() === inputAirportCode &&
      b.cityName.toLowerCase() !== inputAirportCode
    )
      return -1;
    if (
      a.cityName.toLowerCase().includes(inputAirportCode) &&
      !b.cityName.toLowerCase().includes(inputAirportCode)
    )
      return -1;
    if (
      !a.cityName.toLowerCase().includes(inputAirportCode) &&
      b.cityName.toLowerCase().includes(inputAirportCode)
    )
      return 1;
    if (
      a.cityName.toLowerCase() !== inputAirportCode &&
      b.cityName.toLowerCase() === inputAirportCode
    )
      return 1;
    if (a.countryCode === countryCode && b.countryCode !== countryCode)
      return -1;
    if (a.countryCode !== countryCode && b.countryCode === countryCode)
      return 1;

    return a.cityName.localeCompare(b.cityName);
  });
};
