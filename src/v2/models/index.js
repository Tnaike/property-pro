import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://postgres:Datakey01@127.0.0.1:5432/postgres'
});

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(new Error('Database error.'));
        });
    });
  }
};
