import { Week } from ".prisma/client";

export function getTotalWorkedHours(data: Week[]) {
  const total = data.reduce((ac, cv) => ac + cv.hours, 0).toFixed(2);
  return `${total} hours`;
}

export function getTotalEarnedEuros(data: Week[]) {
  const total = data.reduce((ac, cv) => ac + cv.earnings, 0).toFixed(2);
  return `${total} EUR`;
}

export function getAverageWorked(data: Week[]) {
  const total = data.reduce((ac, cv) => ac + cv.hours, 0);

  return `${(total / data.length).toFixed(2)} hours`;
}

export function getAverageEarned(data: Week[]) {
  const total = data.reduce((ac, cv) => ac + cv.earnings, 0);

  return `${(total / data.length).toFixed(2)} EUR`;
}

export function getTotalDaysWorked(data: Week[]) {
  const total = data.reduce((ac, cv) => ac + (cv.days ?? 1), 0);

  return total === 1 ? `${total} day` : `${total} days`;
}
