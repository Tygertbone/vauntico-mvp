import fs from 'fs';
import path from 'path';
export function calcNps(scores) {
    if (!scores.length)
        return 0;
    let det = 0, pass = 0, pro = 0;
    for (const s of scores) {
        if (s <= 6)
            det++;
        else if (s <= 8)
            pass++;
        else
            pro++;
    }
    const total = scores.length;
    const pctPro = (pro / total) * 100;
    const pctDet = (det / total) * 100;
    return Math.round(pctPro - pctDet);
}
export function postRiteSurvey(riteId, score, logsDir = 'logs') {
    const outPath = path.join(logsDir, 'feedback-loops.json');
    fs.mkdirSync(logsDir, { recursive: true });
    let current = { entries: [], avg: 0, nps: 0 };
    if (fs.existsSync(outPath)) {
        try {
            current = JSON.parse(fs.readFileSync(outPath, 'utf8'));
            if (!Array.isArray(current.entries))
                current.entries = [];
        }
        catch {
            current = { entries: [], avg: 0, nps: 0 };
        }
    }
    const entry = { riteId, score, at: new Date().toISOString() };
    current.entries.push(entry);
    const scores = current.entries.map(e => e.score);
    const avg = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
    current.avg = Math.round(avg * 100) / 100;
    current.nps = calcNps(scores);
    fs.writeFileSync(outPath, JSON.stringify(current, null, 2));
    return current;
}
