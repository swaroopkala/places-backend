import axios from 'axios';
import { env } from '../config/env';
import { PlacesAutocompleteResponse } from '../types/places';

/**
 * Service for interacting with the Google Places API
 */
export class PlacesService {
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api/place';
  private readonly apiKey: string;

  constructor() {
    this.apiKey = env.googlePlacesApiKey;
  }

  /**
   * Get autocomplete suggestions for a place query
   * @param query The search query
   * @returns Promise with the autocomplete response
   */
  async getAutocompleteSuggestions(query: string): Promise<PlacesAutocompleteResponse> {
    try {
      const encodedQuery = encodeURIComponent(query);
      
      const url = `${this.baseUrl}/autocomplete/json?input=${encodedQuery}&key=${this.apiKey}`;
      
      const response = await axios.get<PlacesAutocompleteResponse>(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
        const error: any = new Error(response.data.error_message || `Google Places API Error: ${response.data.status}`);
        error.status = 500;
        throw error;
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error_message || error.message;
        const customError: any = new Error(`Failed to fetch autocomplete suggestions: ${errorMessage}`);
        customError.status = error.response?.status || 500;
        throw customError;
      }
      throw error;
    }
  }
}
