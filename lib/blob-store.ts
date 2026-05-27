import { getStore } from "@netlify/blobs";
import type { RSVPRecord, WeddingData } from "@/types";

const DATA_STORE = "wedding-data";
const UPLOADS_STORE = "wedding-uploads";

function dataStore() {
  return getStore(DATA_STORE);
}

function uploadsStore() {
  return getStore(UPLOADS_STORE);
}

export async function blobGetWedding(): Promise<WeddingData | null> {
  return dataStore().get("wedding", { type: "json", consistency: "strong" });
}

export async function blobSaveWedding(data: WeddingData) {
  await dataStore().setJSON("wedding", data);
}

export async function blobGetRSVPs(): Promise<RSVPRecord[]> {
  return (
    (await dataStore().get("rsvps", { type: "json", consistency: "strong" })) ??
    []
  );
}

export async function blobSaveRSVPs(rsvps: RSVPRecord[]) {
  await dataStore().setJSON("rsvps", rsvps);
}

export async function blobSaveUpload(
  filename: string,
  buffer: ArrayBuffer,
  contentType: string
) {
  await uploadsStore().set(filename, buffer, {
    metadata: { contentType },
  });
}

export async function blobGetUpload(filename: string) {
  return uploadsStore().getWithMetadata(filename, {
    type: "arrayBuffer",
    consistency: "strong",
  });
}
