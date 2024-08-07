import { $ } from "bun";
import pkg from "./package.json"
import jsr from "./jsr.json"
import createLogger from "./src/logger";

const logger = createLogger("version-bump")
try {
  logger.info("using cog to get next semantic version")
  const nextVersion = await $`cog bump --dry-run --auto`.text()

  logger.info("assigning next update to package.json and jsr.json -> %s", nextVersion)
  pkg.version = jsr.version = nextVersion.replace("\n", "")
  
  logger.info("overwriting package.json with the update")
  await Bun.write("package.json", JSON.stringify(pkg, null, 2))
  logger.info("overwriting jsr.json with the update")
  await Bun.write("jsr.json", JSON.stringify(jsr, null, 2))
} catch (error: any) {
  logger.error(error)
  throw new Error("Operation failed!")
}