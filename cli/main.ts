import * as fs from "fs";
import * as util from "util";
import touch from "./touch";
import cat from "./cat";
import rm from "./rm";

const command = process.argv[2];
const path = process.argv[3];

if (command && path) {
  switch (command) {
    case "touch":
      touch(path);
      break;
    case "cat":
      cat(path);
      break;
    case "rm":
      rm(path);
      break;
    default: {
      console.error(`Command not found: ${command}`);
    }
  }
} else {
  console.log("command missing");
}
