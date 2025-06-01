const snowflake = require('snowflake-sdk');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

// Snowflake connection config from env
const connectionConfig = {
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USER,
  password: process.env.SNOWFLAKE_PASSWORD,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
};

// Function to create a new Snowflake connection
function createConnection() {
  return snowflake.createConnection(connectionConfig);
}

// Function to execute a query
async function executeQuery(connection, query) {
  return new Promise((resolve, reject) => {
    connection.execute({
      sqlText: query,
      complete: (err, stmt, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      }
    });
  });
}

async function checkTables() {
  let connection;
  try {
    // Connect to Snowflake
    connection = createConnection();
    await new Promise((resolve, reject) => {
      connection.connect((err, conn) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(conn);
      });
    });
    console.log('Connected to Snowflake successfully');

    // Check TOURISM_DATA table
    console.log('\nChecking TOURISM_DATA table...');
    const tourismData = await executeQuery(connection, 'SELECT * FROM TOURISM_DATA');
    console.log('TOURISM_DATA rows:', tourismData.length);
    if (tourismData.length > 0) {
      console.log('Sample data:', tourismData[0]);
    }

    // Check ART_CULTURE_FINANCIAL_DATA table
    console.log('\nChecking ART_CULTURE_FINANCIAL_DATA table...');
    const financialData = await executeQuery(connection, 'SELECT * FROM ART_CULTURE_FINANCIAL_DATA');
    console.log('ART_CULTURE_FINANCIAL_DATA rows:', financialData.length);
    if (financialData.length > 0) {
      console.log('Sample data:', financialData[0]);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) {
      connection.destroy();
    }
  }
}

// Add function to list all states and their row counts in TOURISM_DATA
async function listTourismStates() {
  return new Promise((resolve, reject) => {
    connection.connect((err, conn) => {
      if (err) {
        console.error('Error connecting to Snowflake:', err);
        reject(err);
        return;
      }
      console.log('Successfully connected to Snowflake');
      conn.execute({
        sqlText: `SELECT STATE, COUNT(*) as count FROM TOURISM_DATA GROUP BY STATE ORDER BY STATE`,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error('Error querying TOURISM_DATA states:', err);
            reject(err);
            return;
          }
          console.log('\nStates in TOURISM_DATA and their row counts:');
          rows.forEach(row => {
            console.log(`${row.STATE}: ${row.COUNT}`);
          });
          conn.destroy();
          resolve();
        }
      });
    });
  });
}

checkTables().catch(console.error);

// Run the new function if this script is run directly
if (require.main === module) {
  listTourismStates().catch(console.error);
} 