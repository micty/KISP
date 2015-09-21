


/** Called automatically by JsDoc Toolkit. */
function publish(symbolSet) {

    publish.conf = {
        // trailing slash expected for dirs
        ext: ".html",

        outDir: JSDOC.opt.d || SYS.pwd + "../out/jsdoc/",
        templatesDir: JSDOC.opt.t || SYS.pwd + "../templates/jsdoc/", //优先使用命令行输入的 -t=xxx 中指定的模板
        staticDir: "static/",
        symbolsDir: "symbols/",
        srcDir: "symbols/src/",

        rootDir: "/",
        cssDir: "css/",
        fontsDir: "css/fonts/",
        jsDir: "js/",
        htmlDir: "html/",
        dataDir: "data/",
        imgDir: 'css/img/',

        templateName: "MSDN",
        templateVersion: "1.0",
        templateLink: "http://www.thebrightlines.com/2010/05/06/new-template-for-jsdoctoolkit-codeview/"
    };

    // is source output is suppressed, just display the links to the source file
    if (JSDOC.opt.s && defined(Link) && Link.prototype._makeSrcLink) {
        Link.prototype._makeSrcLink = function (srcFilePath) {
            return "&lt;" + srcFilePath + "&gt;";
        }
    }

    // create the folders and subfolders to hold the output
    IO.mkPath((publish.conf.outDir + publish.conf.cssDir));
    IO.mkPath((publish.conf.outDir + publish.conf.fontsDir));
    IO.mkPath((publish.conf.outDir + publish.conf.jsDir));
    IO.mkPath((publish.conf.outDir + publish.conf.dataDir));
    IO.mkPath((publish.conf.outDir + publish.conf.htmlDir));
    IO.mkPath((publish.conf.outDir + publish.conf.imgDir));

    IO.mkPath((publish.conf.outDir + "symbols/src").split("/"));

    // used to allow Link to check the details of things being linked to
    Link.symbolSet = symbolSet;



    // some utility filters
    function hasNoParent($) {
        return ($.memberOf == "")
    }
    function isaFile($) {
        return ($.is("FILE"))
    }
    function isaClass($) {
        return (($.is("CONSTRUCTOR") || $.isNamespace) && ($.alias != "_global_" || !JSDOC.opt.D.noGlobal))
    }

    // get an array version of the symbolset, useful for filtering
    var symbols = symbolSet.toArray();

    // create the hilited source code files
    var files = JSDOC.opt.srcFiles;
    for (var i = 0, l = files.length; i < l; i++) {
        var file = files[i];
        var srcDir = publish.conf.outDir + publish.conf.srcDir;
        makeSrcFile(file, srcDir);
    }

    // get a list of all the classes in the symbolset
    publish.classes = symbols.filter(isaClass).sort(makeSortby("alias"));
    IO.saveFile(
        publish.conf.outDir + publish.conf.dataDir,
        'classes.js',
        'var __classes__ = ' + toJSON(publish.classes)
    );





    // create a filemap in which outfiles must be to be named uniquely, ignoring case
    if (JSDOC.opt.u) {
        var filemapCounts = {};
        Link.filemap = {};
        for (var i = 0, l = publish.classes.length; i < l; i++) {
            var lcAlias = publish.classes[i].alias.toLowerCase();

            if (!filemapCounts[lcAlias])
                filemapCounts[lcAlias] = 1;
            else
                filemapCounts[lcAlias]++;

            Link.filemap[publish.classes[i].alias] = (filemapCounts[lcAlias] > 1) ? lcAlias + "_" + filemapCounts[lcAlias] : lcAlias;
        }
    }



    var documentedFiles = symbols.filter(isaFile); // files that have file-level docs
    var allFiles = []; // not all files have file-level docs, but we need to list every one
    for (var i = 0; i < files.length; i++) {
        allFiles.push(new JSDOC.Symbol(files[i], [], "FILE", new JSDOC.DocComment("/** */")));
    }

    for (var i = 0; i < documentedFiles.length; i++) {
        var offset = files.indexOf(documentedFiles[i].alias);
        allFiles[offset] = documentedFiles[i];
    }




    allFiles = allFiles.sort(makeSortby("name"));


    IO.saveFile(
        publish.conf.outDir + publish.conf.dataDir,
        'files.js',
        'var __files__ = ' + toJSON(allFiles)
    );

    fileindexTemplate = filesIndex = files = null;




    //内部使用，批量拷文件
    function copyFiles(dir, files) {
        var sourceDir = publish.conf.templatesDir + "/" + dir;
        var targetDir = publish.conf.outDir + "/" + dir;

        for (var i = 0; i < files.length; i++) {
            var src = sourceDir + files[i];
            IO.copyFile(src, targetDir);
        }
    }

    // copy static files
    copyFiles(publish.conf.cssDir, [
		"all.css",
		"screen.css",
		"handheld.css",
		"highlight.css"
    ]);

    copyFiles(publish.conf.rootDir, [
		"index.html"
    ]);

    copyFiles(publish.conf.htmlDir, [
		"class.html",
		"class.html.js",
		"files.html",
		"files.html.js",
		"inherits.html",
		"inherits.html.js",
        "method.html",
		"method.html.js"
    ]);

    copyFiles(publish.conf.jsDir, [
        "ClassList.js",
		"jquery-1.9.1.min.js",
		"jquery.observehashchange.js",
        "miniquery.pack.js",
		"highlight.min.js"

    ]);

    copyFiles(publish.conf.fontsDir, [
		"mplus-1m-regular-webfont.eot",
		"mplus-1m-regular-webfont.svg",
		"mplus-1m-regular-webfont.ttf",
		"mplus-1m-regular-webfont.woff",
		"mplus-1m-bold-webfont.eot",
		"mplus-1m-bold-webfont.svg",
		"mplus-1m-bold-webfont.ttf",
		"mplus-1m-bold-webfont.woff"
    ]);

    copyFiles(publish.conf.imgDir, [
		"static.bmp",
		"method.bmp",
		"collapse-.bmp",
		"collapse+.bmp",
		"bar.bmp",
		"property.bmp",
		"field.bmp",
		"class.bmp",
		"enum.bmp",
		'event.bmp',
		'js.bmp',
        'jsfile.bmp'
    ]);
}







