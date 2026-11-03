import type { Locations } from '@/types';

function normalize(searchInput: string): string {
  return searchInput.trim().toLocaleLowerCase().replace(/['’ʼ]/g, "'");
}

export function searchLocations(locations: Locations[], search: string): Locations[] {
  const searchNorm = normalize(search);

  if (searchNorm.length === 0) {
    return locations;
  }

  return locations.filter((location) => {
    const fields = [location.city, location.address, location.region];

    return fields.some((field) => normalize(field).includes(searchNorm));
  });
}
