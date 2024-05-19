import firestore from '@react-native-firebase/firestore';
import { FIREBASE_COLLECTION } from '../../Constants/collections';

export const getJobRoles = async () => {
    return new Promise(async (resolve, reject) => {
        return firestore().collection(FIREBASE_COLLECTION.META_DATA).get()
        .then((res) => {
            let resultedArray=[];
            res?._docs.forEach(item => {
                resultedArray.push({...item._data, id: item.id});
            });
            resolve({ data: resultedArray, error: false })
        })
        .catch((e) => {
            console.log(e,'mk')
            reject({ data: e, error: true });
        })
    });
}