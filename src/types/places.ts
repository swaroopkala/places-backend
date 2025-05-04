/**
 * Interface for the Google Places Autocomplete API response
 */
export interface PlacesAutocompleteResponse {
  predictions: Prediction[];
  status: string;
  error_message?: string;
}

/**
 * Interface for a prediction in the Google Places Autocomplete API response
 */
export interface Prediction {
  description: string;
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
  matched_substrings: MatchedSubstring[];
}

/**
 * Interface for structured formatting in a prediction
 */
export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
}

/**
 * Interface for a term in a prediction
 */
export interface Term {
  offset: number;
  value: string;
}

/**
 * Interface for a matched substring in a prediction
 */
export interface MatchedSubstring {
  length: number;
  offset: number;
}

/**
 * Interface for the request query parameters
 */
export interface PlacesAutocompleteRequest {
  query: string;
}

/**
 * Interface for the error response
 */
export interface ErrorResponse {
  status: number;
  message: string;
}
