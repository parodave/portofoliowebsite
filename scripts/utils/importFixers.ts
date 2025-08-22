
export function removeThreeImports(content: string): string {
  return content.replace(/^import.*from ['"]three\/(?:webgpu|tsl)['"];?\n?/gm, '')
}

export function rewriteFrameTickerImports(content: string): string {
  return content.replace(
    /import\s+(\w+)\s+from\s+['"]frame-ticker['"]/g,
    (_match, identifier) => `import { FrameTicker as ${identifier} } from "frame-ticker"`,
  )
}
