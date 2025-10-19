import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
const dict = {
    en: {
        lang: 'English',
        safe_move: 'Safe move',
        link: 'Link',
        verify: 'Verify hash',
        dry_run: 'Dry-run rehearsal'
    },
    af: {
        lang: 'Afrikaans',
        safe_move: 'Veilige skuif',
        link: 'Skakel',
        verify: 'Verifieer hash',
        dry_run: 'Proelopie (droë)'
    }
};
export function i18nWeave(planPath, lang = 'en', outPath) {
    const d = dict[lang] || dict.en;
    const abs = path.resolve(process.cwd(), planPath);
    const data = yaml.load(fs.readFileSync(abs, 'utf8'));
    const augmented = {
        ...data,
        i18n: {
            lang,
            terms: d
        }
    };
    const out = outPath || (() => {
        const dir = path.dirname(abs);
        const base = path.basename(abs).replace(/\.ya?ml$/i, '');
        return path.join(dir, `${base}.${lang}.yml`);
    })();
    const y = yaml.dump(augmented, { lineWidth: 100 });
    fs.writeFileSync(out, y, 'utf8');
    return { out, lang };
}
