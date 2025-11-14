/**
 * Преобразует время в минутах в часы и минуты.
 *
 * @param {number} minute - Время в минутах, входные данные.
 * @returns {string} Строка, представляющая время
 *
 */
export function convertMinute(minute?: number): string | null {
  if (!minute || minute >= 0)
    return null
  const hours = Math.floor(minute / 60)
  const minutes = minute % 60
  if (hours > 0 && minutes === 0) {
    return `${hours} ч`
  }
  else if (hours > 0 && minutes > 0) {
    return `${hours} ч ${minutes} мин`
  }
  else {
    return `${minutes} мин`
  }
}
