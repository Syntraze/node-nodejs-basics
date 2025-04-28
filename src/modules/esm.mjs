import path from "node:path";
import { release, version } from "node:os";
import { createServer as createServerHttp } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import "./files/c.js";

// Emulate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const random = Math.random();

let unknownObject;

const loadJson = async (filePath) => {
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const main = async () => {
  if (random > 0.5) {
    unknownObject = await loadJson(join(__dirname, "files", "a.json"));
  } else {
    unknownObject = await loadJson(join(__dirname, "files", "b.json"));
  }

  console.log(`Release ${release()}`);
  console.log(`Version ${version()}`);
  console.log(`Path segment separator is "${path.sep}"`);

  console.log(`Path to current file is ${__filename}`);
  console.log(`Path to current directory is ${__dirname}`);

  console.log(unknownObject);

  const myServer = createServerHttp((_, res) => {
    res.end("Request accepted");
  });

  const PORT = 3000;

  myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log("To terminate it, use Ctrl+C combination");
  });

  // Export at the end
  return { unknownObject, myServer };
};

const { unknownObject: exportedUnknownObject, myServer: exportedMyServer } =
  await main();

export { exportedUnknownObject as unknownObject, exportedMyServer as myServer };
