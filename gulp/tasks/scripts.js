import { createGulpEsbuild } from "gulp-esbuild";

const gulpEsbuild = createGulpEsbuild({ incremental: false });

export const scripts = () => {
  return app.gulp
    .src(app.path.src.scripts, { sourcemaps: app.isDev })
    .pipe(
      gulpEsbuild({
        bundle: true,
        minify: app.isBuild ? true : false,
        sourcemap: app.isBuild ? false : true,
        target: ["es2021", "chrome69", "edge101", "firefox78", "safari12"],
      })
    )
    .pipe(app.gulp.dest(app.path.build.scripts, { sourcemaps: "." }))
    .pipe(app.plugins.if(app.isDev, app.plugins.browsersync.stream()));
};
