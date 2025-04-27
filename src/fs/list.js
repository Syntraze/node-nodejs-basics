import { access, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "node:path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

export const list = async () => {
  const filesFolder = join(currentDir, "files");

  try {
    // Check if 'files' folder exists
    await access(filesFolder, constants.F_OK);

    // Read all filenames
    const filenames = await readdir(filesFolder);

    // Print filenames
    console.log(filenames);
  } catch {
    throw new Error("FS operation failed");
  }
};

list();
