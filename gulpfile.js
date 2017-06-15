const path = require('path');
const gulp = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const changed =require('gulp-changed');

const gulpTs = require('gulp-typescript');
const typescript = require('typescript');

const webpack = require('webpack');

const clone = require('gulp-clone');

const tcm = require('gulp-typed-css-modules');

// ---------- TypeScript
const tsProject = gulpTs.createProject('tsconfig.json', {
    typescript,
});

gulp.task('tsc', ()=>{
    return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist-es6/'));
});

gulp.task('watch-tsc', ['tsc'], ()=>{
    gulp.watch(['src/**/*.ts', 'src/**/*.tsx', 'dist-typing/**/*.d.ts'], ['tsc']);
});

// ---------- webpack
gulp.task('jsx', ['tsc', 'css'], ()=>{
    return jsxCompiler(false);
});

gulp.task('watch-jsx', ['watch-tsc', 'watch-css'], ()=>{
    return jsxCompiler(true);
});

// ---------- css
gulp.task('css', ()=>{
    const source = gulp.src(['src/**/*.css'])
    .pipe(changed('dist-es6/', {extension: '.css.d.ts'}));

    // typed-css-modules
    source.pipe(clone())
    .pipe(tcm({
        camelCase: true,
    }))
    .pipe(gulp.dest('dist-typing/'));

    // raw
    source.pipe(gulp.dest('dist-es6/'));
})
gulp.task('watch-css', ['css'], ()=>{
    gulp.watch('src/**/*.css', ['css']);
});

/*
// ---------- static assets
gulp.task('static', ()=>{
    return gulp.src(['./html/*'])
    .pipe(changed('dist/'))
    .pipe(gulp.dest('dist/'));
});

// ---------- mc_canvas assets
gulp.task("mc_canvas-static",function(){
    return gulp.src("mc_canvas/Samples/*.gif")
    .pipe(changed("dist/"))
    .pipe(gulp.dest("dist/"));
});

gulp.task('mc_canvas-uglify',function(){
    return gulp.src(["mc_canvas/Outputs/CanvasMasao.js","mc_canvas/Outputs/CanvasMasao_v28.js", "mc_canvas/Outputs/MasaoKani2_manual.js"])
    .pipe(changed("dist/"))
    .pipe(uglify())
    .pipe(gulpif(function(file){
        return path.basename(file.path)==="CanvasMasao_v28.js";
    },replace("CanvasMasao","CanvasMasao_v28")))
    .pipe(gulp.dest("dist/"));
});

gulp.task('mc_canvas', ['mc_canvas-static','mc_canvas-uglify']);

*/

gulp.task('default', ['tsc', 'jsx', 'css']);
gulp.task('watch', ['watch-tsc', 'watch-jsx', 'watch-css'], ()=>{
});

// ----------
//
function jsxCompiler(watch){
  const compiler = webpack(require('./webpack.config.js'));

  const handleStats = (stats, watch)=>{
      console.log(stats.toString({
          chunks: !watch,
          colors: true,
      }));
  };
  if (watch){
      return compiler.watch({
      }, (err, stats)=>{
          if (err){
              console.error(err);
              return;
          }
          handleStats(stats, true);
      });
  }else{
      return compiler.run((err, stats)=>{
          if (err){
              console.error(err);
              return;
          }
          handleStats(stats, false);
      });
  }
}
