import fs from 'fs';
import path from 'path';
export function pairLoreLight(riteName, plainText, logsDir = 'logs') {
    const lore = `Lore: ${riteName}`;
    const light = `Light: ${plainText}`;
    const whyTeach = 'Why: Revert‑ready teaching improves confidence and adoption.';
    const out = { tooltip: { lore, light, whyTeach } };
    fs.mkdirSync(logsDir, { recursive: true });
    const logPath = path.join(logsDir, 'translation-diadem.json');
    let arr = [];
    if (fs.existsSync(logPath)) {
        try {
            arr = JSON.parse(fs.readFileSync(logPath, 'utf8'));
        }
        catch { }
    }
    arr.push(out);
    fs.writeFileSync(logPath, JSON.stringify(arr, null, 2));
    return out;
}
