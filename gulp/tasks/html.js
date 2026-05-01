import fileinclude from "gulp-file-include";
import versionNumber from "gulp-version-number";
import htmlBeautify from "gulp-html-beautify";
import { readFile } from "fs/promises";

export const html = async () => {
  const variables = loadJsonFile("./src/variables.json").then((response) => {
    return response;
  });

  return app.gulp
    .src(app.path.src.html)
    .pipe(app.plugins.plumber())
    .pipe(
      fileinclude({
        basepath: "@root",
        context: await variables,
      })
    )
    .pipe(app.plugins.plumber.stop())
    .pipe(
      app.plugins.if(
        app.isBuild,
        htmlBeautify({
          indentSize: 4,
          preserve_newlines: false,
        })
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.if(app.isDev, app.plugins.browsersync.stream()))
    .pipe(app.plugins.debug({ title: "file:" }));
};

async function loadJsonFile(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (err) {
    console.log(err);
    return {};
  }
}
