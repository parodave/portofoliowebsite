# Portfolio

## Requirements

* Node.js **18** or higher
* `three` **0.150.x** with `@react-three/fiber` **8.x**, `@react-three/drei` **9.x`
  and `@react-three/rapier` **1.x** – newer major versions of these
  packages require React 19

After cloning the repository, install Git LFS and enable it:

```bash
./scripts/setup-git-lfs.sh
```

## Environment Variables

Copy `.env.example` to `.env` and populate your EmailJS configuration:

```bash
cp .env.example .env
```

## Development

* `npm run dev` to start the local server.
* `npm test` or `npx vitest` to run tests.
* `npm run build` to create a production build.


## Git LFS Setup

Install Git LFS before cloning so that the textures download properly. On macOS use:

```bash
brew install git-lfs
```

On Debian/Ubuntu use:

```bash
apt install git-lfs
```

After installing, run:

```bash
git lfs install
```

The textures in `public/textures/` are tracked with Git LFS and require LFS to pull successfully.
