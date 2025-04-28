import { access, unlink } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "node:path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

export const remove = async () => {
  const fileToDelete = join(currentDir, "files", "fileToRemove.txt");

  try {
    await access(fileToDelete, constants.F_OK);

    await unlink(fileToDelete);
  } catch {
    throw new Error("FS operation failed");
  }
};

remove();
