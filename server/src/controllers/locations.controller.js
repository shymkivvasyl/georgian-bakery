// TODO: move locations to the database
import locations from '../data/locations.json' with { type: 'json' };

/**
 * GET /api/locations - return all locations
 */
export function getLocations(req, res) {
  return res.json(locations);
}
