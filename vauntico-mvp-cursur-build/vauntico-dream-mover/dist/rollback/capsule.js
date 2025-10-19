import fs from "fs-extra";
import path from "path";
export async function timeCapsule(src, capsuleRoot) {
    const dest = path.join(capsuleRoot, path.basename(src) + "." + Date.now());
    await fs.ensureDir(capsuleRoot);
    await fs.copy(src, dest, { overwrite: true });
    return dest;
}
export function removeJunction(targetPath) {
    try {
        fs.removeSync(targetPath);
    }
    catch { }
}
export async function restoreCapsule(originalPath, capsulePath) {
    try {
        await fs.remove(originalPath);
        await fs.copy(capsulePath, originalPath, { overwrite: true });
    }
    catch { }
}
