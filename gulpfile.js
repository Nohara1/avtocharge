import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
};

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { scripts } from "./gulp/tasks/scripts.js";
import { pageDumpStyle } from "./gulp/tasks/page-dump-style.js";
import { images, imagesWebp } from "./gulp/tasks/images.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { killTask } from "./gulp/tasks/kill-task.js";

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.tailwind, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.scriptsEsbuild, scripts);
  gulp.watch(path.watch.pageDumpStyle, pageDumpStyle);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.images, imagesWebp);
}

const mainTasks = gulp.series(
  copy,
  gulp.parallel(html, scss, scripts, pageDumpStyle, images, imagesWebp),
);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks, killTask);

export { dev };
export { build };

gulp.task("dev", dev);
gulp.task("build", build);
gulp.task("page-dump-style", pageDumpStyle);
gulp.task("fonts", fonts);
gulp.task("sprite", svgSprite);
