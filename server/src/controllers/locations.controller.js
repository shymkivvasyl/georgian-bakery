import locations from '../data/locations.json' with { type: 'json' };

export function getLocations(req, res) {
  return res.json(locations);
}
