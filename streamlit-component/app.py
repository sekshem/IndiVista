import streamlit as st
import pandas as pd
import plotly.express as px
import snowflake.connector
from dotenv import load_dotenv
import os
import sys

# Add parent directory to path to find .env.local
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load environment variables from .env.local
load_dotenv('.env.local')

# Snowflake connection configuration
def get_snowflake_connection():
    required_env_vars = [
        'SNOWFLAKE_ACCOUNT',
        'SNOWFLAKE_USER',
        'SNOWFLAKE_PASSWORD',
        'SNOWFLAKE_WAREHOUSE',
        'SNOWFLAKE_DATABASE',
        'SNOWFLAKE_SCHEMA'
    ]
    
    # Check if all required environment variables are set
    missing_vars = [var for var in required_env_vars if not os.getenv(var)]
    if missing_vars:
        raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
    
    return snowflake.connector.connect(
        account=os.getenv('SNOWFLAKE_ACCOUNT'),
        user=os.getenv('SNOWFLAKE_USER'),
        password=os.getenv('SNOWFLAKE_PASSWORD'),
        warehouse=os.getenv('SNOWFLAKE_WAREHOUSE'),
        database=os.getenv('SNOWFLAKE_DATABASE'),
        schema=os.getenv('SNOWFLAKE_SCHEMA')
    )

# Configure Streamlit
st.set_page_config(
    page_title="Tourism Analytics",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Add security headers for iframe embedding
st.markdown("""
    <script>
        // Add security headers
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "frame-ancestors 'self' http://localhost:3000 http://localhost:3001 http://localhost:3002 http://localhost:3003 http://localhost:3004";
        document.head.appendChild(meta);
    </script>
""", unsafe_allow_html=True)

# Custom CSS to make it blend with React app
st.markdown("""
    <style>
        .stApp {
            background-color: #F3FAFE;
            padding: 0;
            margin: 0;
        }
        .stPlotlyChart {
            background-color: white;
            border-radius: 8px;
            padding: 1rem;
            margin: 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .stDataFrame {
            background-color: white;
            border-radius: 8px;
            padding: 1rem;
            margin: 1rem 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .stAlert {
            background-color: white;
            border-radius: 8px;
            padding: 1rem;
            margin: 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .main > div {
            padding: 0 !important;
        }
        .stDeployButton {
            display: none;
        }
        h1, h2, h3 {
            color: #1E3A8A;
        }
        .stDataFrame {
            margin-bottom: 2rem;
        }
    </style>
""", unsafe_allow_html=True)

# Title
st.title("Tourism Data Analytics")

try:
    # Connect to Snowflake
    conn = get_snowflake_connection()
    
    # Query tourism data
    query = """
    SELECT 
        STATE,
        DOMESTIC_TOURIST_VISITS_MILLION,
        FOREIGN_TOURIST_VISITS_MILLION,
        HAS_ART,
        HAS_CULTURE,
        HAS_TOURISM
    FROM TOURISM_DATA
    ORDER BY DOMESTIC_TOURIST_VISITS_MILLION DESC
    """
    
    df = pd.read_sql(query, conn)
    
    # Show financial data first
    financial_query = """
    SELECT 
        STATE_UT,
        FINANCIAL_YEAR,
        NO_OF_ORGS,
        AMOUNT_RS_IN_LAKHS
    FROM ART_CULTURE_FINANCIAL_DATA
    ORDER BY FINANCIAL_YEAR DESC, AMOUNT_RS_IN_LAKHS DESC
    """
    
    financial_df = pd.read_sql(financial_query, conn)
    st.subheader("Financial Assistance Overview")
    st.dataframe(
        financial_df.style.background_gradient(subset=['AMOUNT_RS_IN_LAKHS']),
        use_container_width=True
    )
    
    # Add spacing between tables
    st.markdown("<br>", unsafe_allow_html=True)
    
    # Show tourism data
    st.subheader("Tourism Data Overview")
    st.dataframe(
        df.style.background_gradient(subset=['DOMESTIC_TOURIST_VISITS_MILLION', 'FOREIGN_TOURIST_VISITS_MILLION']),
        use_container_width=True
    )
    
    # Add spacing before charts
    st.markdown("<br><br>", unsafe_allow_html=True)
    
    # Create two columns for charts at the bottom
    col1, col2 = st.columns(2)
    
    with col1:
        # Show pie chart
        st.subheader("Distribution of Cultural Features")
        feature_counts = {
            'Art': df['HAS_ART'].sum(),
            'Culture': df['HAS_CULTURE'].sum(),
            'Tourism': df['HAS_TOURISM'].sum()
        }
        fig2 = px.pie(
            values=list(feature_counts.values()),
            names=list(feature_counts.keys()),
            title='Distribution of Cultural Features',
            hole=0.4
        )
        fig2.update_layout(
            plot_bgcolor='white',
            paper_bgcolor='white',
            font=dict(color='#1E3A8A')
        )
        st.plotly_chart(fig2, use_container_width=True)
    
    with col2:
        # Show bar chart
        st.subheader("Top 10 States by Tourist Visits")
        fig1 = px.bar(
            df.head(10),
            x='STATE',
            y=['DOMESTIC_TOURIST_VISITS_MILLION', 'FOREIGN_TOURIST_VISITS_MILLION'],
            title='Top 10 States by Tourist Visits',
            barmode='group',
            labels={
                'value': 'Number of Tourists (Millions)',
                'variable': 'Tourist Type',
                'STATE': 'State'
            }
        )
        fig1.update_layout(
            plot_bgcolor='white',
            paper_bgcolor='white',
            font=dict(color='#1E3A8A')
        )
        st.plotly_chart(fig1, use_container_width=True)

except ValueError as e:
    st.error(f"Configuration Error: {str(e)}")
    st.info("Please make sure you have created a .env.local file with all required Snowflake credentials.")
except Exception as e:
    st.error(f"Error connecting to Snowflake: {str(e)}")
    st.info("Please check your Snowflake credentials and make sure the database is accessible.")
finally:
    if 'conn' in locals():
        conn.close() 