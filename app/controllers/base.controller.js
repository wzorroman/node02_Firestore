import { db } from '../config/firebase.config.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc 
} from 'firebase/firestore';

export class BaseController {
  constructor(collectionName, validator) {
    this.collectionRef = collection(db, collectionName);
    this.validator = validator;
  }

  async create(data) {
    const { error } = this.validator(data);
    if (error) throw new Error(error.details[0].message);

    try {
      const result = await addDoc(this.collectionRef, data);
      return { id: result.id, ...data };
    } catch (error) {
      throw new Error(`Error al crear: ${error.message}`);
    }
  }

  async getAll() {
    try {
      const snapshot = await getDocs(this.collectionRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Error al obtener todos: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('No encontrado');
      }
    } catch (error) {
      throw new Error(`Error al obtener por ID: ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      const docRef = doc(this.collectionRef, id);
      await updateDoc(docRef, data);
      const updatedDocSnap = await getDoc(docRef);
      return { id, ...updatedDocSnap.data() };
    } catch (error) {
      throw new Error(`Error al actualizar: ${error.message}`);
    }
  }

  async patch(id, data) {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, data);
        const updatedDocSnap = await getDoc(docRef);
        return { id, ...updatedDocSnap.data() };
      } else {
        throw new Error('No encontrado');
      }
    } catch (error) {
      throw new Error(`Error al actualizar parcialmente: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      await deleteDoc(docRef);
      return { id };
    } catch (error) {
      throw new Error(`Error al eliminar: ${error.message}`);
    }
  }
}
