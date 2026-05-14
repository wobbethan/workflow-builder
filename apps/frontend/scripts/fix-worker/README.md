# Fix the worker issue

If a production build still emits an **avoid-nodes** web worker (content contains `avoidLib`), this script copies it to `aneWorker.js`, copies `libavoid.wasm` into `dist` assets, and injects `window.customAvoidRoutesRouterUrl` into `index.html`.

The avoid-nodes plugin is **not** part of this app anymore; the script **no-ops** when no matching worker or wasm source is found, so builds do not fail.
