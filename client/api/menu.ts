import type { VercelRequest, VercelResponse } from "@vercel/node";

interface SheetRow {
  c: Array<{ v: string | number | boolean | null; f?: string } | null>;
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(API);
    const text = await response.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const products = json.table.rows
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
      .filter((product: { name: string }) => product.name !== "");

    res.status(200).json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
}
