import gulp, { watch } from "gulp";

const squoosh = require("gulp-libsquoosh");

// import htmlmin from 'gulp-htmlmin';

import babel from "gulp-babel";
import terser from "gulp-terser";
import concat from "gulp-concat";

import pug from "gulp-pug";
var sass = require("gulp-sass")(require("sass"));

const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

import clean from "gulp-purgecss";

import rename from "gulp-rename";

// gulp.task('html-min', () => {
//     return gulp
//         .src('./public/*html')
//         .pipe(
//             htmlmin({
//                 collapseWhitespace: true,
//                 removeComments: true
//             })
//         )
//         .pipe(gulp.dest('./public'));
// });
gulp.task("babel", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(concat("scripts-min.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(terser())
    .pipe(gulp.dest("./public"));
});

// const index = false;
// gulp.task('pugIndex', () => {
//     return gulp
//         .src('./src/pug/index.pug')
//         .pipe(
//             pug({
//                 pretty: index ? false : true
//             })
//         )
//         // .pipe(rename({
//         //     extname: ".php"
//         //   }))
//         .pipe(gulp.dest('./public'));
// });
const pages = true;
gulp.task("pugPages", () => {
  return (
    gulp
      .src("./src/pug/*.pug")
      .pipe(
        pug({
          pretty: pages ? false : true,
        })
      )
      // .pipe(rename({
      //     extname: ".php"
      //   }))
      .pipe(gulp.dest("./public"))
  );
});
// gulp.task('rename', () => {
//     return gulp
//         .src('./src/*.html')
//         .pipe(rename({
//             extname: ".php"
//           }))
//         .pipe(gulp.dest('./public'));
// });

// gulp.task('sass', () => {
//     return gulp
//         .src('./src/scss/styles.scss')
//         .pipe(
//             sass({
//                 outputStyle: 'compressed'
//             })
//         )
//         .pipe(gulp.dest('./public/css'))
// });

gulp.task("css", () => {
  var procesadores = [autoprefixer, cssnano];
  return gulp
    .src("./src/scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(procesadores))
    .pipe(
      clean({
        content: ["./public/*.html"],
        css: ["./public/css/styles.css"],
        safelist: [
          "hamburguer--simple",
          "navbar-header--hamburguer",
          "display-none",
          "animated-border--active",
          "aparecer"
        ],
        FontFace: true,
        variables: true,
      })
    )
    .pipe(gulp.dest("./public/"));
});

// gulp.task('clean', () => {
//     return gulp
//       .src('./public/css/styles.css')
//       .pipe(
//         clean({
//           content: ['./public/*.html'],
//           css: ['./public/css/styles.css'],
//           safelist: ['hamburguer--simple', 'navbar-header--scroll', 'navbar-header--hide', 'navbar-header--hamburguer', 'mybtn--ghost', 'swiper-pagination-bullet', 'swiper-pagination-bullet-active'],
//           FontFace: true,
//           variables: true
//         })
//       )
//       .pipe(gulp.dest('./public/css'));
// });

gulp.task("imagemin", () => {
  return gulp
    .src("src/galery/images/**/*")
    .pipe(
      squoosh({
        encodeOptions: {
          //   oxipng: {},
          webp: {},
          //   avif: {},
          //   mozjpg: {},
        },
        preprocessOptions: {
          resize: {
            enabled: true,
            width: 720,
            // width: Math.round(src.width / 2),
            // height: Math.round(src.height / 2),
          },
        },
      })
    )

    .pipe(gulp.dest("public/galery/images"));
});
gulp.task("imageminlogo", () => {
  return gulp
    .src("src/galery/logo/*")
    .pipe(
      squoosh({
        encodeOptions: {
          //   oxipng: {},
          webp: {},
          //   avif: {},
          //   mozjpg: {},
        },
        preprocessOptions: {
          resize: {
            enabled: true,
            width: 265,
            // width: Math.round(src.width / 2),
            // height: Math.round(src.height / 2),
          },
        },
      })
    )

    .pipe(gulp.dest("public/galery/logo/"));
});
gulp.task("imagemin300", () => {
  return gulp
    .src("src/galery/images/300/*")
    .pipe(
      squoosh({
        encodeOptions: {
          //   oxipng: {},
          webp: {},
          //   avif: {},
          //   mozjpg: {},
        },
        preprocessOptions: {
          resize: {
            enabled: true,
            width: 300,
            // width: Math.round(src.width / 2),
            // height: Math.round(src.height / 2),
          },
        },
      })
    )

    .pipe(gulp.dest("public/galery/images/300/"));
});
gulp.task("imagemin400", () => {
  return gulp
    .src("src/galery/images/400/*")
    .pipe(
      squoosh({
        encodeOptions: {
          //   oxipng: {},
          webp: {},
          //   avif: {},
          //   mozjpg: {},
        },
        preprocessOptions: {
          resize: {
            enabled: true,
            width: 400,
            // width: Math.round(src.width / 2),
            // height: Math.round(src.height / 2),
          },
        },
      })
    )

    .pipe(gulp.dest("public/galery/images/400/"));
});
gulp.task("imagemin720", () => {
  return gulp
    .src("src/galery/images/720/*")
    .pipe(
      squoosh({
        encodeOptions: {
          //   oxipng: {},
          webp: {},
          //   avif: {},
          //   mozjpg: {},
        },
        preprocessOptions: {
          resize: {
            enabled: true,
            width: 620,
            // width: Math.round(src.width / 2),
            // height: Math.round(src.height / 2),
          },
        },
      })
    )

    .pipe(gulp.dest("public/galery/images/720/"));
});

gulp.task("default", () => {
  gulp.watch("./src/js/*.js", gulp.series("babel"));
  // gulp.watch('./src/pug/**/*.pug', gulp.series('pugIndex'));
  gulp.watch("./src/pug/*.pug", gulp.series("pugPages"));
  gulp.watch("./src/pug/**/*.pug", gulp.series("pugPages"));
  gulp.watch("./src/scss/**/*.scss", gulp.series("css"));
  // gulp.watch('./src/galery/images/**/*', gulp.series('imagemin'))
  // gulp.watch('./src/scss/**/*.scss', gulp.series('clean'))
  // gulp.watch('./src/*.html', gulp.series('html-min'))
  // gulp.watch('./src/pug/**/*.pug', gulp.series('rename'));
  // gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
});
