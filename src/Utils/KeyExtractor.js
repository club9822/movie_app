/**
 * FlatList keyExtractor
 * @param item
 * @param index
 * @returns {string}
 */
export function keyExtractor(item: any, index: null): string {
  if (item && item.hasOwnProperty('id') && item.id) {
    return 'item_' + item.id.toString();
  }
  return index + '_item';
}
