import fs from 'fs';
import path from 'path';
export function multiRegionDeploy(region = 'za', logsDir = 'logs') {
    fs.mkdirSync(logsDir, { recursive: true });
    const envPath = path.join(logsDir, 'vercel-env.json');
    const env = {
        DM_BETA: true,
        REGION_PRIMARY: region.toUpperCase(),
        REGIONS: ['ZA', 'US']
    };
    try {
        fs.writeFileSync(envPath, JSON.stringify(env, null, 2));
    }
    catch { }
    // Mock metrics: slightly better cold start in primary region
    const cold = region === 'za' ? 120 : 150;
    const metricsPath = path.join(logsDir, 'scale-elev.json');
    const metrics = {
        regions: 2,
        coldStartMs: cold,
        estCostZar: 120 // stub monthly ZAR
    };
    fs.writeFileSync(metricsPath, JSON.stringify({ region, metrics }, null, 2));
    return { region, envPath, metricsPath, metrics };
}
// Phase 19: "Live" scale (ngrok + vercel stub) — no external network, but marks DM_SCALE and writes a separate log
export function realNgrokVercel(region = 'za', logsDir = 'logs') {
    fs.mkdirSync(logsDir, { recursive: true });
    const outPath = path.join(logsDir, 'scale-live.json');
    const link = `https://ngrok.local/scale/${region}/${Date.now().toString(36)}`;
    const vercel = `https://vercel.local/${region}/deploy/${Date.now().toString(36)}`;
    const payload = {
        DM_SCALE: true,
        region,
        link,
        vercel,
        currency: 'ZAR',
        estCostZar: region === 'za' ? 150 : 200,
        at: new Date().toISOString()
    };
    fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
    return { out: outPath, link, vercel };
}
