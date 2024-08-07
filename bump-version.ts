import { $ } from "bun";
import pkg from "./package.json"
import jsr from "./jsr.json"
import createLogger from "./src/logger";

type HasRequiredFieldT = {
  version: string
}

type WriteInputT<T extends HasRequiredFieldT> = {
  /** object with `version` property to update value for */
  data: T
  /** path to write new version into the filesystem */
  path: Bun.PathLike
}

const logger = createLogger("version-bump")

const bumpVersion = async <
  T extends HasRequiredFieldT
>(...args: WriteInputT<T>[]) => {
  logger.info("using cog to get next semantic version")
  let nextVersion = await $`cog bump --dry-run --auto`.text()
  nextVersion = nextVersion.replace("\n", "")

  Promise.allSettled(args.map(({ data, path }) => {
    logger.info("assigning next version -> %s", nextVersion)
    data.version = nextVersion

    logger.info("writing data with updated version to -> %s", path.toString())

    return Bun.write(path, JSON.stringify(data, null, 2))
  }))
}

try {
  await bumpVersion(
    {
      data: pkg as HasRequiredFieldT,
      path: "package.json"
    },
    {
      data: jsr as HasRequiredFieldT,
      path: "jsr.json"
    },
  )
} catch (error: any) {
  logger.error(error)
  throw new Error("Operation failed!")
}