import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import autoPrefixer from "gulp-autoprefixer";
import groupCss from "gulp-group-css-media-queries";
import postcss from "gulp-postcss";
import tailwindcss from "@tailwindcss/postcss";

const sass = gulpSass(dartSass);

export function scss() {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      sass
        .sync({
          outputStyle: "expanded",
          silenceDeprecations: ["legacy-js-api", "import", "global-builtin"]
        })
        .on("error", sass.logError)
    )
    .pipe(postcss([tailwindcss()]))
    // .pipe(app.plugins.if(app.isBuild, groupCss()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoPrefixer({
          grid: "no-autoplace",
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.styles))
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.styles, { sourcemaps: "." }))
    .pipe(app.plugins.if(app.isDev, app.plugins.browsersync.stream()));
}
