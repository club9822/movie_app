import SQLite from 'react-native-sqlite-storage';
function initializeSqlite(): any {
  let sqlAdaptor = null;
  sqlAdaptor = SQLite.openDatabase(
    'db.db',
    '1.0',
    'db',
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
export const db = initializeSqlite();
