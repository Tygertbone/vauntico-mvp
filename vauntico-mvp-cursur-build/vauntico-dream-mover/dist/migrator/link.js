import { execSync } from "child_process";
import path from "path";
export function createJunction(original, destRoot) {
    const target = path.join(destRoot, path.basename(original));
    execSync(`mklink /J "${original}" "${target}"`, { stdio: "inherit", shell: "cmd.exe" });
    return { original, target };
}
