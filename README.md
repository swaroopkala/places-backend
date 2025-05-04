# Google Places API Node.js Express TypeScript Application

A complete TypeScript-based Express.js application that interfaces with the Google Places API.

## Features

- TypeScript-based Express.js server
- Google Places API integration for place autocomplete
- Environment variable configuration
- Rate limiting
- Request validation
- Error handling
- CORS support
- Security headers with Helmet
- Request logging

## Project Structure

```
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request controllers
│   ├── middleware/     # Custom middleware
│   ├── routes/         # API routes
│   ├── services/       # Service layer for external API calls
│   ├── types/          # TypeScript interfaces
│   ├── app.ts          # Express application setup
│   └── index.ts        # Entry point
├── .env.example        # Example environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Places API key

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Add your Google Places API key to the `.env` file:

```
GOOGLE_PLACES_API_KEY=your_api_key_here
```

## Usage

### Development

To run the application in development mode with hot reloading:

```bash
npm run dev
```

### Build

To compile TypeScript to JavaScript:

```bash
npm run build
```

### Production

To run the application in production mode:

```bash
npm run build
npm start
```

## API Endpoints

### GET /places/autocomplete

Get autocomplete suggestions for a place query.

**Query Parameters:**

- `query` (required): The search query string

**Example Request:**

```
GET /places/autocomplete?query=karur%20vysya%20bank%20east%20anadbagh
```

**Example Response:**

```json
{
  "predictions": [
    {
      "description": "Karur Vysya Bank, East Anadbagh, Hyderabad, Telangana, India",
      "place_id": "ChIJxxxxxxxxxxxxxxxxxx",
      "reference": "ChIJxxxxxxxxxxxxxxxxxx",
      "structured_formatting": {
        "main_text": "Karur Vysya Bank",
        "main_text_matched_substrings": [
          {
            "length": 16,
            "offset": 0
          }
        ],
        "secondary_text": "East Anadbagh, Hyderabad, Telangana, India"
      },
      "terms": [
        {
          "offset": 0,
          "value": "Karur Vysya Bank"
        },
        {
          "offset": 18,
          "value": "East Anadbagh"
        },
        {
          "offset": 33,
          "value": "Hyderabad"
        },
        {
          "offset": 44,
          "value": "Telangana"
        },
        {
          "offset": 55,
          "value": "India"
        }
      ],
      "types": ["bank", "point_of_interest", "establishment"]
    }
  ],
  "status": "OK"
}
```

## Error Handling

The API returns standardized error responses:

```json
{
  "status": 400,
  "message": "Missing required query parameter: query"
}
```

## License

ISC
