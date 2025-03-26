# Data Source Management App

A modern, single-page React application for managing data sources, built with Vite and TypeScript.

## Features

- List and monitor data sources
- Check health status of all sources
- View file counts for each source
- Download files from sources
- Add new sources with different transport types:
  - HTTP Transport
  - SFTP Transport
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn
- Backend API running on localhost:8000

### Installation

1. Clone this repository
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory
   ```bash
   cd ui_app
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Backend API

This application requires a backend API running on `http://localhost:8000` with the following endpoints:

- `GET /sources` - List all data sources
- `GET /health` - Check health of all sources
- `GET /sources/{source_name}/health` - Check health of a specific source
- `GET /sources/{source_name}/files` - Get files for a specific source
- `POST /sources/{source_name}/download` - Download files for a specific source
- `POST /sources` - Add a new source

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3 (with modern features like CSS variables and gradients)

## Extending the Transport Types

The application is designed to be easily extendable for future transport types:

1. Add a new option to the transport type dropdown
2. Create a new conditional rendering block for the specific configuration fields
3. The form will automatically handle the configuration as a JSON object

## License

MIT
