const { series, src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const project = require("./package.json");
const rename = require("gulp-rename");
const jsonModify = require("gulp-json-modify");
const zip = require("gulp-zip");

function scss() {
  return src("src/scss/**/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(rename(project.name + ".css"))
    .pipe(autoprefixer())
    .pipe(dest("dist/GoogleChrome/css/"))
    .pipe(dest("dist/MozillaFirefox/css/"));
}

function manifestGoogleChrome() {
  return src("src/manifest-chrome.json")
    .pipe(jsonModify({ key: "version", value: project.version }))
    .pipe(jsonModify({ key: "name", value: project.name }))
    .pipe(jsonModify({ key: "description", value: project.description }))
    .pipe(jsonModify({ key: "author", value: project.author }))
    .pipe(rename("manifest.json"))
    .pipe(dest("dist/GoogleChrome/"));
}

function manifestMozillaFirefox() {
  return src("src/manifest-firefox.json")
    .pipe(jsonModify({ key: "version", value: project.version }))
    .pipe(jsonModify({ key: "name", value: project.name }))
    .pipe(jsonModify({ key: "description", value: project.description }))
    .pipe(jsonModify({ key: "author", value: project.author }))
    .pipe(rename("manifest.json"))
    .pipe(dest("dist/MozillaFirefox/"));
}

function images() {
  return src("src/assets/**/*.*")
    .pipe(dest("dist/GoogleChrome/assets/"))
    .pipe(dest("dist/MozillaFirefox/assets/"));
}

function bundleGoogleChrome() {
  return src([
    "dist/GoogleChrome/**/*.*",
    `!dist/GoogleChrome/${project.name}.zip`,
  ])
    .pipe(zip(project.name + ".zip"))
    .pipe(dest("dist/GoogleChrome/"));
}

function bundleMozillaFirefox() {
  return src([
    "dist/MozillaFirefox/**/*.*",
    `!dist/MozillaFirefox/${project.name}.zip`,
  ])
    .pipe(zip(project.name + ".zip"))
    .pipe(dest("dist/MozillaFirefox/"));
}

exports.build = series(
  scss,
  manifestGoogleChrome,
  manifestMozillaFirefox,
  images,
  bundleGoogleChrome,
  bundleMozillaFirefox
);
exports.dev = series(scss, manifestGoogleChrome);
