var fs = require("fs");
var path = require("path");

//var Uti = require("../../../../../../../utis/zfrqCalc/Uti.Module").Uti;
//require("../../../doc_files/d_pload/d_tables/")
//require("../../../doc.html");


var tabler = function (srcdir) {
    this.m_str = "";
    this.m_srcDir = srcdir;
    this.m_docfile = ""
};
tabler.prototype.getPathfiles = function (srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        if ("." === file[0]) return false;
        return fs.statSync(srcpath + '/' + file).isFile();
    });
}

tabler.prototype.gen = function (srcdir) {
    this.m_srcDir = srcdir;
    var fary = this.getPathfiles(srcdir);
    for (var i = 0; i < fary.length; i++) {
        var sfn = fary[i];
        this.parse_fname(sfn);
        
    }
}

tabler.prototype.parse_fname = function (sfn) {
    var bas = path.parse(sfn);
    var ext = bas.ext.toLowerCase();
    //console.log(ext, "ext")

    var mat = sfn.match(/^(\d{2})_(.+)\./); //01_ab.png
    var idx = 0;
    var str = "";
    if (mat) {
        idx = parseInt(mat[1]);
        str = mat[2];
        //console.log(mat);

        if (ext === ".png") {
            this.gen_img_holder(sfn, idx, str);
        }
        if (ext === ".html") {
            this.gen_tab_holder(sfn, idx, str);
        }
    }
}
tabler.prototype.gen_img_holder = function (sfn, idx, str) {
    var pfile = this.m_srcDir + sfn + ".htm";
    var cap = fs.readFileSync(pfile, "utf8");
    var fname = `./doc_files/d_pload/d_img/${sfn}`;
    var tmp = `
        <figure figtype="img" id="Figure-${idx}" name="Figure-${idx}" title=''>
          <img alt="image"  src="${fname}">&nbsp;</img>
          <figcaption>Figure-${idx}: ${cap}</figcaption>
        </figure><br><br><br>\n`;
    //console.log(tmp);
    this.m_str += tmp;
}
tabler.prototype.gen_tab_holder = function (sfn, idx, str) {
    //str = str.replace("Zi3", "Zi(子)");
    var pfile = this.m_srcDir + sfn + ".htm";
    var cap = fs.readFileSync(pfile, "utf8");
  
    var fname = `./doc_files/d_pload/d_tables/${sfn}`;
    var tmp = `
        <figure figtype="table">
          <div id="Table-${idx}" name="Table-${idx}">Table-${idx}</div>
          <div>${cap}</div>
          <a title="${fname}"></a>
        </figure><br><br><br>\n`;
    //console.log(tmp);
    this.m_str += tmp;
}
tabler.prototype.outp = function (srcfile) {
    ///////////////////////
    const KEY_CODE="ploadfiles2doc.nd.js";
    if(KEY_CODE != path.basename(module.filename)){
        console.log("*** WARNING: KEY_CODE need to be changed in htm file:",KEY_CODE);
    }
    const RESERVED_START = `<!---Appendix:START:nodejs=${KEY_CODE}--->`;
    
    console.log("start load at:",RESERVED_START);
    const RESERVED_END = "<!---Appendix:END:nodejs--->";
    //var srcfile = "../../../doc.html";
    var htm = fs.readFileSync(srcfile, "utf8");
    var pos0 = htm.indexOf(RESERVED_START);
    if(pos0<0){
        console.log("*** NO KEY_CODE_NOT_FIND:",RESERVED_START, " in file:", srcfile);
        return;
    }
    var pos1 = pos0 + RESERVED_START.length;
    var pos2 = htm.indexOf(RESERVED_END);
    var str1 = htm.substr(0, pos1);
    var str2 = htm.substr(pos2);
    htm = str1 + "\n<div>\n" + this.m_str + "\n</div>" + str2;
    fs.writeFileSync(srcfile, htm, "utf8");
    console.log("writeback:",srcfile);
};
//var content = fs.readFileSync("../../../TheSonContextualization/doc.html","utf8");
//content = content.replace(/\n/g, "");
//content = content.replace(/(\s+)/g, " ");
var opts = {
    doctype: 'html5',
    //hideComments: false, //  multi word options can use a hyphen or "camel case"
    //indent: true,
    "indent-spaces": 4
}
//var result = tidy(content, opts);

//fs.writeFileSync("o.htm",content,"utf8")
//console.log(result);
var tab = new tabler();

tab.gen("../../../doc_files/d_pload/d_img/");
tab.m_str += `\n<span page_break_before="true"></span>\n`;
tab.m_str += `\n<h3></h3>\n`;
tab.gen("../../../doc_files/d_pload/d_tables/");
tab.outp("../../../doc.html");