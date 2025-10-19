import fs from 'fs';
export function generateSLA(opts) {
    const hdr = `org: ${opts.org}\n`;
    const soc = opts.soc2 ? 'soc2: true\n' : '';
    const up = `uptime: ${opts.uptime}\n`;
    return hdr + soc + up;
}
export function writeSLA(outPath, yaml) {
    const dir = outPath.split(/[\\/]/).slice(0, -1).join('/');
    try {
        fs.mkdirSync(dir, { recursive: true });
    }
    catch { }
    fs.writeFileSync(outPath, yaml, 'utf8');
}
