
import { spawn } from "child_process";
import * as path from "path";
const electronBinary = require("electron");
const args = [path.join(__dirname, "main.cjs")];
const proc = spawn(electronBinary, args, { stdio: "inherit" });
proc.on("close", (code) => process.exit(code ?? 0));
