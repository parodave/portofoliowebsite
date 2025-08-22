import fs from 'fs'
import path from 'path'

const filePath = path.resolve('node_modules/three-globe/dist/three-globe.mjs')

try {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filePath} not found, skipping.`)
    process.exit(0)
  }
  const content = fs.readFileSync(filePath, 'utf8')
  const updated = content.replace(
    /import\s+FrameTicker\s+from\s+['"]frame-ticker['"]/g,
    'import { FrameTicker } from "frame-ticker"',
  )
  if (updated !== content) {
    fs.writeFileSync(filePath, updated)
    console.log(`✅ Updated FrameTicker import in ${path.relative(process.cwd(), filePath)}`)
  } else {
    console.log('ℹ️  No default FrameTicker import found.')
  }
} catch (err) {
  console.error('❌ Failed to apply final FrameTicker fix:', err)
  process.exit(1)
}
