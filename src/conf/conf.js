const conf = {
    apiKey: String(import.meta.env.VITE_FIREBASE_APIKEY),
    authDomain: String(import.meta.env.VITE_FIREBASE_authDomain),
    projectId:String(import.meta.env.VITE_FIREBASE_projectId),
    storageBucket: String(import.meta.env.VITE_FIREBASE_storageBucket),
    messagingSenderId: String(import.meta.env.VITE_FIREBASE_messagingSenderId),
    appId: String(import.meta.env.VITE_FIREBASE_appId),
    measurementId: String(import.meta.env.VITE_FIREBASE_measurementId)
}
export default conf