import fs from 'fs';
import path from 'path';
// Simulated Paystack verification: if DM_LIVE=true and PAYSTACK_SECRET is present, we pretend to verify.
// We still do not call any external networks in OSS build; everything is logged locally.
export function verifyPaystack(key, amountZar) {
    const live = process.env.DM_LIVE === 'true';
    const hasSecret = !!process.env.PAYSTACK_SECRET;
    // For now, treat having both flags as a green light; otherwise fallback to mock.
    const verified = live && hasSecret ? amountZar >= 6 : amountZar >= 6;
    return { verified, amountZar };
}
export function webhookLive(event, key, amountZar = 6, logsDir = 'logs') {
    const { verified } = verifyPaystack(key, amountZar);
    const before = 'Seeker';
    const after = verified ? 'Practitioner' : before;
    const flip = {
        event,
        key: key ? `${key.slice(0, 4)}…` : 'mock',
        tierBefore: before,
        tierAfter: after,
        amountZar,
        recurringUsd: 99,
        verified,
        at: new Date().toISOString()
    };
    fs.mkdirSync(logsDir, { recursive: true });
    const outPath = path.join(logsDir, 'live-flip.json');
    fs.writeFileSync(outPath, JSON.stringify(flip, null, 2));
    // Also mirror tier profile when flipped
    if (verified) {
        const tierOut = path.join(logsDir, 'tier-profile.json');
        const profile = { level: after, currency: 'ZAR', monthly: amountZar, region: 'ZA' };
        try {
            fs.writeFileSync(tierOut, JSON.stringify(profile, null, 2));
        }
        catch { }
    }
    return flip;
}
