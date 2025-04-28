import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const calculateHash = async () => {
  const hash = createHash("sha256");

  await pipeline(
    createReadStream(join(__dirname, "files", "fileToCalculateHashFor.txt")),
    async function* (source) {
      for await (const chunk of source) {
        hash.update(chunk);
      }
    }
  );

  const finalHash = hash.digest("hex");
  console.log(finalHash);
};

await calculateHash();
