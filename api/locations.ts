import type { VercelRequest, VercelResponse } from "@vercel/node";

interface SheetRow {
  c: Array<{ v: string | number | boolean | null; f?: string } | null>;
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=locations`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(API);
    const text = await response.text();
    const json = JSON.parse(text.substring(47, text.length - 2));

    const locations = json.table.rows.map((row: SheetRow) => ({
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

    res.status(200).json(locations);
  } catch {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
}
