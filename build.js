// This script used to build the tauri project

const fs = require("fs/promises");
const path = require("path");
const { exec } = require("child_process");

const execAsync = (command) => {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        resolve(error);
        return;
      }
      if (stderr) {
        resolve(stderr);
        return;
      }
      resolve(stdout);
    });
  });
};

const rootDir = path.resolve(__dirname);
const tauriDir = path.resolve(rootDir, "src-tauri");

const packageJson = require(path.resolve(rootDir, "package.json"));
const tauriConfig = require(path.resolve(tauriDir, "tauri.conf.json"));

const build = async () => {
  // Step 1: Copy package.json > version to tauri.conf.json > package > version
  console.log(`[build] Versions synchronizing...`);
  tauriConfig.package.version = packageJson.version;
  await fs.writeFile(
    path.resolve(tauriDir, "tauri.conf.json"),
    JSON.stringify(tauriConfig, null, 4)
  );

  // Step 2: Build the tauri project
  console.log(`[build] Building...`);
  await execAsync("npm run tauri build");

  // Step 3: Copy <project>/<tauri>/target/release/bundle/msi/*.msi to rootDir without version/locale.
  console.log(`[build] Copying msi file...`);
  const msiFiles = await fs.readdir(
    path.resolve(tauriDir, "target/release/bundle/msi")
  );
  const msiFile = msiFiles.find((file) => file.endsWith(".msi"));
  const msiFilePath = path.resolve(
    tauriDir,
    "target/release/bundle/msi",
    msiFile
  );

  const newMsiFileName = msiFile.split("_")[0] + ".msi";
  const newMsiFilePath = path.resolve(rootDir, newMsiFileName);

  await fs.copyFile(msiFilePath, newMsiFilePath);

  console.log(`[build] Done!`);
  process.exit(0);
};

build();
