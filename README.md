# Places API

A simple Express app built with TypeScript that connects to Google Places API for location autocomplete.

## What it does

- Provides autocomplete suggestions for place searches
- Handles API requests securely with validation and rate limiting
- Includes all the good stuff: CORS, error handling

## Setup

1. Make sure you have Node.js v14+
2. Run `npm install`
3. Copy `.env.example` to `.env` and add your Google API key
4. Start developing with `npm run dev`

## API Usage

Just make a GET request to:
```
/places/autocomplete?query=your search term
```

The response gives you formatted place predictions from Google.

## Quick Commands

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Run in production
npm start
```

