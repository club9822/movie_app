import {db} from '~/Utils/Sqlite';

/**
 *
 *
 *  TODO:  create tables for FTS + offline support
 *
 *
 */
export function createTables() {
  // TODO: create db and save data
  const commands = [
    'CREATE VIRTUAL TABLE IF NOT EXISTS vt_movie USING fts4(id,title,director);',
    'CREATE VIRTUAL TABLE IF NOT EXISTS vt_movie_tag USING fts4(id,movie_id,tag);',
    'CREATE TABLE IF NOT EXISTS movie(id INTEGER NOT NULL,title VARCHAR(255) DEFAULT NULL,date_of_release DATETIME,UNIQUE(id) ON CONFLICT REPLACE)',
    'CREATE TABLE IF NOT EXISTS movie_tag(id INTEGER PRIMARY KEY,tag VARCHAR(255),movie_id INTEGER,FOREIGN KEY(movie_id) REFERENCES movie(id))',
    'CREATE TABLE IF NOT EXISTS movie_rating(id INTEGER PRIMARY KEY,movie_id BIGINT,rating FLOAT DEFAULT 0.0,FOREIGN KEY(movie_id) REFERENCES movie(id))',
    'CREATE TABLE IF NOT EXISTS movie_director(id INTEGER PRIMARY KEY,movie_id INTEGER,director VARCHAR(255),FOREIGN KEY(movie_id) REFERENCES movie(id))',
  ];
  return new Promise(function (resolve, reject) {
    db.transaction(
      function (tx) {
        for (let i = 0; i < commands.length; i++) {
          tx.executeSql(commands[i]);
        }
      },
      function (error) {
        if (__DEV__) {
          console.log('log::::: ', error, JSON.stringify(error));
        }
        reject(error);
      },
      function () {
        resolve(true);
      },
    );
  });
}
