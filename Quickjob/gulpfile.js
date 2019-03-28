const autoprefixer = require("gulp-autoprefixer"),
	babel = require("rollup-plugin-babel"),
	browserSync = require("browser-sync").create(),
	chokidar = require("chokidar"),
	cleanCss = require("gulp-clean-css"),
	dirSync = require("gulp-directory-sync"),
	file = require("gulp-file"),
	flag = require("yargs").argv,
	fs = require("fs"),
	gulp = require("gulp"),
	nodeResolve = require("rollup-plugin-node-resolve"),
	rollup = require("rollup").rollup,
	sass = require("gulp-sass"),
	sequence = require("run-sequence"),
	sourcemaps = require("gulp-sourcemaps"),
	stripDebug = require("gulp-strip-debug"),
	uglify = require("gulp-uglify"),
	wrap = require("gulp-jsclosure"),
	compass = require('compass-importer');

const getFlag = flagName => flag[flagName];

const getPath = () => getFlag("path");

const fileExists = subpath => fs.existsSync(formatPath(subpath));

const formatPath = subpath => formatDefaultPath(getPath(), subpath);

const formatDefaultPath = (path, subpath) => path + (subpath ? `/${subpath}` : "");

function formatDefaultHtml(title = "") {
	let splitPath = title.split("/"),
		processedTitle = toTitleCase(splitPath[splitPath.length - 1]);

	return `<!DOCTYPE html>
<html lang="pt-BR">

<head>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width"/>
	<title>${processedTitle}</title>
	<link rel="stylesheet" type="text/css" href="index.css"/>
</head>

<body>
	<script type="text/javascript" src="index.js"></script>
</body>

</html>
`;
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(str) {
		return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
	});
}

gulp.task("start", callback => {
	sequence("src-files", callback);
});

gulp.task("develop", callback => {
	sequence("local-env", "browser-sync", "watch", callback);
});

gulp.task("build", callback => {
	sequence("dist-env", callback);
});

gulp.task("src-files", () => {
	if (!fileExists("src")) {
		return file("index.js", "", {
				src: true
			})
			.pipe(file("index.html", formatDefaultHtml(getPath())))
			.pipe(file("index.scss", ""))
			.pipe(gulp.dest(formatPath("src")));
	}
	return;
});

gulp.task("local-env", [
	"sync-with-src",
	"process-js",
	"process-scss"
]);

gulp.task("dist-env", [
	"sync-with-local",
	"compact-js",
	"compact-css"
]);

gulp.task("sync-with-src", () => {
	return gulp.src("")
		.pipe(dirSync(formatPath("src"), formatPath("local"), {
			ignore: ["index.js", "index.scss", "index.css", /^.*?\.map$/i]
		}))
		.pipe(browserSync.stream());
});

gulp.task("sync-with-local", () => {
	return gulp.src("")
		.pipe(dirSync(formatPath("local"), formatPath("dist"), {
			ignore: ["index.js", "index.scss", "index.css", /^.*?\.map$/i]
		}));
});

gulp.task("process-scss", () => {
	return gulp.src(formatPath("src/index.scss"))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ["last 5 versions"],
			cascade: false
		}))
		.pipe(sourcemaps.write(".", {
			includeContent: false,
			sourceRoot: "local"
		}))
		.pipe(gulp.dest(formatPath("local")))
		.pipe(browserSync.stream());
});

gulp.task("process-js", () => {

	// https://medium.com/@andrewhenderson/es6-with-babel-6-gulp-and-rollup-aa7aeddeccc6

	return rollup({
			entry: formatPath("src/index.js"),
			plugins: [
				babel({
					presets: [
						[
							"es2015", {
								modules: false
							}
						]
					],
					plugins: [
						["transform-react-jsx", {
							"pragma": "createElement"
						}]
					],
					babelrc: false
				}),
				nodeResolve({
					jsnext: true
				})
			],
			context: "this"

			// https://github.com/rollup/rollup/issues/759
			// https://github.com/rollup/rollup/wiki/JavaScript-API#context
		})
		.then(bundle => {
			return bundle.generate({
				format: "es",
				sourceMap: true,
				sourceMapFile: formatPath("src/index.js")
			});
		})
		.then(gen => {
			let code = `${gen.code}\n/*# sourceMappingURL=index.js.map */`,
				map = gen.map.toString();

			return file("index.js", code, {
					src: true
				})
				.pipe(gulp.dest(formatPath("local")))
				.pipe(browserSync.stream())
				.pipe(file("index.js.map", map))
				.pipe(gulp.dest(formatPath("local")));
		});
});

gulp.task("compact-css", () => {
	return gulp.src(formatPath("local/index.css"))
		.pipe(cleanCss())
		.pipe(gulp.dest(formatPath("dist")));
});

gulp.task("compact-js", () => {
	return gulp.src(formatPath("local/index.js"))
		.pipe(wrap({
			window: true,
			document: true
		}))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest(formatPath("dist")));
});

gulp.task("browser-sync", () => {
	browserSync.init({
		server: {
			baseDir: formatPath("local")
		},
		ghostMode: {
			clicks: false,
			forms: false,
			scroll: false
		}
	});
});

gulp.task("watch", () => {

	// talvez tenha como melhorar essa parte usando glob pattern.
	// aqui é para excluir todos os js menos o src/index.js e
	// todos os js fora das pastas local e dist.

	chokidar.watch(formatPath("**/*.js"), {
			ignored: [formatPath("src"), formatPath("local"), formatPath("dist")]
		})
		.on("change", () => {
			return sequence("process-js");
		});

	chokidar.watch(formatPath("src/index.js"))
		.on("change", () => {
			return sequence("process-js");
		});

	// talvez tenha como melhorar essa parte usando glob pattern.
	// aqui é para excluir todos os scss menos o src/index.scss e
	// todos os scss fora das pastas local e dist.

	chokidar.watch(formatPath("**/*.scss"), {
			ignored: [formatPath("src"), formatPath("local"), formatPath("dist")]
		})
		.on("change", () => {
			return sequence("process-scss");
		});

	chokidar.watch(formatPath("src/index.scss"))
		.on("change", () => {
			return sequence("process-scss");
		});

	// copia para local os arquivos da pasta src que não forem index.js e index.scss,
	// esses arquivos são processados e copiados para a pasta local em process-js
	// e process-scss

	chokidar.watch(formatPath("src/**/*"), {
			ignored: [formatPath("src/index.js"), formatPath("src/index.scss")]
		})
		.on("change", () => {
			return sequence("sync-with-src");
		});
});
