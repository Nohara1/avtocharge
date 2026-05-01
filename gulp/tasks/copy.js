export const copy = () => {
  const gulp = app.gulp;
  const path = app.path;
  return (
    gulp.src(path.src.files, { encoding: false }).pipe(gulp.dest(path.build.files)),
    gulp.src(path.src.fonts, { encoding: false }).pipe(gulp.dest(path.build.fonts)),
    gulp.src(path.src.favicon, { encoding: false }).pipe(gulp.dest(path.build.favicon)),
    gulp.src(path.src.videos, { encoding: false }).pipe(gulp.dest(path.build.videos)),
    gulp.src(path.src.robots).pipe(gulp.dest(path.build.html))
  );
};
