import { $ } from "bun";
import pkg from "./package.json";
import jsr from "./jsr.json";
import createLogger from "./src/logger";
import type { HasRequiredFieldT } from "./src/types/global";

const logger = createLogger("bump-version");

const dataList = [
  {
    data: pkg as HasRequiredFieldT,
    path: "package.json",
  },
  {
    data: jsr as HasRequiredFieldT,
    path: "jsr.json",
  },
];

const nextVersion = Bun.env.NEXT_VERSION;
if (!nextVersion) throw new Error("NEXT_VERSION environment variable not set");

logger.info("next version exist as environment variable");
logger.info(
  `changing version and writing to file: ${pkg.version} -> ${nextVersion}`,
);
Promise.all(
  dataList.map(({ data, path }) => {
    logger.info("writing updated semver to file: %s", path.toString());
    return Bun.write(
      path,
      JSON.stringify({ ...data, version: nextVersion }, null, 2),
    );
  }),
);
