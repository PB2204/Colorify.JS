import { writeFileSync } from "node:fs";

const cjs = `"use strict";
module.exports = require("./index.js");
`;
writeFileSync("dist/index.cjs", cjs);