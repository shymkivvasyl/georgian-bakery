import type { Locations, Product } from "@/types";

interface SheetRow {
  c: Array<{ v: string | number | boolean | null; f?: string } | null>;
}

const API =
  "https://docs.google.com/spreadsheets/d/1HoEjzxqMQRH-HWq2eg6TlCrOXz5i8TqPPshJIFMsd3U/gviz/tq?tqx=out:json";

export const getMenu = async (): Promise<Product[]> => {
  const response = await fetch(`${API}`);

  const text = await response.text();

  // Обрізаємо зайве і парсимо JSON
  const json = JSON.parse(text.substring(47, text.length - 2));

  // Перетворюємо рядки таблиці в масив Product
  return json.table.rows
    .map((row: SheetRow) => ({
      id: row.c[0]?.v ?? 0,
      category: row.c[1]?.v ?? "",
      name: row.c[2]?.v ?? "",
      price: row.c[3]?.v ?? 0,
      description: row.c[4]?.v ?? "",
      imageUrl: row.c[5]?.v ?? "",
      available: row.c[6]?.v ?? true,
      date: row.c[7]?.f ?? "",
      group: row.c[8]?.v ?? "",
      popularity: row.c[9]?.v ?? 0,
    }))
    .filter((product: { name: string; }) => product.name !== "");
};

export const getLocations = async (): Promise<Locations[]> => {
  const response = await fetch(`${API}&sheet=locations`);

  const text = await response.text();

  // Обрізаємо зайве і парсимо JSON
  const json = JSON.parse(text.substring(47, text.length - 2));

  // Перетворюємо рядки таблиці в масив Product
  return json.table.rows.map((row: SheetRow) => ({
    id: row.c[0]?.v ?? 0,
    region: row.c[1]?.v ?? "",
    city: row.c[2]?.v ?? "",
    address: row.c[3]?.v ?? "",
    phone: row.c[4]?.v ?? "",
    email: row.c[5]?.v ?? "",
    availableProducts: row.c[6]?.v
      ? String(row.c[6].v).split(",").map(Number)
      : [],
  }));
};
