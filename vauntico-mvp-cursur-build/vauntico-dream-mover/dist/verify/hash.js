import fs from "fs";
import crypto from "crypto";
export function sha256File(p) {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(p);
    return new Promise((resolve, reject) => {
        stream.on("data", d => hash.update(d));
        stream.on("error", reject);
        stream.on("end", () => resolve(hash.digest("hex")));
    });
}
export async function hashFolder(p) {
    const hashes = [];
    const entries = fs.readdirSync(p);
    for (const e of entries) {
        const full = `${p}/${e}`;
        const stat = fs.statSync(full);
        if (stat.isFile())
            hashes.push(await sha256File(full));
        if (stat.isDirectory())
            hashes.push(await hashFolder(full));
    }
    return crypto.createHash("sha256").update(hashes.join("|")).digest("hex");
}
// Sampled hashing: hash a subset for faster verification
export async function hashFolderSample(p) {
    const entries = fs.readdirSync(p);
    const take = entries.slice(0, Math.max(1, Math.floor(entries.length / 10)));
    const parts = [];
    for (const e of take) {
        const full = `${p}/${e}`;
        const stat = fs.statSync(full);
        if (stat.isFile())
            parts.push(await sha256File(full));
    }
    return crypto.createHash('sha256').update(parts.join('|')).digest('hex');
}
