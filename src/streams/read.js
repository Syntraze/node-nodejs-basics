import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const read = async () => {
  const readableStream = createReadStream(
    join(__dirname, "files", "fileToRead.txt")
  );
  readableStream.pipe(stdout);
};

await read();
