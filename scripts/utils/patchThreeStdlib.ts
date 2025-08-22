import fs from 'fs'
import path from 'path'

export function patchThreeStdlib() {
  console.log('🛠️  Patching three-stdlib exports...')
  const pkgPath = path.resolve('node_modules/three-stdlib/package.json')
  if (!fs.existsSync(pkgPath)) {
    console.warn('⚠️  three-stdlib package.json not found.')
    return
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as Record<string, unknown>
  pkg.exports = {
    '.': { import: './index.js', require: './index.js' },
    './*': { import: './*.js', require: './*.js' },
  }
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  console.log('✅ Patched three-stdlib package.json.')
}
