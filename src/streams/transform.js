import { Transform } from "node:stream";
import { stdin, stdout } from "node:process";

export const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split("").reverse().join("");
      callback(null, reversed);
    },
  });

  stdin.pipe(reverseStream).pipe(stdout);
};

await transform();
