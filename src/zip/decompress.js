import { createUnzip } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const decompress = async () => {
  const unzip = createUnzip();
  const source = createReadStream(join(__dirname, "files", "archive.gz"));
  const destination = createWriteStream(
    join(__dirname, "files", "fileToDecompress.txt")
  );

  source.pipe(unzip).pipe(destination);
};

await decompress();
