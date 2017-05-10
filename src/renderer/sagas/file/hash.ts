import * as crypto from 'crypto';
import * as fs from 'fs';

// get the hash of a file.
export function hashFile(fullpath: string): Promise<string>{
    return new Promise((resolve)=>{
        const hash = crypto.createHash('sha256');
        hash.once('readable', ()=>{
            const data = hash.read() as Buffer;
            resolve(data.toString('hex'));
        });
        const st = fs.createReadStream(fullpath);
        st.pipe(hash);
    });
}
