'use strict';

const
    conf = require('./config.js'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    pug = require('gulp-pug'),
    del = require('del'),
    prettier = require('gulp-prettier'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    buffer = require('vinyl-buffer'),
    spritesmith = require('gulp.spritesmith'),
    merge = require('merge-stream'),
    postcss = require('gulp-postcss'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    ftp = require('gulp-ftp'),
    zip = require('gulp-zip'),
    sourcemaps = require('gulp-sourcemaps'),
    argv = require('yargs').argv,
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'),
    regexRename = require('gulp-regex-rename')
;

const
    path = conf.path,
    sprite = conf.sprite,
    server = conf.server,
    ftpOptions = conf.ftpOptions,
    AUTOPREFIXER_BROWSERS = [
        "last 3 version",
        "android >= 4.2",
        "ios >= 6"
    ]
;

const
    onError = function (err) {
        notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
            sound: "Beep"
        })(err);

        this.emit('end');
    };

function clean() {
    return del(path.dest);
}
function clean_unnecessary_folder() {
    return del(path.unnecessary_folder);
}

gulp.task('html',
    () => {
        return gulp.src(path.src.html)
            .pipe(plumber({ errorHandler: onError }))
            .pipe(changed(path.dest, { extension: '.html' }))
            .pipe(pug({
                pretty: true,
                doctype: 'doctype html',
                self: true
            }))
            .pipe(prettier({
                Parser: "html",
                useTabs:true,
                tabWidth: 4,
                printWidth: 450,
                htmlWhitespaceSensitivity: "ignore"
            }))
            .pipe(gulp.dest(path.dest));
    }
);

gulp.task('html-all',
    () => {
        return gulp.src(path.src.html)
            .pipe(plumber({ errorHandler: onError }))
            .pipe(pug({
                pretty: true,
                doctype: 'doctype html',
                self: true
            }))
            .pipe(prettier({
                Parser: "html",
                useTabs:true,
                tabWidth: 4,
                printWidth: 450,
                htmlWhitespaceSensitivity: "ignore"
            }))
            .pipe(gulp.dest(path.dest));
    }
);

gulp.task('css',
    () => {
        return gulp.src(path.src.css)
            .pipe(plumber({ errorHandler: onError }))
            .pipe(sourcemaps.init())
            .pipe(changed(path.dest))
            .pipe(sass({}))
            .pipe(postcss([autoprefixer(AUTOPREFIXER_BROWSERS)]))
            .pipe(cleanCSS({
                compatibility: {
                    properties: {
                        urlQuotes: true
                    }
                },
                level: {
                    1: {
                        all: false
                    }
                },
                format: {
                    breaks: {
                        afterAtRule: true,
                        afterBlockBegins: true,
                        afterBlockEnds: true,
                        afterComment: true,
                        afterProperty: false,
                        afterRuleBegins: false,
                        afterRuleEnds: true,
                        beforeBlockEnds: false,
                        betweenSelectors: false
                    }
                }
            }))
            .pipe(sourcemaps.write('./sass_maps'))
            .pipe(gulp.dest(path.dest));
    }
);

gulp.task('css-all',
    () => {
        return gulp.src(path.src.css)
            .pipe(plumber({ errorHandler: onError }))
            .pipe(sourcemaps.init())
            .pipe(sass({}))
            .pipe(postcss([autoprefixer(AUTOPREFIXER_BROWSERS)]))
            .pipe(cleanCSS({
                compatibility: {
                    properties: {
                        urlQuotes: true
                    }
                },
                level: {
                    1: {
                        all: false
                    }
                },
                format: {
                    breaks: {
                        afterAtRule: true,
                        afterBlockBegins: true,
                        afterBlockEnds: true,
                        afterComment: true,
                        afterProperty: false,
                        afterRuleBegins: false,
                        afterRuleEnds: true,
                        beforeBlockEnds: false,
                        betweenSelectors: false
                    }
                }
            }))
            .pipe(sourcemaps.write('./sass_maps'))
            .pipe(gulp.dest(path.dest));
    }
);

gulp.task('js',
    () => {
        return gulp.src(path.src.js)
            .pipe(changed(path.dest, { extension: '.js' }))
            .pipe(gulp.dest(path.dest));
    }
);
// var minify = require('gulp-minify');
gulp.task('babel', () => {
        return gulp.src(path.src.esjs)
            .pipe(plumber({ errorHandler: onError }))
            .pipe(changed(path.dest, { extension: '.js' }))
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets: [
                    ['@babel/env', { targets: { ie: "9" }, shippedProposals: true }]
                ]
            }))
            .pipe(regexRename(/\.es\.js$/, '.js'))
            // .pipe(minify({
            // 	ext: {
            // 		min: '.min.js'
            // 	},
            // 	ignoreFiles: ['.min.js']
            // }))
            .pipe(sourcemaps.write('./es_maps'))
            .pipe(gulp.dest(path.dest))
    }
);

gulp.task('images',
    () => {
        return gulp.src(path.src.images)
            .pipe(changed(path.dest))
            .pipe(gulp.dest(path.dest));
    }
);

