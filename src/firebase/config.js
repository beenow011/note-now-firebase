import { initializeApp } from "firebase/app";
// import { getDatabase , ref, set, onValue  } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc,getDocs  } from "firebase/firestore"; 

import conf from "../conf/conf";
const currentDate = new Date();
export class Services{
    app;
    db;
    constructor() {
        this.app = initializeApp(conf);
        this.db = getFirestore(this.app);
        
     }

     async createPost (uId,{title,color,description}){
        try{
           
            const docRef = await addDoc(collection(this.db, "users"), {
                uId,
                title,
                color,
                description,
                date:`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
              });
              return docRef;
        }catch(error){
            throw error;
        }
     }
     async getAllPosts(){
        try{
            const querySnapshot = await getDocs(collection(this.db, "users"));
            return querySnapshot;
        }
        catch(error){
            throw error;
        }
     }
    }

const service = new Services();
export default service;