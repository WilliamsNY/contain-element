const gulp = require("gulp"),
    ugly = require("gulp-uglify"),
    concat = require("gulp-concat");

gulp.task("module", function() {
    return gulp.src([ "contain-element.js", "module-template.js" ])
        .pipe(concat("contain-element-module.js"))
        .pipe(gulp.dest("./"));
});

gulp.task("minify", function() {
    return gulp.src("contain-element.js")
        .pipe(ugly())
        .pipe(concat("contain-element.min.js"))
        .pipe(gulp.dest("./"));
});

gulp.task("default", [
    "module",
    "minify"
]);
