import { initializeApp } from 'firebase/app';
import { getAuth , createUserWithEmailAndPassword  ,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import conf from "../conf/conf"




  export class AuthService{
    app;
    analytics;
    auth;
    constructor() {
       this.app = initializeApp(conf);
        this.analytics = getAnalytics(this.app); 
        this.auth = getAuth(this.app);     
    }

    async createUser({email,password}){
        try {
            const userAccount = await createUserWithEmailAndPassword(this.auth, email, password)
            if(userAccount){
                return this.loginUser({email,password});
            }
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async loginUser({email,password}){
        try{
            const userAccount = await signInWithEmailAndPassword(this.auth,email,password);
            return userAccount;
        }catch(error){
            throw error;
        }
    }
    async logoutUser(){
        try{
            return signOut(this.auth)
        }catch(error){
            throw error;
        }
    }
  }

  const authService = new AuthService();

  export default authService