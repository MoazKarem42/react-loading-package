import fs from "fs";
import path from "path";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const runtimeDeps = Object.keys(pkg.dependencies || {});

console.log("--- Package Health Check ---");
console.log(
  "Runtime Dependencies:",
  runtimeDeps.length === 0
    ? "PASS (0 deps)"
    : `FAIL (${runtimeDeps.join(", ")})`,
);

const distDir = path.resolve("dist");
if (!fs.existsSync(distDir)) {
  console.log("Dist Check: FAIL (dist/ folder missing - run npm run build)");
  process.exit(1);
}

for (const file of fs.readdirSync(distDir)) {
  const stats = fs.statSync(path.join(distDir, file));
  if (stats.isFile()) {
    console.log(`- ${file}: ${(stats.size / 1024).toFixed(2)} KB`);
  }
}
