const gulp = require("gulp"),
    ugly = require("gulp-uglify"),
    concat = require("gulp-concat");

gulp.task("min", function() {
    return gulp.src("contain-element.js")
        .pipe(ugly())
        .pipe(concat("contain-element.min.js"))
        .pipe(gulp.dest("./"));
});

gulp.task("default", [ "min" ]);
