var	gulp 		= require("gulp"),
	
	haml 		= require("gulp-haml-coffee"),
	stylus 		= require("gulp-stylus"),

	autoprefix	= require("gulp-autoprefixer"),
	uglify 		= require("gulp-uglify"),
	cssnano 	= require("gulp-cssnano"),

	del 		= require("del"),
	gulpIf 		= require("gulp-if"),
	useref 		= require("gulp-useref"),
	runSequence	= require("run-sequence"),
	browserSync	= require("browser-sync");

// Environment
// 
// Naming here might be a little odd,
// but the idea behind this naming
// convention is that I can say
// PRODUCTION ? do something : do something else
// and it would look like I'm actually
// asking a question there.
const
	PRODUCTION 	= false,
	DEV_DIR 	= "src",
	PROD_DIR 	= "dist";
var	server 		= PRODUCTION ? PROD_DIR : DEV_DIR;

// Build task should be run before
// running the default task
// Production build task
gulp.task("build", function(callback) {
	runSequence("clean", ["fonts", "images", "stylus", "haml"], "useref", callback);
});

// Development build task
gulp.task("build--dev", function(callback) {
	runSequence(["stylus", "haml"], callback);
});


gulp.task("default", function(callback) {
	runSequence("browserSync", PRODUCTION ? "watch" : "watch--dev", callback);
});


gulp.task("browserSync", function() {
	browserSync({
		server: server
	});
});

// Combining styles and scripts
// into one file each and minifying
gulp.task("useref", function() {
	return gulp.src(DEV_DIR + "/*.html")
	.pipe(useref())
	.pipe(gulpIf("*.js", uglify()))
	.pipe(gulpIf("*.css", cssnano()))
	.pipe(gulp.dest(PROD_DIR))
	.pipe(browserSync.reload({stream: true}));
});

// Compile
gulp.task("haml", function() {
	return gulp.src(DEV_DIR + "/haml/**/*.haml")
	.pipe(haml())
	.pipe(gulp.dest(DEV_DIR))
	.pipe(gulpIf(!PRODUCTION, browserSync.reload({stream: true})));
});
// Compile and autoprefix
gulp.task("stylus", function() {
	return gulp.src(DEV_DIR + "/stylus/**/main.styl")
	.pipe(stylus())
	.pipe(autoprefix())
	.pipe(gulp.dest(DEV_DIR + "/css"))
	.pipe(gulpIf(!PRODUCTION, browserSync.stream()));
});

// Copy the fonts over
gulp.task("fonts", function() {
  return gulp.src(DEV_DIR + "/fonts/**/*")
    .pipe(gulp.dest(PROD_DIR + "/fonts"));
});

// Copy the pics over
gulp.task("images", function() {
  return gulp.src(DEV_DIR + "/images/**/*")
    .pipe(gulp.dest(PROD_DIR + "/images"));
});



// Look for Haml, Stylus, and JS
// files for changes
gulp.task("watch", function() {
  gulp.watch(DEV_DIR + "/haml/**/*.haml", function() {
  	runSequence("haml", "useref");
  });
  gulp.watch(DEV_DIR + "/stylus/**/*.styl", function() {
  	runSequence("stylus", "useref");
  });
  gulp.watch(DEV_DIR + "/js/**/*.js", ["useref"]);
});
// Same as above, just less
// things to do so the process
// is quicker while I'm developing
gulp.task("watch--dev", function() {
  gulp.watch(DEV_DIR + "/haml/**/*.haml", ["haml"]);
  gulp.watch(DEV_DIR + "/stylus/**/*.styl", ["stylus"]);
  gulp.watch(DEV_DIR + "/js/**/*.js").on("change", browserSync.reload);
});


// Clean up dist
gulp.task("clean", function() {
	return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});