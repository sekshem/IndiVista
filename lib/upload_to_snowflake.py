import os
import pandas as pd
from snowflake_connection import SnowflakeConnection
import logging

logger = logging.getLogger(__name__)

# Paths to data directories
FINANCIAL_DATA_DIR = os.path.join('Data', 'Data for Financial assistances for Art and Culture Promotion')
TOURISM_DATA_DIR = os.path.join('Data', 'Tourism Data')

# Upload financial assistance data
def upload_financial_data():
    for filename in os.listdir(FINANCIAL_DATA_DIR):
        if filename.endswith('.csv'):
            filepath = os.path.join(FINANCIAL_DATA_DIR, filename)
            df = pd.read_csv(filepath)
            logger.info(f"Uploading {filename} to ART_CULTURE_FINANCIAL_DATA...")
            with SnowflakeConnection.get_connection() as conn:
                with conn.cursor() as cur:
                    for _, row in df.iterrows():
                        cur.execute(
                            """
                            INSERT INTO ART_CULTURE_FINANCIAL_DATA (STATE_UT, FINANCIAL_YEAR, NO_OF_ORGS, AMOUNT_Rs_IN_LAKHS)
                            VALUES (%s, %s, %s, %s)
                            """,
                            (
                                row['State/UT'],
                                row['Financial Year'],
                                int(row['No. of Orgs']),
                                float(row['Amount (Rs in lakhs)'])
                            )
                        )
            logger.info(f"Uploaded {filename}")

# Upload tourism data

def parse_bool(val):
    if isinstance(val, str):
        return val.strip().lower() == 'yes'
    return bool(val)

def upload_tourism_data():
    for filename in os.listdir(TOURISM_DATA_DIR):
        if filename.endswith('.csv'):
            filepath = os.path.join(TOURISM_DATA_DIR, filename)
            df = pd.read_csv(filepath)
            logger.info(f"Uploading {filename} to TOURISM_DATA...")
            with SnowflakeConnection.get_connection() as conn:
                with conn.cursor() as cur:
                    for _, row in df.iterrows():
                        cur.execute(
                            """
                            INSERT INTO TOURISM_DATA (STATE, DOMESTIC_TOURIST_VISITS_MILLION, FOREIGN_TOURIST_VISITS_MILLION, HAS_ART, HAS_CULTURE, HAS_TOURISM)
                            VALUES (%s, %s, %s, %s, %s, %s)
                            """,
                            (
                                row['State'],
                                float(row['Domestic Tourist Visits (million)']) if not pd.isna(row['Domestic Tourist Visits (million)']) else None,
                                float(row['Foreign Tourist Visits (million)']) if not pd.isna(row['Foreign Tourist Visits (million)']) else None,
                                parse_bool(row['Art']) if 'Art' in row else None,
                                parse_bool(row['Culture']) if 'Culture' in row else None,
                                parse_bool(row['Tourism']) if 'Tourism' in row else None
                            )
                        )
            logger.info(f"Uploaded {filename}")

def main():
    upload_financial_data()
    upload_tourism_data()
    logger.info("All data uploaded successfully.")

if __name__ == "__main__":
    main() 