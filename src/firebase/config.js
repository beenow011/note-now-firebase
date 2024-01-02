import { initializeApp } from "firebase/app";
import { getDatabase , ref, set } from "firebase/database";
import conf from "../conf/conf";

export class Services{
    app;
    database;
    constructor() {
        this.app = initializeApp(conf);
        this.database = getDatabase(this.app);  
     }

     async createPost ({userId,title,color,description}){
        try{
            await set(ref(this.database, 'users/' + userId), {
                title,
                color,
                color ,
                description
              });
        }catch(error){
            throw error;
        }
     }
    }

const service = new Services();
export default service;