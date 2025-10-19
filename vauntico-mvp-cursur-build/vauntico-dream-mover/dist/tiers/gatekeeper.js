import fs from 'fs';
import path from 'path';
const PROFILE_PATH = path.join('vauntico-dream-mover', 'logs', 'tier-profile.json');
export function readTierProfile() {
    try {
        const raw = JSON.parse(fs.readFileSync(PROFILE_PATH, 'utf8'));
        return raw;
    }
    catch {
        return { level: 'Seeker', limits: { ritualsDay: 5, aiRisks: false, certified: false }, counters: { date: new Date().toISOString().slice(0, 10), ritualsToday: 0 } };
    }
}
export function writeTierProfile(p) {
    fs.mkdirSync(path.dirname(PROFILE_PATH), { recursive: true });
    fs.writeFileSync(PROFILE_PATH, JSON.stringify(p, null, 2));
}
export function checkTier(userId) {
    // userId is stubbed; in future, fetch from server
    const prof = readTierProfile();
    return prof;
}
export function recordRitual() {
    const today = new Date().toISOString().slice(0, 10);
    const prof = readTierProfile();
    if (prof.counters.date !== today) {
        prof.counters.date = today;
        prof.counters.ritualsToday = 0;
    }
    const cap = prof.limits.ritualsDay === 'infinite' ? Infinity : Number(prof.limits.ritualsDay || 0);
    if (prof.counters.ritualsToday >= cap) {
        return { allowed: false, profile: prof };
    }
    prof.counters.ritualsToday += 1;
    writeTierProfile(prof);
    return { allowed: true, profile: prof };
}
export function upgradeToPractitioner(email) {
    const prof = readTierProfile();
    prof.level = 'Practitioner';
    prof.limits = { ritualsDay: 'infinite', aiRisks: true, certified: prof.limits.certified };
    writeTierProfile(prof);
    return prof;
}
