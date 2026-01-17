const admin = require("firebase-admin");
const fs = require("node:fs");
const path = require("node:path");

// абсолютный путь к папке, где лежит этот скрипт
const BASE_DIR = __dirname;

// если plants.json лежит в app/data/plants.json:
const PLANTS_PATH = path.join(BASE_DIR, "app", "data", "plants.json");

// serviceAccountKey.json положи рядом со скриптом (или поменяй путь ниже)
const SA_PATH = path.join(BASE_DIR, "serviceAccountKey.json");

// читаем JSON через fs (без require("./...json") — так надёжнее)
const data = JSON.parse(fs.readFileSync(PLANTS_PATH, "utf8"));
const serviceAccount = JSON.parse(fs.readFileSync(SA_PATH, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function commitInChunks(writes, chunkSize = 500) {
  for (let i = 0; i < writes.length; i += chunkSize) {
    const batch = db.batch();
    const chunk = writes.slice(i, i + chunkSize);
    chunk.forEach((fn) => fn(batch));
    await batch.commit();
  }
}

async function run() {
  const writes = [];

  for (const p of data.plants ?? []) {
    const ref = db.collection("plants").doc(String(p.id));
    writes.push((batch) => batch.set(ref, p, { merge: true }));
  }

  for (const c of data.categories ?? []) {
    const ref = db.collection("categories").doc(String(c.id));
    writes.push((batch) => batch.set(ref, c, { merge: true }));
  }

  for (const s of data.sizes ?? []) {
    const ref = db.collection("sizes").doc(String(s.id));
    writes.push((batch) => batch.set(ref, s, { merge: true }));
  }

  await commitInChunks(writes, 500);

  console.log("Done ✅ Imported:", {
    plants: (data.plants ?? []).length,
    categories: (data.categories ?? []).length,
    sizes: (data.sizes ?? []).length,
  });
}

run().catch((e) => {
  console.error("Import failed:", e);
  process.exit(1);
});
