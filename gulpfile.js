/*
 *  Gulp File
 */

'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    util = require('gulp-util'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    templateCache = require('gulp-angular-templatecache'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    zip = require('gulp-zip'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    fs = require('fs'),
    _ = require('lodash'),
    stripDebug = require('gulp-strip-debug'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

/* 
 * 
 * Setting the destination browsers for autoprefixer
 *
 */

var DEBUG = false;

var VENDORS_JS_INPUT = [
    './scripts/lodash-4.11.2.min.js',
    './scripts/angular.v1.5.3.min.js',
    './scripts/angular-ui-router.v0.2.18.min.js',
    './scripts/angular-animate.v1.5.3.min.js',
    './scripts/angular-messages.v1.5.3.min.js',
    './scripts/angular-sanitize.v1.5.3.min.js',
    './scripts/ui-bootstrap-custom-tpls-1.3.2.min.js',
    './scripts/angular.ngforce.js',
    './scripts/ngforce.sf.template.js',
    './scripts/ngforce.visualforce.remoting.js',
    './scripts/rgbcolor.min.js',
    './scripts/StackBlur.min.js',
    './scripts/canvg.min.js',
    './scripts/html2canvas.min.js',
    './scripts/blob.min.js',
    './scripts/canvas-toBlob.min.js',
    './scripts/fileSaver.min.js'
];

var MODULESLIST = ['forecasts', 'customer', 'bold-resource'];

//var MODULESLIST = ['bold-resource'];


var AUTOPREFIXER_BROWSERS = [

    //
    // Official browser support policy:
    // http://v4-alpha.getbootstrap.com/getting-started/browsers-devices/#supported-browsers
    //
    'Chrome >= 35',
    'Firefox >= 31',
    'Edge >= 12',
    'Explorer >= 9',
    'iOS >= 8',
    'Safari >= 8',
    'Android 2.3',
    'Android >= 4',
    'Opera >= 12'

];

gulp.task('styles', function () {

    var sassOptions = {
        outputStyle: 'compact', // shall be expanded,nested,compressed
        precision: 8 // changing to 8, as RockFish's precision is 8
    };

    var plumberErrorHandler = function (error) {

        console.log(error.message);
        this.emit('end');
    };

    return gulp.src('scss_files/**/*.scss')

        .pipe(plumber({ errorHandler: plumberErrorHandler }))

        .pipe(sourcemaps.init())

        .pipe(sass(sassOptions))

        .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))

        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest('./css'))

        .pipe(browserSync.stream({ match: '**/*.css' }));
});


gulp.task('serve', ['styles'], function () {

    var syncOptions = {
						  server: { baseDir: "./", index: 'home.html' },

        port: 8888,

						  logPrefix: "SCM PHASE III",

						  browser: ["google chrome", "firefox"],

						  open: true,

						  notify: false
    }

    browserSync.init(syncOptions);


    gulp.watch('scss_files/**/*.scss', ['styles']);

    // gulp.watch('templates/**/*.html', [ 'ng:templateCache' ]);

    // gulp.watch('scmapp/**/*.js').on("change", browserSync.reload);

    gulp.watch("home.html").on("change", browserSync.reload);
});


gulp.task('copy:tosf', function () {

    return gulp.src(['./css/*.css',
        './images/**/',
        './fonts/**/*',
        './scripts/angular-dragdrop.min.js'
    ],

        { base: './' }

    )

        .pipe(gulp.dest('./temp'));

});


gulp.task('clean', function () {

    return del(['build/**/*', 'temp/**/*']);

});


gulp.task('zip:resource', function () {

    return gulp.src('./temp/**/*')

        .pipe(zip('SCM_Resources.zip'))

        .pipe(gulp.dest('./build'));

});

gulp.task('ng:tempcache', function () {

    _.forEach(MODULESLIST, function (module) {

        setAngularTemplateCache( module );

    });

});


gulp.task('combineJS:vendors', function () {

    return gulp.src(VENDORS_JS_INPUT)

        .pipe(concat('vendors.bundle.js', { newLine: '\n;' }))
        
        .pipe(gulp.dest('./temp/scmapp/'));

});

gulp.task('combineJS:app', function () {

    _.forEach(MODULESLIST, function (module) {

        setCombineJs( module );

    });
    
});

gulp.task( 'combineJS:jQuery', function () {
    
     return gulp.src([
                        './scripts/jquery-1.12.3.min.js', 
                        './scripts/jquery-ui-1.11.4.min.js'
                     ])

        .pipe(concat('jquery.bundle.js', { newLine: '\n;' }))
        
        .pipe(gulp.dest('./temp/scmapp/'));   
    
}); 


gulp.task('build', function () {

    runSequence(
                    'styles', 
                    'clean', 
                    ['ng:tempcache', 'combineJS:vendors', 'combineJS:app', 'combineJS:jQuery'], 
                    'copy:tosf', 
                    'zip:resource'
                );

});




gulp.task('default', ['build']);

// Private functions starts //

/**
 * Function for angular template cache
 * 
 */

var setAngularTemplateCache = function (inputModule) {

    var filename = inputModule + '.templates';

    return gulp.src('./templates/' + inputModule + '/*.html')

        .pipe(templateCache(filename + '.js', { module: filename, standalone: true }))

        .pipe(gulp.dest('./scmapp/' + inputModule));

}



/**
 * Function to combine all angular files into thier module folder
 */
var setCombineJs = function (module) {

    var folder = './scmapp/' + module + '/';

    var allJs = [
        './scmapp/scm.config.js',
        folder + module + '.templates.js',
        folder + 'scm-' + module + '.module.js',
        folder + '**/*.js',
        './scmapp/common/*.js'


    ];

    //util.log(util.colors.bgMagenta(allJs));       

    return gulp.src(allJs)

        .pipe(concat('scmapp-' + module + '.bundle.js', { newLine: '\n;' }))
        
        .pipe(stripDebug())

        .pipe(uglify({

            output: {
                beautify: DEBUG,
            },

            compress: {
                sequences: !DEBUG,
                booleans: !DEBUG,
                conditionals: !DEBUG,
                hoist_funs: false,
                hoist_vars: DEBUG,
                warnings: DEBUG,
            },

            mangle: !DEBUG
        }))

        .pipe(header(
            fs.readFileSync('app-header.template.txt', 'utf8')
        ))

        .pipe(gulp.dest('./temp/scmapp/'));

}
