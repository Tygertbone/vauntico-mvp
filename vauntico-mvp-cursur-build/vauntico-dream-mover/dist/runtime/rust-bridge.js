// rust-bridge.ts: Optional Rust core POC loader (Phase 4)
// Safe fallback: if native lib missing, exports a stub driver-like API.
export async function getRustDriver() {
    // Feature flag gate: require DM_USE_RUST=true and DM_RUST_LIB set to attempt native
    const useRust = process.env.DM_USE_RUST === 'true';
    if (!useRust) {
        return {
            available: false,
            async relocate() { }, async createLink() { }, async verifyHash() { return ''; }, async verifyPermissions() { return { granted: false, hurdles: ['rust-disabled'] }; }
        };
    }
    try {
        // POC: check env for native lib path; do not actually load non-existent lib
        const lib = process.env.DM_RUST_LIB;
        if (!lib)
            throw new Error('No DM_RUST_LIB set');
        // In a future iteration, dlopen the library via node-ffi/napi/neon binding
        return {
            available: true,
            async relocate() { },
            async createLink() { },
            async verifyHash() { return ''; },
            async verifyPermissions() { return { granted: true, hurdles: [] }; },
        };
    }
    catch {
        return {
            available: false,
            async relocate() { },
            async createLink() { },
            async verifyHash() { return ''; },
            async verifyPermissions() { return { granted: false, hurdles: ['rust-core-missing'] }; },
        };
    }
}
