import fs from "fs";
import path from "path";
import yaml from "js-yaml";
export function loadPlan(path) {
    const doc = yaml.load(fs.readFileSync(path, "utf8"));
    return doc;
}
export function simulate(plan, report) {
    const actions = [];
    let totalFree = 0;
    for (const rule of plan.rules) {
        for (const item of report.items) {
            const min = (rule.match?.sizeMinMB ?? 0) * 1_000_000;
            const matchPath = (rule.match?.paths ?? []).some(p => item.path.toLowerCase().startsWith(p.toLowerCase())) ||
                (rule.match?.patterns ?? []).some(p => item.path.toLowerCase().includes(p.toLowerCase()));
            if (matchPath && item.sizeBytes >= min) {
                if (rule.action.type === 'rehome_app' && item.type && item.type !== 'folder') {
                    continue; // only rehome directories
                }
                const actionPayload = { rule: rule.name, item: item.path, to: rule.action.destination, type: rule.action.type };
                if (rule.action.verify) {
                    actionPayload.verify = rule.action.verify;
                }
                // Attach action options consistently (applies to all action types)
                const opts = {};
                if (rule.action.dryRun === true)
                    opts.dryRun = true;
                if (rule.action.type === 'rehome_app') {
                    if (rule.action.updateShortcuts === true)
                        opts.updateShortcuts = true;
                    if (rule.action.updateServices === true)
                        opts.updateServices = true;
                }
                if (Object.keys(opts).length)
                    actionPayload.options = opts;
                actions.push(actionPayload);
                totalFree += item.sizeBytes;
            }
        }
    }
    return { actions, estimatedSpaceFreedBytes: totalFree };
}
export function saveManifest(sim, outPath) {
    const manifest = {
        generatedAt: new Date().toISOString(),
        estimatedSpaceFreedBytes: sim.estimatedSpaceFreedBytes,
        items: sim.actions.map(a => ({
            rule: a.rule,
            itemPath: a.item,
            actionType: a.type,
            destination: a.to,
            verifyMode: a.verify,
            actionOptions: a.options
        }))
    };
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
    return outPath;
}
