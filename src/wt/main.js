import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { cpus } from "node:os";
import { dirname, join } from "node:path";

export const performCalculations = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const cpuCount = cpus().length;
  let number = 10;

  const workersResults = await Promise.all(
    Array.from({ length: cpuCount }, () => {
      return new Promise((resolve) => {
        const worker = new Worker(join(__dirname, "worker.js"));

        worker.postMessage(number++);

        worker.on("message", (result) => {
          resolve({ status: "resolved", data: result });
        });

        worker.on("error", () => {
          resolve({ status: "error", data: null });
        });

        worker.on("exit", (code) => {
          if (code !== 0) {
            resolve({ status: "error", data: null });
          }
        });
      });
    })
  );

  console.log(workersResults);
  return workersResults;
};

await performCalculations();
