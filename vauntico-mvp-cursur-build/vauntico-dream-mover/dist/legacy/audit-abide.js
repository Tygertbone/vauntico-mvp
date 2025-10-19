import fs from 'fs';
import path from 'path';
export function soc2Immutable(riteId, controls = ['encryption', 'retention'], consent = true, logsDir = 'logs') {
    fs.mkdirSync(logsDir, { recursive: true });
    const auditPath = path.join(logsDir, 'eternal-audit.json');
    let arr = [];
    if (fs.existsSync(auditPath)) {
        try {
            arr = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
        }
        catch { }
    }
    const rec = {
        riteId,
        timestamp: new Date().toISOString(),
        consent: !!consent,
        SOC2: { controls: Array.from(new Set(controls)) }
    };
    arr.push(rec);
    fs.writeFileSync(auditPath, JSON.stringify(arr, null, 2));
    return rec;
}
