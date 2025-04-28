import { access, rename } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "node:path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

export const rename = async () => {
  const sourceFilePath = join(currentDir, "files", "wrongFilename.txt");
  const targetFilePath = join(currentDir, "files", "properFilename.md");

  try {

    await access(sourceFilePath, constants.F_OK);

    try {
      await access(targetFilePath, constants.F_OK);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw new Error("FS operation failed");
      }
    }

  
    await rename(sourceFilePath, targetFilePath);
  } catch {
    throw new Error("FS operation failed");
  }
};

rename();
