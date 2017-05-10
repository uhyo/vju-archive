// random id
import * as crypto from 'crypto';

const RANDOM_ID_BYTES = 16;
// generate a random id;
export function randomId(): Promise<string>{
    return new Promise((resolve, reject)=>{
        crypto.randomBytes(RANDOM_ID_BYTES, (err, buf)=>{
            if (err != null){
                reject(err);
            }else{
                resolve(buf.toString('hex'));
            }
        });
    });
}
