# IndiVista - Art, Culture & Tourism Explorer

A modern web application that provides insights into India's art, culture, and tourism data using Snowflake and interactive visualizations.

## Features

- Interactive dashboard with tourism data analytics
- Visual representation of cultural features distribution
- Financial assistance overview
- State-wise tourism statistics
- Real-time data from Snowflake database

## Tech Stack

- Frontend: Next.js, React, TypeScript
- Backend: Streamlit, Python
- Database: Snowflake
- Visualization: Plotly
- Styling: Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Snowflake account and credentials
- npm or yarn package manager

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/sekshem/IndiVista.git
   cd IndiVista
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install Python dependencies:
   ```bash
   pip install -r streamlit-component/requirements.txt
   ```

4. Create a `.env.local` file in the root directory with your Snowflake credentials:
   ```
   SNOWFLAKE_ACCOUNT=your_account
   SNOWFLAKE_USER=your_username
   SNOWFLAKE_PASSWORD=your_password
   SNOWFLAKE_WAREHOUSE=your_warehouse
   SNOWFLAKE_DATABASE=your_database
   SNOWFLAKE_SCHEMA=your_schema
   ```

5. Start the development servers:

   In one terminal:
   ```bash
   streamlit run streamlit-component/app.py --server.port 8503
   ```

   In another terminal:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
IndiVista/
├── app/                    # Next.js app directory
├── components/            # React components
├── streamlit-component/   # Streamlit dashboard
│   ├── app.py            # Main Streamlit application
│   └── requirements.txt  # Python dependencies
├── public/               # Static files
└── styles/              # CSS styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data sourced from various government and tourism databases
- Built with modern web technologies for optimal performance
- Special thanks to the open-source community 