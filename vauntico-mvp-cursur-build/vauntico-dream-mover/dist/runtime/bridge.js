import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';
import { hashFolder } from '../verify/hash.js';
import { relocatePath } from '../migrator/relocate.js';
import { createJunction } from '../migrator/link.js';
export class NodeFsDriver {
    async simulateMove(src, dstRoot) {
        const exists = fs.existsSync(src);
        let sizeBytes = 0;
        if (exists) {
            const stat = fs.statSync(src);
            if (stat.isDirectory()) {
                // quick folder size approximation by summing immediate children
                const files = fs.readdirSync(src);
                for (const f of files.slice(0, 50)) {
                    const p = path.join(src, f);
                    try {
                        sizeBytes += fs.statSync(p).size;
                    }
                    catch { /* noop */ }
                }
            }
            else {
                sizeBytes = stat.size;
            }
        }
        return { exists, sizeBytes };
    }
    async relocate(src, dstRoot) {
        await relocatePath(src, dstRoot);
    }
    async createLink(src, dstRoot) {
        // Create OS-appropriate link from src to dstRoot
        if (process.platform === 'win32') {
            createJunction(src, dstRoot);
        }
        else {
            const target = path.join(dstRoot, path.basename(src));
            fse.ensureDirSync(dstRoot);
            try {
                fs.rmSync(src, { recursive: true, force: true });
            }
            catch { }
            fs.symlinkSync(target, src, 'dir');
        }
    }
    async verifyHash(p, mode) {
        if (!fs.existsSync(p) || !fs.statSync(p).isDirectory())
            return '';
        if (mode === 'none')
            return '';
        if (mode === 'sample') {
            const { hashFolderSample } = await import('../verify/hash.js');
            return hashFolderSample(p);
        }
        return hashFolder(p);
    }
    async verifyPermissions(p, kind = ['read', 'write']) {
        const hurdles = [];
        try {
            fs.accessSync(p, fs.constants.R_OK);
        }
        catch {
            if (kind.includes('read'))
                hurdles.push('read');
        }
        try {
            fs.accessSync(p, fs.constants.W_OK);
        }
        catch {
            if (kind.includes('write'))
                hurdles.push('write');
        }
        // exec is non-essential here; stub
        return { granted: hurdles.length === 0, hurdles };
    }
}
export const getDriver = () => new NodeFsDriver();
