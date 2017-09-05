var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

'use strict';
 
var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    browserSync = require("browser-sync");
    
gulp.task("default", ["browser-sync", "nodemon"], function(){
    gulp.start("watch:html");
    gulp.start("watch:js");
    gulp.start("watch:templatehtml");
    gulp.start("watch:css");       
});
 
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./public",
            injectChanges: true // this is new
        }
    });

});
 
gulp.task("nodemon", function(){
    nodemon({script: 'app.js'}).on("start");
});
 
gulp.task("watch:html", function () {
    browserSync.watch("./public/*.html").on("change", function () {
        browserSync.reload();
    });   
});

gulp.task("watch:templatehtml", function () {
    browserSync.watch("./public/**/*.html").on("change", function () {
        browserSync.reload();
    });
});
 
gulp.task("watch:js", function () {
    browserSync.watch("./public/**/*.js").on("change", function () {
        browserSync.reload("*.js");
    });
});

gulp.task("watch:css", function () {
    browserSync.watch("./public/stylesheets/*.css").on("change", function () {
        browserSync.reload("*.js");
    });
});