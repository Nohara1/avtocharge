import path from "node:path";

import merge from "merge2";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import autoPrefixer from "gulp-autoprefixer";

const sass = gulpSass(dartSass);

const SCSS_DIR = path.join(process.cwd(), "src", "scss", "page-dump");
const DEST_STYLE = path.join(process.cwd(), "build", "files", "page-dump", "style", "css");
const DEST_PAGE_DUMP_CSS = path.join(process.cwd(), "build", "files", "page-dump", "css");

const sassOpts = {
  loadPaths: [SCSS_DIR],
  outputStyle: "expanded",
  silenceDeprecations: ["legacy-js-api", "import", "global-builtin"],
};

/**
 * Тема дампа: main.scss → files/page-dump/style/css/style.css.
 * Сырой CSS рядом с SCSS: dop.css → …/style/css/dop.css; cf-city.css → files/page-dump/css/cf-city.css.
 */
function compileStyle() {
  return app.gulp
    .src(path.join(SCSS_DIR, "main.scss"), { sourcemaps: app.isDev })
    .pipe(sass.sync(sassOpts).on("error", sass.logError))
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoPrefixer({
          grid: "no-autoplace",
        })
      )
    )
    .pipe(rename({ basename: "style", extname: ".css" }))
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      app.gulp.dest(DEST_STYLE, {
        sourcemaps: ".",
      })
    )
    .pipe(app.plugins.if(app.isDev, app.plugins.browsersync.stream()));
}

/** dop.css — минифицированный дамп; Sass его не парсит (иначе ломается на «43%}.» и т.п.). */
function copyDopCss() {
  return app.gulp
    .src(path.join(SCSS_DIR, "dop.css"), { sourcemaps: false })
    .pipe(rename({ basename: "dop", extname: ".css" }))
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(app.gulp.dest(DEST_STYLE))
    .pipe(app.plugins.if(app.isDev, app.plugins.browsersync.stream()));
}

/** Cityfields (.cf-city); без Sass. */
function copyCfCityCss() {
  return app.gulp
    .src(path.join(SCSS_DIR, "cf-city.css"), { sourcemaps: false })
    .pipe(rename({ basename: "cf-city", extname: ".css" }))
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(app.gulp.dest(DEST_PAGE_DUMP_CSS))
    .pipe(app.plugins.if(app.isDev, app.plugins.browsersync.stream()));
}

export function pageDumpStyle() {
  return merge(compileStyle(), copyDopCss(), copyCfCityCss());
}
