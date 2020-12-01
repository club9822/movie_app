export function toggleRefreshing(_this: any = null, refreshing:boolean = null):void {
  if (_this) {
    if (_this.mounted) {
      _this.setState({
        refreshing: refreshing !== null ? refreshing : !_this.state.refreshing,
      });
    }
  }
}
/**
 *  extract otp code form string
 * @param str
 * @returns {String|string}
 */
export function extractNumberFromString(str: string | any): string | any {
  if (str && typeof str === 'string') {
    if (str.includes(':')) {
      return parseInt(str.split(':')[1]) + '';
    }
    return ((str.match(/\d+/g) || []).map((n) => parseInt(n)) + '').slice(0, 6);
  }
  return str;
}
export function returnOnlyDigitInString(str: string | any): string | any {
  if (str && typeof str === 'string') {
    return str.replace(/\D/g, '');
  }
  return str;
}
export function extractParamsFromString(str: string | any) {
  if (str && typeof str === 'string') {
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
      params: any = {},
      match;
    while ((match = regex.exec(str))) {
      params[match[1]] = match[2];
    }
    return params;
  }
  return {};
}
