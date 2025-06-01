from snowflake_connection import SnowflakeConnection
import logging

logger = logging.getLogger(__name__)

def create_tables():
    try:
        with SnowflakeConnection.get_connection() as conn:
            with conn.cursor() as cur:
                # Create ART_CULTURE_FINANCIAL_DATA table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS ART_CULTURE_FINANCIAL_DATA (
                        STATE_UT VARCHAR,
                        FINANCIAL_YEAR VARCHAR,
                        NO_OF_ORGS INTEGER,
                        AMOUNT_Rs_IN_LAKHS FLOAT,
                        CREATED_AT TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
                    )
                """)
                
                # Create TOURISM_DATA table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS TOURISM_DATA (
                        STATE VARCHAR,
                        DOMESTIC_TOURIST_VISITS_MILLION FLOAT,
                        FOREIGN_TOURIST_VISITS_MILLION FLOAT,
                        HAS_ART BOOLEAN,
                        HAS_CULTURE BOOLEAN,
                        HAS_TOURISM BOOLEAN,
                        CREATED_AT TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
                    )
                """)
                
                logger.info("Tables created successfully")
    except Exception as e:
        logger.error(f"Error creating tables: {str(e)}")
        raise

if __name__ == "__main__":
    create_tables() 