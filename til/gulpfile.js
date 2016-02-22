'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass'); // gulp plugin to compile sass to css
var webpack = require('webpack-stream');
var WebpackDevServer = require("webpack-dev-server");

var config = {
	'root':['dist'],
	'dirs':{
		'src':{
			'css':{
				'rootFolder':'./src/css',
				'rootFiles':'./src/css/**/*.css',
			},
			'html':'./src/*.html',
			'indexHtml':'./src/index.html',
			'js':'./src/**/*.js',
			'entryJS':'./src/index.js',
			'sass':'./src/scss/**/*.scss'
		},
		'dist':{
			'css':'./dist/css',
			'indexHtml':'./dist/index.html',
			'root':'./dist'
		}
	}
}

gulp.task('webpack', function() {
	return gulp.src(config.dirs.src.entryJS)
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest(config.dirs.dist.root))
})

gulp.task('html', function() {
	gulp.src(config.dirs.src.html)
		.pipe(gulp.dest(config.dirs.dist.root))
});

gulp.task('css', ['sass'], function() {
	gulp.src([config.dirs.src.css.rootFiles])
		.pipe(gulp.dest(config.dirs.dist.css))
});

gulp.task('sass', function() {
	gulp.src(config.dirs.src.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(config.dirs.src.css.rootFolder))
})

gulp.task('watch', function() {
	gulp.watch([config.dirs.src.sass], ['css'])
	gulp.watch([config.dirs.src.css.rootFiles], ['css'])
	gulp.watch([config.dirs.src.html], ['html'])
})

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(
        require('./webpack.config.js')
    );

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw err;
        // Server listening
        // keep the server alive or continue?
        // callback();
    });
});

gulp.task('default', ['sass', 'css', 'html', 'webpack' ,'watch']);
