import { $ } from "bun"
import pkg from "./package.json"
import jsr from "./jsr.json"
import createLogger from "./src/logger"
import { HasRequiredFieldT } from "./src/types/global"

const logger = createLogger("bump-version")

const dataList = [
  {
    data: pkg as HasRequiredFieldT,
    path: "package.json"
  },
  {
    data: jsr as HasRequiredFieldT,
    path: "jsr.json"
  }
]

logger.info("getting next version from environment variable")
let nextVersion = Bun.env.NEXT_VERSION

try {
  logger.info("checking if next version exist as environment variable")
  if (!nextVersion) {
    logger.info("next version does not exist as environment variable")
    logger.warn("install cocogitto and ensure no uncommitted changes")
    logger.info("using cog to get next version")
    nextVersion = await $`cog bump --dry-run --auto`.text()
  }
  logger.info("next version exist as environment variable")
  logger.info(`changing version and writing to file: ${dataList[0].data.version} -> ${nextVersion}`)
  Promise.all(dataList.map(({ data, path }) => {
    logger.info("writing updated semver to file: %s", path.toString())
    return Bun.write(path, JSON.stringify({ ...data, version: nextVersion }, null, 2))
  }))
} catch (error: any) {
  throw error
}