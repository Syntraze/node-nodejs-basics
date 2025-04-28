export const parseArgs = () => {
  const args = process.argv.slice(2);

  const parsedArgs = [];

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    const value = args[i + 1];

    if (key.startsWith("--") && value !== undefined) {
      const propName = key.slice(2);
      parsedArgs.push(`${propName} is ${value}`);
    }
  }

  console.log(parsedArgs.join(", "));
};

parseArgs();
