import { Pool } from 'pg';

const pool = new Pool({
  user: 'students_fqe5_user',
  host: 'cvi01adrie7s73ebi45g-a.oregon-postgres.render.com',
  database: 'students_fqe5',
  password: 'Rqur05qinOVXKi1EEbi3wE8XOAHczozY',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('Successfully connected to the database');
});

pool.on('error', (err: Error) => {
  console.error('Database error:', err.stack);
});

export default pool;
