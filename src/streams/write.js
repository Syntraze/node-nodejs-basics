import { createWriteStream } from "node:fs";
import { stdin } from "node:process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const write = async () => {
  const writableStream = createWriteStream(
    join(__dirname, "files", "fileToWrite.txt")
  );
  stdin.pipe(writableStream);
};

await write();
