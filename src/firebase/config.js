import { initializeApp } from "firebase/app";
// import { getDatabase , ref, set, onValue  } from "firebase/database";
import { deleteDoc, getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

import conf from "../conf/conf";
const currentDate = new Date();
export class Services {
    app;
    db;
    constructor() {
        this.app = initializeApp(conf);
        this.db = getFirestore(this.app);

    }

    async createPost(uId, { title, color, description }) {
        try {

            const docRef = await addDoc(collection(this.db, "users"), {
                uId,
                title,
                color,
                description, notes: "", keypoints: "",
                date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
            });
            return docRef;
        } catch (error) {
            throw error;
        }
    }
    async createLib(uId, { libName, notesId }) {
        try {

            const docRef = await addDoc(collection(this.db, "lib"), {
                uId,
                libName,
                notesId
            });
            return docRef;
        } catch (error) {
            throw error;
        }
    }
    async getAllPosts() {
        try {
            const querySnapshot = await getDocs(collection(this.db, "users"));
            return querySnapshot;
        }
        catch (error) {
            throw error;
        }
    }

    async updateNotes(id, { notes, keypoints }) {
        try {
            console.log(notes, keypoints)
            const userDocRef = doc(this.db, "users", id);
            return await updateDoc(userDocRef, {
                notes,
                keypoints,
            });
        } catch (error) {
            throw error;
        }
    }
    async deleteNotes(id) {
        try {
            const userDocRef = doc(this.db, "users", id);

            // Use deleteDoc and await the promise
            await deleteDoc(userDocRef);

            return true;
        } catch (error) {
            throw error;
        }
    }

}

const service = new Services();
export default service;