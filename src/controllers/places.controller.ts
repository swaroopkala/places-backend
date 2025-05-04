import { Request, Response, NextFunction } from 'express';
import { PlacesService } from '../services/places.service';
import { PlacesAutocompleteRequest } from '../types/places';

/**
 * Controller for handling places-related requests
 */
export class PlacesController {
  private placesService: PlacesService;

  constructor() {
    this.placesService = new PlacesService();
  }

  /**
   * Handle autocomplete requests
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  async autocomplete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Extract the query parameter
      const { query } = req.query as unknown as PlacesAutocompleteRequest;
      
      // Log the incoming request
      console.log(`[Places] Autocomplete request for query: ${query}`);
      
      // Call the service to get autocomplete suggestions
      const suggestions = await this.placesService.getAutocompleteSuggestions(query);
      
      // Set CORS headers explicitly
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      
      // Return the suggestions
      res.json(suggestions);
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  }
}
