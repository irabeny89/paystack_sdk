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
const noBumpMessage =
  "No conventional commits for your repository that required a bump.";
const semverRegex =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

if (!nextVersion) throw new Error("NEXT_VERSION environment variable not set");
if (nextVersion.includes(noBumpMessage)) logger.info(noBumpMessage);
else if (!semverRegex.test(nextVersion)) {
  throw new Error("invalid semver version");
} else {
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
}
