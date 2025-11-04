
# DigiTech‑Pro Script Generator (Electron + React)

- Electron + React (Vite) project
- Electron‑style UI with larger header title, Active status pill, Model/Angle/Creativity controls
- `assets/logo.png` wired to header
- CI workflow to build Windows `.exe` on GitHub Actions

## Run locally (optional)
npm ci
npm run dev

## Build `.exe` without any shell on your PC
1. Push to GitHub.
2. Add `GH_TOKEN` in Settings → Secrets → Actions.
3. Create a release tag `v1.0.0`.
4. Windows runner builds & uploads installer + portable `.exe` to Releases.
