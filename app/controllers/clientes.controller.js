// controllers/clientes.controller.js
import { db } from '../config/firebase.config.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { validateCliente } from '../models/Cliente.js';

const clientesRef = collection(db, 'clientes');

export const createCliente = async (clienteData) => {
  const { error } = validateCliente(clienteData);
  if (error) throw new Error(error.details[0].message);
  
  return await addDoc(clientesRef, clienteData);
};

export const getClientes = async () => {
  const snapshot = await getDocs(clientesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateCliente = async (id, updateData) => {
  const docRef = doc(db, 'clientes', id);
  const { error } = validateCliente(updateData);
  if (error) throw new Error(error.details[0].message);
  
  await updateDoc(docRef, updateData);
  return { id, ...updateData };
};

export const deleteCliente = async (id) => {
  const docRef = doc(db, 'clientes', id);
  await deleteDoc(docRef);
  return { id };
};
