/**
 * import-json-to-firestore.cjs
 *
 * Импортирует:
 *  - plants.json -> коллекция "plants" (docId = plant.id)
 *  - advice.json -> коллекция "advice" (docId = advice.id)
 *
 * Требования:
 *  - npm i firebase-admin
 *  - serviceAccountKey.json рядом со скриптом
 */

const admin = require("firebase-admin");
const fs = require("node:fs");
const path = require("node:path");

const BASE_DIR = __dirname;

// Пути к файлам
const SA_PATH = path.join(BASE_DIR, "serviceAccountKey.json");
const PLANTS_JSON_PATH = path.join(BASE_DIR, "plants.json");
const ADVICE_JSON_PATH = path.join(BASE_DIR, "advice.json");

// --- init firebase-admin
const serviceAccount = JSON.parse(fs.readFileSync(SA_PATH, "utf8"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// --- helpers
function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

async function commitInChunks(writes, chunkSize = 500) {
    for (let i = 0; i < writes.length; i += chunkSize) {
        const batch = db.batch();
        writes.slice(i, i + chunkSize).forEach((fn) => fn(batch));
        await batch.commit();
    }
}

function asDocId(v) {
    // Firestore doc id должен быть строкой
    if (v === null || v === undefined) return null;
    return String(v);
}

async function run() {
    const plantsJson = readJson(PLANTS_JSON_PATH);
    const adviceJson = readJson(ADVICE_JSON_PATH);

    const plants = Array.isArray(plantsJson?.plants) ? plantsJson.plants : [];
    const advice = Array.isArray(adviceJson?.advice) ? adviceJson.advice : [];

    if (!plants.length) console.warn("⚠️ plants.json: массив plants пуст или не найден");
    if (!advice.length) console.warn("⚠️ advice.json: массив advice пуст или не найден");

    const writes = [];

    // --- import plants -> collection "plants"
    for (const p of plants) {
        const docId = asDocId(p?.id);
        if (!docId) continue;

        const plantDoc = {
            id: p.id ?? null,
            title: p.title ?? null,
            image: p.image ?? null,
            category: p.category ?? null,
            size: p.size ?? null,
            price: p.price ?? null,
            oldPrice: p.oldPrice ?? null,
            discount: p.discount ?? null,
            description: p.description ?? null,

            // полезно для синка/отладки
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            source: "plants.json",
        };

        const ref = db.collection("plants").doc(docId);
        writes.push((batch) => batch.set(ref, plantDoc, { merge: true }));
    }

    // --- import advice -> collection "advice"
    for (const a of advice) {
        const docId = asDocId(a?.id);
        if (!docId) continue;

        const adviceDoc = {
            id: a.id ?? null,
            plantCategory: a.plantCategory ?? null,
            title: a.title ?? null,
            slug: a.slug ?? null,
            difficulty: a.difficulty ?? null,
            image: a.image ?? null,

            // остальная структура советов
            light: a.light ?? null,
            watering: a.watering ?? null,
            soil: a.soil ?? null,
            temperature: a.temperature ?? null,
            humidity: a.humidity ?? null,
            fertilization: a.fertilization ?? null,
            pruning: a.pruning ?? null,
            pests: a.pests ?? null,
            tips: Array.isArray(a.tips) ? a.tips : [],

            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            source: "advice.json",
        };

        const ref = db.collection("advice").doc(docId);
        writes.push((batch) => batch.set(ref, adviceDoc, { merge: true }));
    }

    await commitInChunks(writes, 500);

    console.log("Done ✅ Imported JSON to Firestore:", {
        plantsImported: plants.length,
        adviceImported: advice.length,
        writesTotal: writes.length,
        collections: ["plants", "advice"],
    });
}

run().catch((e) => {
    console.error("Import failed:", e);
    process.exit(1);
});
