import { writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const create = async () => {
  const filePath = join(__dirname, "files", "fresh.txt");
  const content = "I am fresh and young";

  try {
    await writeFile(filePath, content, { flag: "wx" });
  } catch (error) {
    if (error.code === "EEXIST") {
      throw new Error("FS operation failed");
    }
    throw new Error(`Failed to create file: ${error.message}`);
  }
};

await create();
