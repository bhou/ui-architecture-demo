const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');

gulp.task('webpack', function() {
  return gulp.src('src/index.js')
    .pipe(webpack({
      entry: {
        bundle: './src/index.js',
        step1: './src/step1.js',
        step2: './src/step2.js',
      },
      output: {
        filename: '[name].js',
      },
      module: {
        loaders: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          },
        ]
      },
      resolve: {  
        alias: {vue: 'vue/dist/vue.js'}
      },
      vue: {
        loaders: {
          js: 'babel-loader',
        },
      },
    }))
    //.pipe(uglify({ mangle: { toplevel: true }}))
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.stream());
});

gulp.task('webpack:watch', function () {
  gulp.watch('./src/**/*.js', ['webpack']);
});

gulp.task('browser-sync', ['webpack'], function () {
  browserSync.init({
    server: {
      baseDir: './public'
    },
  });

  gulp.watch('./src/**/*.js', ['webpack']);
  gulp.watch('./public/*.html').on('change', browserSync.reload);
  gulp.watch('./public/css/**/*.css').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'webpack', 'webpack:watch']);

