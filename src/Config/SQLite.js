import SQLite from 'react-native-sqlite-storage';
export function sqlite() {
  let sqlAdaptor = null;
  sqlAdaptor = SQLite.openDatabase(
    'db.db',
    '1.0',
    'Test Database',
    200000,
    function () {},
    function (e) {
      if (__DEV__) {
        console.log('log::sqlite', e);
      }
    },
  );
  return sqlAdaptor;
}
