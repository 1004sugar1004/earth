import { Season } from '../types';

// Constants for simulation
const ORBIT_RADIUS_X = 280;
const ORBIT_RADIUS_Y = 140;
const AXIAL_TILT = 23.5;

// Solstice and Equinox days (approximate)
const VERNAL_EQUINOX = 80;    // Mar 21
const SUMMER_SOLSTICE = 172;  // Jun 21
const AUTUMNAL_EQUINOX = 264; // Sep 23
const WINTER_SOLSTICE = 355;  // Dec 22

/**
 * Determines the season for a given day of the year.
 * @param dayOfYear - The day of the year (1-365).
 * @returns The current season as a Season enum.
 */
export const getSeason = (dayOfYear: number): Season => {
  if (dayOfYear >= VERNAL_EQUINOX && dayOfYear < SUMMER_SOLSTICE) {
    return Season.Spring;
  } else if (dayOfYear >= SUMMER_SOLSTICE && dayOfYear < AUTUMNAL_EQUINOX) {
    return Season.Summer;
  } else if (dayOfYear >= AUTUMNAL_EQUINOX && dayOfYear < WINTER_SOLSTICE) {
    return Season.Autumn;
  } else {
    return Season.Winter;
  }
};

/**
 * Calculates the Earth's (x, y) coordinates on its orbit for a given day.
 * @param dayOfYear - The day of the year (1-365).
 * @returns An object with x and y coordinates.
 */
export const getEarthPosition = (dayOfYear: number): { x: number; y: number } => {
  const angle = ((dayOfYear - VERNAL_EQUINOX) / 365) * 2 * Math.PI;
  const x = ORBIT_RADIUS_X * Math.cos(angle);
  const y = ORBIT_RADIUS_Y * Math.sin(angle);
  return { x, y };
};

/**
 * Calculates the number of daylight hours using a simplified sinusoidal model.
 * Based on mid-latitudes in the Northern Hemisphere.
 * @param dayOfYear - The day of the year (1-365).
 * @returns The number of daylight hours.
 */
export const getDaylightHours = (dayOfYear: number): number => {
  const minDaylight = 9.6; // ~9h 36m for winter solstice
  const maxDaylight = 14.8; // ~14h 48m for summer solstice
  const amplitude = (maxDaylight - minDaylight) / 2;
  const midPoint = (maxDaylight + minDaylight) / 2;
  // Cosine function peaks at summer solstice
  const daylight = midPoint - amplitude * Math.cos((2 * Math.PI * (dayOfYear - SUMMER_SOLSTICE)) / 365);
  return daylight;
};

/**
 * Calculates the maximum altitude of the sun at noon using a simplified model.
 * Based on mid-latitudes (approx. 37.5°N for Seoul).
 * @param dayOfYear - The day of the year (1-365).
 * @returns The sun's altitude in degrees.
 */
export const getSunAltitude = (dayOfYear: number): number => {
  const latitude = 37.5;
  const maxAltitudeSummer = 90 - latitude + AXIAL_TILT; // ~76 degrees
  const minAltitudeWinter = 90 - latitude - AXIAL_TILT; // ~29 degrees
  const amplitude = (maxAltitudeSummer - minAltitudeWinter) / 2;
  const midPoint = (maxAltitudeSummer + minAltitudeWinter) / 2;
  const altitude = midPoint - amplitude * Math.cos((2 * Math.PI * (dayOfYear - SUMMER_SOLSTICE)) / 365);
  return altitude;
};

/**
 * Converts a day of the year to a formatted date string (e.g., "6월 21일").
 * @param dayOfYear - The day of the year (1-365).
 * @returns A formatted date string in Korean.
 */
export const formatDate = (dayOfYear: number): string => {
  const date = new Date(2024, 0, dayOfYear); // Use a non-leap year base
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

/**
 * Converts hours from a decimal format to hours and minutes.
 * @param hoursDecimal - The hours in decimal format (e.g., 14.8).
 * @returns A formatted string (e.g., "14시간 48분").
 */
export const formatHours = (hoursDecimal: number): string => {
  const hours = Math.floor(hoursDecimal);
  const minutes = Math.round((hoursDecimal - hours) * 60);
  return `${hours}시간 ${minutes}분`;
};