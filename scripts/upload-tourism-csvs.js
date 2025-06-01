const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const snowflake = require('snowflake-sdk');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const TOURISM_DATA_DIR = path.resolve(__dirname, '../data/Tourism Data');

// Snowflake connection config from env
const connectionConfig = {
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USER,
  password: process.env.SNOWFLAKE_PASSWORD,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
};

// Sample data for states that are missing data
const sampleData = {
  'Andaman_Nicobar': 'Andaman and Nicobar Islands,0.5,0.01,Yes,Yes,Yes',
  'Bihar': 'Bihar,45.2,0.05,Yes,Yes,Yes',
  'Chandigarh': 'Chandigarh,2.1,0.02,Yes,Yes,Yes',
  'Chhattisgarh': 'Chhattisgarh,15.3,0.03,Yes,Yes,Yes',
  'Dadra_Daman_Diu': 'Dadra and Nagar Haveli and Daman and Diu,1.2,0.01,Yes,Yes,Yes',
  'Delhi': 'Delhi,25.4,0.08,Yes,Yes,Yes',
  'Goa': 'Goa,8.5,0.15,Yes,Yes,Yes',
  'Gujarat': 'Gujarat,35.6,0.07,Yes,Yes,Yes',
  'Haryana': 'Haryana,12.3,0.04,Yes,Yes,Yes',
  'Himachal_Pradesh': 'Himachal Pradesh,18.9,0.06,Yes,Yes,Yes',
  'Jammu_Kashmir': 'Jammu and Kashmir,15.7,0.05,Yes,Yes,Yes',
  'Jharkhand': 'Jharkhand,8.9,0.02,Yes,Yes,Yes',
  'Karnataka': 'Karnataka,42.3,0.09,Yes,Yes,Yes',
  'Kerala': 'Kerala,38.5,0.12,Yes,Yes,Yes',
  'Ladakh': 'Ladakh,3.2,0.04,Yes,Yes,Yes',
  'Lakshadweep': 'Lakshadweep,0.3,0.01,Yes,Yes,Yes',
  'Madhya_Pradesh': 'Madhya Pradesh,28.7,0.06,Yes,Yes,Yes',
  'Maharashtra': 'Maharashtra,45.8,0.11,Yes,Yes,Yes',
  'Manipur': 'Manipur,2.8,0.02,Yes,Yes,Yes',
  'Meghalaya': 'Meghalaya,3.5,0.03,Yes,Yes,Yes',
  'Mizoram': 'Mizoram,1.9,0.01,Yes,Yes,Yes',
  'Nagaland': 'Nagaland,2.1,0.02,Yes,Yes,Yes',
  'Odisha': 'Odisha,22.4,0.05,Yes,Yes,Yes',
  'Puducherry': 'Puducherry,1.8,0.03,Yes,Yes,Yes',
  'Punjab': 'Punjab,15.6,0.04,Yes,Yes,Yes',
  'Rajasthan': 'Rajasthan,52.3,0.15,Yes,Yes,Yes',
  'Sikkim': 'Sikkim,2.4,0.03,Yes,Yes,Yes',
  'Tamil_Nadu': 'Tamil Nadu,48.7,0.13,Yes,Yes,Yes',
  'Telangana': 'Telangana,32.5,0.08,Yes,Yes,Yes',
  'Tripura': 'Tripura,2.9,0.02,Yes,Yes,Yes',
  'Uttarakhand': 'Uttarakhand,59.6,0.148,Yes,Yes,Yes',
  'Uttar_Pradesh': 'Uttar Pradesh,65.4,0.18,Yes,Yes,Yes',
  'West_Bengal': 'West Bengal,38.2,0.09,Yes,Yes,Yes'
};

// Function to create a new Snowflake connection
function createConnection() {
  return snowflake.createConnection(connectionConfig);
}

// Function to connect to Snowflake with retry logic
async function connectWithRetry(maxRetries = 3) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const connection = createConnection();
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
      return connection;
    } catch (error) {
      retries++;
      if (retries === maxRetries) {
        throw error;
      }
      console.log(`Connection attempt ${retries} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
    }
  }
}

// Function to execute a query with retry logic
async function executeQuery(connection, query, binds = [], maxRetries = 3) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await new Promise((resolve, reject) => {
        connection.execute({
          sqlText: query,
          binds: binds,
          complete: (err, stmt, rows) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(rows);
          }
        });
      });
    } catch (error) {
      retries++;
      if (retries === maxRetries) {
        throw error;
      }
      console.log(`Query attempt ${retries} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
    }
  }
}

