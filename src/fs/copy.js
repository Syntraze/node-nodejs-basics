import { access, copyFile, mkdir, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const copy = async () => {
  const src = join(__dirname, "files");
  const dest = join(__dirname, "files_copy");

  try {
    await access(src, constants.F_OK);

    try {
      await access(dest, constants.F_OK);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw new Error("FS operation failed");
      }
    }

    await mkdir(dest);

    const files = await readdir(src);
    await Promise.all(
      files.map((file) => copyFile(join(src, file), join(dest, file)))
    );
  } catch {
    throw new Error("FS operation failed");
  }
};

copy();
