import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Carga de clave
const serviceAccount = JSON.parse(
  readFileSync(new URL("./keys/neokey.json", import.meta.url))
);

// Inicialización
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// Consulta a Firestore
const querySnapshot = await db.collectionGroup('clientes').get();
querySnapshot.forEach((doc) => {
  console.log(doc.id, ' => ', doc.data());
});
