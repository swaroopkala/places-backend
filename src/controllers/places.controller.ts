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
      const { query } = req.query as unknown as PlacesAutocompleteRequest;
      
      console.log(`[Places] Autocomplete request for query: ${query}`);
      
      const suggestions = await this.placesService.getAutocompleteSuggestions(query);
      
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      
      res.json(suggestions);
    } catch (error) {
      next(error);
    }
  }
}
