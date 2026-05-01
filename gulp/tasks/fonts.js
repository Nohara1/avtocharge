import { existsSync, unlinkSync } from "node:fs";
import ttf2woff from "gulp-ttf2woff";
// import ttf2woff2 from "gulp-ttf2woff2";
import fontfaceGen from "gulp-fontfacegen-extended";

export const fonts = async () => {
  const filepath = `${app.path.srcFolder}/scss`;
  const filename = "_fonts.scss";
  const filefullpath = `${filepath}/${filename}`;
  const ttf2woff2 = (await import("gulp-ttf2woff2")).default;

  if (existsSync(filefullpath)) {
    console.log(`File ${filefullpath} removed`);
    unlinkSync(filefullpath);
  }

  return app.gulp
    .src(app.path.src.fontsTTF)
    .pipe(ttf2woff())
    .pipe(app.gulp.dest(app.path.build.fonts))
    .pipe(app.gulp.src(app.path.src.fontsTTF))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts))
    .pipe(
      fontfaceGen({
        filepath: filepath,
        filename: filename,
        destpath: "../fonts",
      })
    )
    .pipe(app.plugins.browsersync.stream());
};
