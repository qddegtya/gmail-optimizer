#!/usr/env/bin node

const Piscina = require("piscina");
const { glob } = require("glob");
const path = require("node:path");
const fsp = require("fs").promises;
const process = require("process");

(async function () {
  const piscina = new Piscina({
    filename: path.resolve(__dirname, "clean-thread-worker.js"),
  });

  const threadFiles = await glob("**/thread-*", { ignore: "node_modules/**" });

  for (threadFile of threadFiles) {
    const fileContent = await fsp.readFile(
      path.join(process.cwd(), threadFile),
      "utf-8"
    );
    const threads = Array.from(fileContent.split(","));

    console.log(`Multi workers started ...`);
    await Promise.all(
      threads.map((threadId) => {
        return piscina.runTask({ threadId });
      })
    );
    console.log(`Multi workers finished.`);
  }
})();
