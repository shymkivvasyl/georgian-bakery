import type { Locations, Product } from "@/types";

interface SheetRow {
  c: Array<{ v: string | number | boolean | null; f?: string } | null>;
}

const API = "1HoEjzxqMQRH-HWq2eg6TlCrOXz5i8TqPPshJIFMsd3U";

export const getMenu = async (): Promise<Product[]> => {
  const response = await fetch(
    `https://docs.google.com/spreadsheets/d/${API}/gviz/tq?tqx=out:json`,
  );

  const text = await response.text();

  // Обрізаємо зайве і парсимо JSON
  const json = JSON.parse(text.substring(47, text.length - 2));

  // Перетворюємо рядки таблиці в масив Product
  return json.table.rows.map((row: SheetRow, index: number) => ({
    id: index + 1,
    category: row.c[0]?.v ?? "",
    name: row.c[1]?.v ?? "",
    price: row.c[2]?.v ?? 0,
    description: row.c[3]?.v ?? "",
    imageUrl: row.c[4]?.v ?? "",
    available: row.c[5]?.v ?? true,
    date: row.c[6]?.f ?? "",
  }));
};

export const getLocations = async (): Promise<Locations[]> => {
  const response = await fetch(
    `https://docs.google.com/spreadsheets/d/${API}/gviz/tq?tqx=out:json&sheet=locations`,
  );

  const text = await response.text();

  // Обрізаємо зайве і парсимо JSON
  const json = JSON.parse(text.substring(47, text.length - 2));

  // Перетворюємо рядки таблиці в масив Product
  return json.table.rows.slice(1).map((row: SheetRow, index: number) => ({
    id: index + 1,
    region: row.c[0]?.v ?? "",
    city: row.c[1]?.v ?? "",
    address: row.c[2]?.v ?? "",
    phone: row.c[3]?.v ?? "",
    email: row.c[4]?.v ?? "",
  }));

};
