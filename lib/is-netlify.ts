export function isNetlifyRuntime() {
  return process.env.NETLIFY === "true";
}
