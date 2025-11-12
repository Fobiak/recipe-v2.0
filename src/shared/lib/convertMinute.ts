/**
 * Преобразует время в минутах в часы и минуты.
 *
 * @param {number} Minute - Время в минутах, входные данные.
 * @returns {string} Строка, представляющая время
 *
 */
export function convertMinute(Minute: number): string {
  const hours = Math.floor(Minute / 60)
  const minute = Minute % 60
  if (hours > 0 && minute === 0) {
    return `${hours} ч`
  }
  else if (hours > 0 && minute > 0) {
    return `${hours} ч ${minute} мин`
  }
  else {
    return `${minute} мин`
  }
}