gulp.task('imagemin',
    () => {
        return gulp.src(path.src.images)
            .pipe(changed(path.dest))
            .pipe(imagemin())
            .pipe(gulp.dest(path.dest));
    }
);

gulp.task('sprite-mobile',
    () => {
        /**
         * generate our spritesheet
         */
        let spriteData = gulp.src(sprite.src.sprite_mobile)
            .pipe(spritesmith({
                imgPath: sprite.mobile.imgPath,
                imgName: sprite.mobile.imgName,
                cssName: sprite.mobile.cssName,
                retinaSrcFilter: sprite.mobile.retinaSrcFilter,
                retinaImgPath: sprite.mobile.retinaImgPath,
                retinaImgName: sprite.mobile.retinaImgName,
                algorithm: 'binary-tree', //top-down, left-right, diagonal, alt-diagonal, binary-tree
                padding: 10,
                cssVarMap: function (sprite) {
                    sprite.name = 'mobile_' + sprite.name;
                }
            }));
        /**
         * return a merged stream to handle both `end` events
         */
        return merge(
            /**
             * pipe image stream through image optimizer and onto disk
             */
            spriteData.img
                .pipe(buffer())
                .pipe(imagemin())
                .pipe(gulp.dest(sprite.dest.sprite_img_mobile)),
            /**
             * pipe CSS stream through CSS optimizer and onto disk
             */
            spriteData.css
                .pipe(gulp.dest(sprite.dest.sprite_css_mobile))
        );
    }
);

gulp.task('sprite-pc',
    () => {
        /**
         * generate our spritesheet
         */
        let spriteData = gulp.src(sprite.src.sprite_pc)
            .pipe(spritesmith({
                imgPath:sprite.pc.imgPath,
                imgName:sprite.pc.imgName,
                cssName:sprite.pc.cssName,
                algorithm: 'binary-tree', //top-down, left-right, diagonal, alt-diagonal, binary-tree
                padding: 10,
                cssVarMap: function (sprite) {
                    sprite.name = 'pc_' + sprite.name;
                }
            }));
        /**
         * return a merged stream to handle both `end` events
         */
        return merge(
            /**
             * pipe image stream through image optimizer and onto disk
             */
            spriteData.img
                .pipe(buffer())
                .pipe(imagemin())
                .pipe(gulp.dest(sprite.dest.sprite_img_pc)),
            /**
             * pipe CSS stream through CSS optimizer and onto disk
             */
            spriteData.css
                .pipe(gulp.dest(sprite.dest.sprite_css_pc))
        );
    }
);

gulp.task('etc',
    () => {
        return gulp.src(path.etc)
            .pipe(changed(path.dest))
            .pipe(gulp.dest(path.dest));
    }
);

gulp.task('watch',
    (done) => {

        /**
         * check reloadable argument.
         * $ gulp --reloadable
         */
        let isReload = argv.reloadable,
            reloadFunc = isReload ? browserSync.reload : function () {};

        gulp.watch(path.src.html, gulp.series('html')).on('change', reloadFunc);
        gulp.watch(path.src.scss, gulp.series('css')).on('change', reloadFunc);
        gulp.watch(sprite.src.sprite_mobile, gulp.series('sprite-mobile')).on('change', reloadFunc);
        gulp.watch(sprite.src.sprite_pc, gulp.series('sprite-pc')).on('change', reloadFunc);
        gulp.watch(path.src.images, gulp.series('images')).on('change', reloadFunc);
        gulp.watch(path.src.js, gulp.series('js')).on('change', reloadFunc);
        gulp.watch(path.src.esjs, gulp.series('babel')).on('change', reloadFunc);
        gulp.watch(path.etc, gulp.series('etc')).on('change', reloadFunc);

        done();
    }
);

gulp.task('browser-sync', (done) => {
    browserSync.init({
        notify: false,
        port: server.port,
        ghostMode: false,
        ui: {
            port: 3001,
        },
        logFileChanges: true,
        open: server.open,
        server: {
            baseDir: [path.dest],
            index: server.index
        }
    });
    done();
});

gulp.task('deploy',
    () => {
        return gulp.src('www/**/*')
            .pipe(ftp(ftpOptions))
            .pipe(gutil.noop());
    }
);

gulp.task('bak',
    () => {
        return gulp.src(path.backup)
            .pipe(zip('bak_' + (() => {
                var date = new Date();
                return date.toISOString().substring(0, 10) // YYYY-MM-DD
                    + '_'
                    + ('0' + date.getHours()).slice(-2)
                    + ('0' + date.getMinutes()).slice(-2)
                    + ('0' + date.getSeconds()).slice(-2)
            })() + '.zip'))
            .pipe(gulp.dest('__etribe_ux/backup'));
    }
);

gulp.task(
    "default",
		gulp.series(
		// clean,
        gulp.parallel('bak'),
		gulp.parallel('sprite-mobile'),
        gulp.parallel('sprite-pc'),
        gulp.parallel('images'),
		gulp.parallel('html', 'css', 'js'),
        gulp.parallel('babel'),
        gulp.parallel('etc'),
        // clean_unnecessary_folder,
		gulp.parallel('watch'),
		gulp.parallel('browser-sync')
	)
);

gulp.task('all',
    gulp.parallel('html-all', 'css-all')
);
