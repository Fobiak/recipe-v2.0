/**
 * Извлекает калории из строки.
 *
 * @param {string} summary - Строка, содержащая информацию о калориях.
 * @returns {number} Количество калорий
 */
export function getCalories(summary?: string): number {
  return Number.parseInt(summary?.match(/<b>(\d+)\s*calories<\/b>/i)?.[1] ?? '0', 10)
}