/** Include a sub-template in the current template, specifying a data object */
function subtemplate(template, data) {
    try {
        return new JSDOC.JsPlate(publish.conf.templatesDir + template).process(data);
    }
    catch (e) {
        print(e.message);
        quit();
    }
}

/** Just the first sentence (up to a full stop). Should not break on dotted variable names. */
function summarize(desc) {
    if (typeof desc != "undefined")
        return desc.match(/([\w\W]+?\.)[^a-z0-9_$]/i) ? RegExp.$1 : desc;
}

/** Make a symbol sorter by some attribute. */
function makeSortby(attribute) {
    return function (a, b) {
        if (a[attribute] != undefined && b[attribute] != undefined) {
            a = a[attribute].toLowerCase();
            b = b[attribute].toLowerCase();
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        }
    }
}

function wordwrapNamespace(classLink) {
    var classText = classLink.match(/[^<>]+(?=[<])/) + "";
    //var classTextNew = classText.replace(/\./g, "<span class='break'> </span>.<span class='break'> </span>") + "";
    var classTextNew = classText;
    classLink = classLink.replace(/[^<>]+(?=[<])/, classTextNew);
    return classLink;
}

/** Pull in the contents of an external file at the given path. */
function include(path) {
    var path = publish.conf.templatesDir + path;
    return IO.readFile(path);
}

/** Turn a raw source file into a code-hilited page in the docs. */
function makeSrcFile(path, srcDir, name) {
    if (JSDOC.opt.s)
        return;

    if (!name) {
        name = path.replace(/\.\.?[\\\/]/g, "").replace(/[\\\/]/g, "_");
        name = name.replace(/\:/g, "_");
    }

    var src =
    {
        path: path,
        name: name,
        charset: IO.encoding,
        hilited: ""
    };

    if (defined(JSDOC.PluginManager)) {
        JSDOC.PluginManager.run("onPublishSrc", src);
    }

    if (src.hilited) {
        IO.saveFile(srcDir, name + publish.conf.ext, src.hilited);
    }
}

/** Build output for displaying function parameters. */
function makeSignature(params) {
    if (!params)
        return "()";

    var signature = "(" +

    params.filter(function ($) {
        return $.name.indexOf(".") == -1; // don't show config params in signature
    }).map(function ($) {
        return $.name;
    }).join(", ") +
    ")";

    return signature;
}

/** Find symbol {@link ...} strings in text and turn into html links */
function resolveLinks(str, from) {
    str = str.replace(/\{@link ([^}]+)\}/gi, function (match, symbolName) {
        symbolName = symbolName.trim();
        var index = symbolName.indexOf(' ');
        if (index > 0) {
            var label = symbolName.substring(index + 1);
            symbolName = symbolName.substring(0, index);
            return new Link().toSymbol(symbolName).withText(label);
        }
        else {
            return new Link().toSymbol(symbolName);
        }
    });
    return str;
}


function getString(v) {

    switch (typeof v) {

        case 'string':
            v = v.replace(/\\/g, '\\\\');
            v = v.replace(/"/g, '\\"');
            v = v.replace(/\r/g, '\\r');
            v = v.replace(/\n/g, '\\n');
            v = v.replace(/\\r\\n/g, '\\n');
            v = v.replace(/\\r/g, '\\n');
            v = v.replace(/\\n/g, '\\n');

            return '"' + v + '"';

        case 'number':
        case 'boolean':
        case 'function':
            return v.toString();

        case 'undefined':
            return 'undefined';

        case 'object':
            if (v === null) {
                return 'null';
            }
            else {
                throw new Error('不支持该 object 类型');
            }
    }
}

/**
* 把一个对象转成 JSON 字符串
* @param {Object} obj 要进行转换的对象
* @return {String} 返回一个 JSON 字符串
*/
function toJSON(obj) {

    var fn = arguments.callee;

    if (typeof obj != 'object') { // string|number|boolean|function|undefined
        return getString(obj);
    }

    if (!obj) { // null
        return 'null';
    }

    //处理包装类
    if (obj instanceof String ||
        obj instanceof Number ||
        obj instanceof Boolean ||
        obj instanceof Date ||
        obj instanceof RegExp) {

        return getString(obj.valueOf());
    }



    //处理数组
    if (obj instanceof Array) {
        var list = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            list.push(fn(obj[i]));
        }

        return '[' + list.join(', ') + ']';
    }


    var pairs = [];
    for (var key in obj) {

        var value = obj[key];

        var type = typeof value;
        if (type == 'function') {
            continue;
        }

        if (type == 'object') {
            value = fn(value);
        }
        else {
            value = getString(value);
        }


        key = getString(key);
        pairs.push(key + ': ' + value);
    }

    return '{ ' + pairs.join(', ') + ' }';


};