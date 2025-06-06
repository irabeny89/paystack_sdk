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

let nextVersion = Bun.env.NEXT_VERSION;

if (!nextVersion) {
  logger.info("next version does not exist as environment variable");
  logger.warn("install cocogitto and ensure no uncommitted changes");
  logger.info("using cog to get next version");
  const cog = await $`which cog`.text();
  if (!cog) {
    logger.error("cog not found in path");
    process.exit(1);
  }
  nextVersion = (await $`${cog} bump --dry-run --auto`.text()).trim();
}
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
