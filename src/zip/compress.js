import { createGzip } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const compress = async () => {
  const gzip = createGzip();
  const source = createReadStream(
    join(__dirname, "files", "fileToCompress.txt")
  );
  const destination = createWriteStream(join(__dirname, "files", "archive.gz"));

  source.pipe(gzip).pipe(destination);
};

await compress();
