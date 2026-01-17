const admin = require("firebase-admin");
const fs = require("node:fs");
const path = require("node:path");

const BASE_DIR = __dirname;

// Путь к advice.json
const ADVICE_PATH = path.join(BASE_DIR, "app", "data", "advice.json");

// Путь к service account (ключ)
const SA_PATH = path.join(BASE_DIR, "serviceAccountKey.json");

const data = JSON.parse(fs.readFileSync(ADVICE_PATH, "utf8"));
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

    // 1) advice -> коллекция "advice", docId = id (число -> строка)
    for (const a of data.advice ?? []) {
        const ref = db.collection("advice").doc(String(a.id));
        writes.push((batch) => batch.set(ref, a, { merge: true }));
    }

    // 2) categories -> коллекция "adviceCategories", docId = id (строка)
    for (const c of data.categories ?? []) {
        const ref = db.collection("adviceCategories").doc(String(c.id));
        writes.push((batch) => batch.set(ref, c, { merge: true }));
    }

    // 3) faqs -> коллекция "faqs", docId = index (или можно сделать slug)
    (data.faqs ?? []).forEach((f, idx) => {
        const ref = db.collection("faqs").doc(String(idx + 1));
        writes.push((batch) => batch.set(ref, f, { merge: true }));
    });

    await commitInChunks(writes, 500);

    console.log("Done ✅ Imported:", {
        advice: (data.advice ?? []).length,
        adviceCategories: (data.categories ?? []).length,
        faqs: (data.faqs ?? []).length,
    });
}

run().catch((e) => {
    console.error("Import failed:", e);
    process.exit(1);
});
