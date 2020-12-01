/**
 *
 * @param s {string}
 * @returns {string}
 */
export function persianArabicToEnglish(s: string | any): string {
  if (!s) {
    return '';
  }
  return s
    .toString()
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
}
