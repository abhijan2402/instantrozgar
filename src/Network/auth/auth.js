import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FIREBASE_COLLECTION } from '../../Constants/collections';

// create accouunt api
export const createNewUser=async(email,password)=>{
    let userObj;
    return new Promise(async(resolve,reject)=>{
        return auth().createUserWithEmailAndPassword(email,password)
        .then(async (userCredential) => {
            console.log(userCredential,"Credencials");
            userObj=userCredential;
            await auth().currentUser.sendEmailVerification();
            await auth().signOut();
            resolve({ data: userObj, error: false });
        })
        .catch((e)=>{
            reject({data:e,error:true})
        })
    });
}

// register user api
export const registerNewUser = async (uid,data) => {
    return new Promise(async (resolve, reject) => {
        return firestore().collection(FIREBASE_COLLECTION.SEEKER).doc(uid).set(data)  
        .then((res) => {
            console.log(res,'Fes');
            resolve({ data: res, error: false })
        })
        .catch((e) => {
            reject({ data: e, error: true });
        })
    });
}

// login api 
export const loginUser=async(email,password)=>{
    return new Promise(async(resolve,reject)=>{
        return auth().signInWithEmailAndPassword(email,password)
        .then((res) => {
            resolve({data:res,error:false})
        })
        .catch((e)=>{
            reject({data:e,error:true});
        })
    });
}

//updaye user
export const updateUser=async(uid,data)=>{
    return new Promise(async(resolve,reject)=>{
        return firestore().collection(FIREBASE_COLLECTION.SEEKER).doc(uid).update(data)  
        .then((res) => {
            console.log(res,'Fes');
            resolve({ data: res, error: false })
        })
        .catch((e) => {
            reject({ data: e, error: true });
        })
    });
}

// logout user
export const logout=async()=>{
    await auth().signOut();
}