import { Router } from 'express';
import { PlacesController } from '../controllers/places.controller';
import { validateQueryParam } from '../middleware/validation.middleware';

const router = Router();

const placesController = new PlacesController();

/**
 * @route   GET /places/autocomplete
 * @desc    Get autocomplete suggestions for a place query
 * @access  Public
 * @query   query - The search query
 */
router.get(
  '/autocomplete',
  validateQueryParam('query'),
  (req, res, next) => placesController.autocomplete(req, res, next)
);

export default router;
