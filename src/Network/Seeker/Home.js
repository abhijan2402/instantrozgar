import firestore, {Filter} from '@react-native-firebase/firestore';
import { FIREBASE_COLLECTION } from '../../Constants/collections';

export const getAllJobs = async (user) => {
    return new Promise(async (resolve, reject) => {
        return firestore().collection(FIREBASE_COLLECTION.JOBS).get()
        .then((res) => {
            let resultedArray=[];
            res?._docs.forEach(item => {
                resultedArray.push({...item.data(), id: item.id});
            });
            const filteredJobs = resultedArray.filter(job => 
                user?.jobRoles.some(role => job.jobRole.includes(role))
            );
            // filteredJobs?.forEach((item)=>console.log(item.jobRole,'m'))
            resolve({ data: filteredJobs, error: false })
        })
        .catch((e) => {
            console.log(e,'mk')
            reject({ data: e, error: true });
        })
    });
};