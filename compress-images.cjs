const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "src", "assets");

async function compressImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();

    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return;

    const tempPath = filePath + ".tmp";

    let img = sharp(filePath);

    if (ext === ".jpg" || ext === ".jpeg") {
      await img.jpeg({ quality: 75, mozjpeg: true }).toFile(tempPath);
    } else if (ext === ".png") {
      await img.png({ compressionLevel: 9, palette: true }).toFile(tempPath);
    } else if (ext === ".webp") {
      await img.webp({ quality: 75 }).toFile(tempPath);
    }

    fs.renameSync(tempPath, filePath);

    console.log("✔ compressed:", filePath);
  } catch (err) {
    console.error("✖ error:", filePath, err.message);
  }
}

async function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      await walk(full);
    } else {
      await compressImage(full);
    }
  }
}

(async () => {
  console.log("🚀 Start compressing images...");
  await walk(ROOT);
  console.log("✅ Done!");
})();