import os
from dotenv import load_dotenv
import snowflake.connector
import logging
from typing import Optional

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv('local.env')

class SnowflakeConnection:
    @classmethod
    def get_connection(cls) -> snowflake.connector.SnowflakeConnection:
        try:
            conn = snowflake.connector.connect(
                account=os.getenv('SNOWFLAKE_ACCOUNT'),
                user=os.getenv('SNOWFLAKE_USER'),
                password=os.getenv('SNOWFLAKE_PASSWORD'),
                warehouse=os.getenv('SNOWFLAKE_WAREHOUSE'),
                database=os.getenv('SNOWFLAKE_DATABASE'),
                schema=os.getenv('SNOWFLAKE_SCHEMA')
            )
            logger.info("Snowflake connection created successfully")
            return conn
        except Exception as e:
            logger.error(f"Error creating Snowflake connection: {str(e)}")
            raise

    @classmethod
    def execute_query(cls, query: str, params: tuple = None):
        try:
            with cls.get_connection() as conn:
                with conn.cursor() as cur:
                    if params:
                        cur.execute(query, params)
                    else:
                        cur.execute(query)
                    return cur.fetchall()
        except Exception as e:
            logger.error(f"Error executing query: {str(e)}")
            raise

    @classmethod
    def clear_tables(cls):
        try:
            with cls.get_connection() as conn:
                with conn.cursor() as cur:
                    # Clear ART_CULTURE_FINANCIAL_DATA table
                    cur.execute("TRUNCATE TABLE IF EXISTS ART_CULTURE_FINANCIAL_DATA")
                    # Clear TOURISM_DATA table
                    cur.execute("TRUNCATE TABLE IF EXISTS TOURISM_DATA")
                    logger.info("Tables cleared successfully")
        except Exception as e:
            logger.error(f"Error clearing tables: {str(e)}")
            raise

def test_connection():
    try:
        conn = SnowflakeConnection.get_connection()
        logger.info("Successfully connected to Snowflake")
        return True
    except Exception as e:
        logger.error(f"Failed to connect to Snowflake: {str(e)}")
        return False

if __name__ == "__main__":
    test_connection() 