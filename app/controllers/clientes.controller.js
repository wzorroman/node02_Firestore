// controllers/clientes.controller.js
import { db } from '../config/firebase.config.js';
import { 
  collection, 
  addDoc, 
  getDocs,
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { validateCliente } from '../models/Cliente.js';


const clientesRef = collection(db, 'clientes');

export const createCliente = async (clienteData) => {
  const { error } = validateCliente(clienteData);
  if (error) throw new Error(error.details[0].message);  
  try {
    const result = await addDoc(clientesRef, clienteData);
    return { id: result.id, ...clienteData };
  } catch (error) {
    throw new Error(`Error creating client: ${error.message}`);
  }
};

export const getClientes = async () => {
  const snapshot = await getDocs(clientesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = doc(db, 'clientes', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const cliente = { id: docSnap.id, ...docSnap.data() };
      res.json(cliente);
    } else {
      console.log('Cliente no encontrado');
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateCliente = async (id, updateData) => {
  const docRef = doc(db, 'clientes', id);
  const { error } = validateCliente(updateData);
  if (error) throw new Error(error.details[0].message);
  
  await updateDoc(docRef, updateData);
  return { id, ...updateData };
};

export const patchCliente = async (id, updateData) => {
  try {
    const docRef = doc(db, 'clientes', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, updateData);
      const updatedDocSnap = await getDoc(docRef);
      return { id, ...updatedDocSnap.data() };
    } else {
      throw new Error("Cliente no encontrado");
    }
  } catch (error) {
    throw new Error(`Error al actualizar: ${error.message}`);
  }
};

export const deleteCliente = async (id) => {
  const docRef = doc(db, 'clientes', id);
  const docSnap = await getDoc(docRef);
  console.log(docSnap);

  await deleteDoc(docRef);

  return { id };
};
