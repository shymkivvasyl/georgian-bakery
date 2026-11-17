export function readFromLocalStorage(key: string): unknown {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return null;

    return JSON.parse(saved);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
}
