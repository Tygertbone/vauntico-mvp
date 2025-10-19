import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
const schemaPath = path.resolve(path.dirname(new URL(import.meta.url).pathname), 'plan.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);
export function validatePlan(plan) {
    const ok = validate(plan);
    if (ok)
        return { ok: true, errors: [] };
    const errors = (validate.errors || []).map(e => `${e.instancePath || 'plan'} ${e.message}`);
    return { ok: false, errors };
}
