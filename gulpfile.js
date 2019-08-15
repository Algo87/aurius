var gulp=require('gulp');
var sass=require('gulp-sass');
var browserSync=require('browser-sync');
var concat=require('gulp-concat');
var uglify=require('gulp-uglifyjs');
var cssnano=require('gulp-cssnano');
var rename=require('gulp-rename');
var autoprefixer=require('gulp-autoprefixer');
var del=require('del');
var imagemin=require('gulp-imagemin');
var pngquant=require('imagemin-pngquant');
var cache=require('cache');
var imgCompress  = require('imagemin-jpeg-recompress');


gulp.task('sass', async function(){
	return gulp.src(['app/scss/**/*.scss', 'app/scss/**/*.sass', 'app/libs/**/*.scss'])
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions'], {cascade:true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('code', function(){
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', async function(){
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/slick-carousel/slick/slick.js'
				
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('css-min', async function(){
	return gulp.src('app/scss/main.scss')
	.pipe(sass())
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
})

gulp.task('watch', async function(){
	
	gulp.watch(['app/scss/**/*.scss', 'app/scss/**/*.sass'], gulp.parallel('sass'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch(['app/js/script.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
	gulp.watch('app/css/main.css', gulp.parallel('css-min'));
});

gulp.task('browser-sync', async function(){

	browserSync({
		server:{
			baseDir: 'app',
			index: 'index.html'
		},
		notify:false
	});
});

gulp.task('clear', async function(){
	return del.sync('dist');
});


gulp.task('img', async function() {
    return gulp.src('app/img/**/*') 
        .pipe(imagemin([
        	imgCompress({
        		loops: 4,
        		min:70,
        		max:80,
        		quality:'high'
        	}),
        	imagemin.gifsicle(),
        	imagemin.optipng(),
        	imagemin.svgo()
        	]
        
            
        ))
        .pipe(gulp.dest('dist/img')); 
});
    


gulp.task('prebuild', async function(){

	var buildCss=gulp.src('app/css/main.min.css')
	.pipe(gulp.dest('dist/css'))

	var buildJs=gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var buildHtml=gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));

	var buildFonts=gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));


});

gulp.task('default', gulp.parallel('sass', 'scripts', 'css-min', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('clear', 'prebuild', 'img', 'sass', 'scripts'));
