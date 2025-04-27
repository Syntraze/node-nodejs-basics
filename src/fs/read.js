import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "node:path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

export const read = async () => {
  const filePath = join(currentDir, "files", "fileToRead.txt");

  try {
    // Check if file exists
    await access(filePath, constants.F_OK);

    // Read and print content
    const content = await readFile(filePath, { encoding: "utf8" });
    console.log(content);
  } catch {
    throw new Error("FS operation failed");
  }
};

read();
