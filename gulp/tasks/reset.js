import fs from "node:fs/promises";
import path from "node:path";

export const reset = async () => {
  const buildDir = path.resolve(process.cwd(), app.path.buildFolder.replace(/^\.\//, ""));
  try {
    await fs.rm(buildDir, {
      recursive: true,
      force: true,
      maxRetries: 10,
      retryDelay: 150,
    });
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
};
