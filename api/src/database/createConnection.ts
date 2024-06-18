import { createConnection, Connection } from 'typeorm';
import * as entities from 'entities';

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

const createDatabaseConnection = async (retries = MAX_RETRIES): Promise<Connection> => {
  try {
    console.log('Attempting to connect to the database...');
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: Object.values(entities),
      synchronize: true,
    });
    console.log('Database connection established');
    return connection;
  } catch (error) {
    if (retries > 0) {
      console.error(`Database connection failed. Retrying in ${RETRY_DELAY / 1000} seconds...`, error);
      await new Promise(res => setTimeout(res, RETRY_DELAY));
      return createDatabaseConnection(retries - 1);
    } else {
      console.error('Max retries reached. Could not establish database connection.');
      throw error;
    }
  }
};

export default createDatabaseConnection;
