

IO.include('lib/json2.js');




function publish(symbolSet) {

    var dir = JSDOC.opt.d;
    IO.mkPath(dir);

    var symbols = symbolSet.toArray();

    var classes = symbols.filter(function (item) {

        return (item.is("CONSTRUCTOR") || item.isNamespace) &&
            (item.alias != "_global_" || !JSDOC.opt.D.noGlobal);

    }).sort(function (a, b) { //按名称升序排序

        a = a['name'].toLowerCase();
        b = b['name'].toLowerCase();

        return a < b ? -1 :
            a > b ? 1 : 0

    });


    var json = JSON.stringify(classes, function (key, value) {

        if (typeof key != 'string') { //只处理 object 的 key-value
            return value;
        }

        if (key.indexOf('_') == 0) {
            return;
        }

        if (value === false) {
            return;
        }


        if (key == 'comment' && typeof value == 'object') {
            return;
        }

        if (key == '$args' && typeof value == 'object') {
            return;
        }

        if (key == 'srcFile' && typeof value == 'string') {
            return value.split('\\').slice(3).join('/');
        }


        return value;

    }, 4);


    IO.saveFile(dir, 'classes.debug.json', json);

    var code = 'var __classes__ = ' + json + ';';
    IO.saveFile(dir, 'classes.debug.js', code);



    json = JSON.parse(json);
    json = JSON.stringify(json);
    IO.saveFile(dir, 'classes.min.json', json);

    code = 'var __classes__=' + json + ';';
    IO.saveFile(dir, 'classes.min.js', code);


}

