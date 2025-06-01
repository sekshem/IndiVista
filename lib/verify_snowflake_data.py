from snowflake_connection import SnowflakeConnection
import logging

logger = logging.getLogger(__name__)

def verify_table(table_name, limit=5):
    try:
        with SnowflakeConnection.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(f"SELECT * FROM {table_name} LIMIT {limit}")
                rows = cur.fetchall()
                logger.info(f"Sample data from {table_name}:")
                for row in rows:
                    print(row)
                return len(rows) > 0
    except Exception as e:
        logger.error(f"Error verifying table {table_name}: {str(e)}")
        return False

def main():
    print("Verifying ART_CULTURE_FINANCIAL_DATA...")
    art_ok = verify_table('ART_CULTURE_FINANCIAL_DATA')
    print("Verifying TOURISM_DATA...")
    tourism_ok = verify_table('TOURISM_DATA')
    if art_ok and tourism_ok:
        print("Data verification successful: Data exists in both tables.")
    else:
        print("Data verification failed: Check logs for details.")

if __name__ == "__main__":
    main() 