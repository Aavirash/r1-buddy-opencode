# r1-buddy-opencode

Matrix-green buddy pet for your Rabbit R1, displaying OpenCode CLI session state in real time.

## Deployed
- **URL**: https://aavirash.github.io/r1-buddy-opencode/
- **Install on R1**: Open the URL or scan the QR from `install.html`

## Features
- 18 ASCII species (capybara, duck, mushroom, rabbit, turtle, owl, ghost, octopus, dragon, cactus, robot, penguin, cat, blob, axolotl, goose, snail, chonk)
- 7 states mapped from OpenCode: sleep/disconnected, idle, busy/running, attention/permission, celebrate, dizzy/error, heart
- Matrix green theme (#00FF41)
- R1 native controls: scroll to cycle species, sideClick for stats, hold to re-scan

## How it works
```
OpenCode CLI ──plugin POST──→ R1 Control (:9876/buddy/state)
                                    ↕ GET /buddy/state
                              R1 buddy polls every 3s
```

## Install plugin
Place `opencode-plugin.js` in `~/.config/opencode/plugins/` or `.opencode/plugins/`

## Files
- `index.html` — the R1 Creation (single-file web app)
- `install.html` — QR install page for R1
- `opencode-plugin.js` — OpenCode plugin to POST session state