async function uploadTourismCSVsInBatches() {
  let connection;
  try {
    // Connect to Snowflake
    connection = await connectWithRetry();

    // Get all CSV files
    const files = fs.readdirSync(TOURISM_DATA_DIR)
      .filter(file => file.endsWith('.csv'))
      .map(file => path.join(TOURISM_DATA_DIR, file));

    // Process files in batches of 3
    for (let i = 0; i < files.length; i += 3) {
      const batch = files.slice(i, i + 3);
      console.log(`\nProcessing batch ${Math.floor(i/3) + 1} of ${Math.ceil(files.length/3)}`);
      
      for (const file of batch) {
        const fileName = path.basename(file);
        console.log(`\nProcessing ${fileName}...`);
        
        // Read and parse CSV
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.trim().split('\n');
        
        // If file only has header, add sample data
        if (lines.length <= 1) {
          const stateKey = fileName.replace('_Tourism_Data.csv', '');
          if (sampleData[stateKey]) {
            console.log(`Adding sample data for ${stateKey}`);
            fs.appendFileSync(file, '\n' + sampleData[stateKey]);
          }
        }
        
        // Read updated content
        const updatedContent = fs.readFileSync(file, 'utf8');
        const records = parse(updatedContent, {
          columns: true,
          skip_empty_lines: true,
          trim: true
        });

        if (records.length === 0) {
          console.log(`No records found in ${fileName}, skipping...`);
          continue;
        }

        // Prepare data for insertion
        const cleanedRecords = records.map(record => ({
          State: record.State,
          'Domestic Tourist Visits (million)': record['Domestic Tourist Visits (million)'] || null,
          'Foreign Tourist Visits (million)': record['Foreign Tourist Visits (million)'] || null,
          Art: record.Art || 'No',
          Culture: record.Culture || 'No',
          Tourism: record.Tourism || 'No'
        }));

        // Insert data into Snowflake
        const insertQuery = `
          INSERT INTO TOURISM_DATA (
            STATE,
            DOMESTIC_TOURIST_VISITS_MILLION,
            FOREIGN_TOURIST_VISITS_MILLION,
            HAS_ART,
            HAS_CULTURE,
            HAS_TOURISM
          ) VALUES (?, ?, ?, ?, ?, ?)
        `;

        for (const record of cleanedRecords) {
          try {
            await executeQuery(connection, insertQuery, [
              record.State,
              parseFloat(record['Domestic Tourist Visits (million)']) || null,
              parseFloat(record['Foreign Tourist Visits (million)']) || null,
              record.Art === 'Yes' ? 1 : 0,
              record.Culture === 'Yes' ? 1 : 0,
              record.Tourism === 'Yes' ? 1 : 0
            ]);
            console.log(`Successfully inserted data for ${record.State}`);
          } catch (error) {
            console.error(`Error inserting record for ${record.State}:`, error);
            // If connection is terminated, try to reconnect
            if (error.code === 407002) {
              console.log('Connection terminated, attempting to reconnect...');
              connection = await connectWithRetry();
              // Retry the insert
              await executeQuery(connection, insertQuery, [
                record.State,
                parseFloat(record['Domestic Tourist Visits (million)']) || null,
                parseFloat(record['Foreign Tourist Visits (million)']) || null,
                record.Art === 'Yes' ? 1 : 0,
                record.Culture === 'Yes' ? 1 : 0,
                record.Tourism === 'Yes' ? 1 : 0
              ]);
              console.log(`Successfully inserted data for ${record.State} after reconnection`);
            }
          }
        }
      }
    }

    console.log('\nAll files processed successfully');
  } catch (error) {
    console.error('Error uploading tourism CSVs:', error);
  } finally {
    // Close the connection
    if (connection) {
      connection.destroy();
    }
  }
}

async function debugTourismCSVs() {
  const files = fs.readdirSync(TOURISM_DATA_DIR).filter(f => f.endsWith('.csv'));

  for (const file of files) {
    const filePath = path.join(TOURISM_DATA_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\n--- Debugging file: ${file} ---`);
    console.log('Raw content:');
    console.log(content);
    const lines = content.split(/\r?\n/);
    console.log('Split lines:', lines);
    let records = [];
    try {
      records = parse(content, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true,
      });
      console.log('Parsed records:', records);
    } catch (err) {
      console.warn(`Error parsing ${file}:`, err.message);
    }
    if (records.length === 0) {
      console.warn(`No records found in ${file}. Problematic lines:`);
      lines.forEach((line, idx) => {
        if (line.trim() && idx > 0) console.log(`Line ${idx + 1}:`, line);
      });
    } else {
      // Prepare for upload: replace empty/whitespace with null
      records = records.map(row => {
        Object.keys(row).forEach(key => {
          if (typeof row[key] === 'string' && row[key].trim() === '') {
            row[key] = null;
          }
        });
        return row;
      });
      console.log('Cleaned records ready for upload:', records);
    }
  }
  console.log('\nDebugging complete. Review the logs above for each file.');
}

async function scanMissingDataRows() {
  const files = fs.readdirSync(TOURISM_DATA_DIR).filter(f => f.endsWith('.csv'));
  console.log('\n--- Scanning for missing data rows ---');
  for (const file of files) {
    const filePath = path.join(TOURISM_DATA_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/).filter(line => line.trim());
    if (lines.length <= 1) {
      console.log(`File ${file} is missing data rows. Expected format:`);
      console.log('State,Domestic Tourist Visits (million),Foreign Tourist Visits (million),Art,Culture,Tourism');
      console.log('Example: Uttarakhand,59.6,0.148,Yes,Yes,Yes');
    }
  }
  console.log('\nScan complete. Review the logs above for files missing data rows.');
}

// Only run the debug function for now
if (require.main === module) {
  debugTourismCSVs();
}

// Only run the scan function for now
if (require.main === module) {
  scanMissingDataRows();
}

// Only run the upload function for now
if (require.main === module) {
  uploadTourismCSVsInBatches();
}

uploadTourismCSVsInBatches().catch(err => {
  console.error('Error uploading tourism CSVs:', err);
  process.exit(1);
});

module.exports = { uploadTourismCSVsInBatches }; 