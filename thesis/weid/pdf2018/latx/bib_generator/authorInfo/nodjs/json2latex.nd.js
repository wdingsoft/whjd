//var request = require("request");
const fs = require('fs');
var path = require('path');
var Uti = require("../../../../../../utis/zfrqCalc/Uti.Module").Uti;

//var a=require("../latexBibTmpl");
const bibTmp = Uti.LoadObj("../latexBibTmpl.js");
const latexBibTmpl_InputTable = bibTmp.obj;
console.log(bibTmp);



function single_Bibjs2latex(uid, bibo, name) {
    if (uid.indexOf("--") === 0) {
        console.error("uid=", uid)
        return "";
    }
    const doctype = bibo.doctype;
    var sKey = `@${doctype}{${uid},\n`;
    Object.keys(latexBibTmpl_InputTable).forEach(function (key) {
        //$.each(latexBibTmpl_Standard, function (key, emp) {
        key = key.trim();
        if (key === "doctype" || key === "uid") {
            return true;
        }
        var val = bibo[key];
        if (!val) {
            return true;
        }
        if ("author" === key) {
            if (!val || val.trim().length === 0) {
                val = name;//overide the author name from man. 
                console.error("author is null");
            }
        }
        if (key.toLowerCase().indexOf("url") >= 0) {
        }
        else {
            val = val.replace(/\&/g, "\\\&");
        }
        var outkey = key.padEnd(2, " ");
        if (val.indexOf("{") >= 0 || val.indexOf("}") >= 0 || val.indexOf("\\") >= 0) {
            //alert();
            console.error("***** alert  *****", val);
        }
        sKey += "  " + outkey + "\=\{" + val + "\},\r\n";
    });
    sKey += "\}\r\n\r\n";
    return sKey;
};
function json2Latex(jsfname) {
    var out = "", tot = 0, missTot = 0, bib2tex = "\\chapter{bib all}";
    if(!jsfname){
        return { "bib": out, "tex": bib2tex, "tot": tot, "missTot": missTot };
    }
    var BibDat = Uti.LoadObj(jsfname);
    Object.keys(BibDat.obj).forEach(function (key) {
        var bibObj = BibDat.obj[key];
        //console.log(key, bibObj);
        var s = single_Bibjs2latex(key, bibObj, "");
        if (s.length > 0) tot++;
        else missTot++;
        out += s;
        if (key.indexOf("--") < 0) {
            bib2tex += `(${tot}) ${key} [\\footfullcite{${key}}], \n\n`;
        }
    });
    return { "bib": out, "tex": bib2tex, "tot": tot, "missTot": missTot };
}
function Bib_Json2Latex(jsfnameArr, latexBibfile, latex_bib_all) {
    var ret = json2Latex("");
    for(var i=0;i<jsfnameArr.length;i++){
        var jsfnm=jsfnameArr[i];
        var reti=json2Latex(jsfnm);
        ret.bib+=reti.bib;
        ret.tex+=reti.tex;
        ret.tot+=reti.tot;
        ret.missTot+=reti.missTot;
    }

    //out = out.replace(/\&/g,"\\\&");
    console.log("tot=", ret.tot, "missTot=", ret.missTot, ret.tex);
    fs.writeFileSync(latexBibfile, ret.bib);
    fs.writeFileSync(latex_bib_all, ret.tex);
}

var inBibDat_Json_FileArr = 
["../bibDat/BibDat_OBI.json.js",
"../bibDat/BibDat_ZiZi.json.js"];
var ouBibDat_Latx_File = "../bibDat/BibDat_OBI.bib";
var ouLatx_Bib_AllFile = "../../../thesis_bib_all/Appendices/AppendixA.tex";
Bib_Json2Latex(inBibDat_Json_FileArr, ouBibDat_Latx_File, ouLatx_Bib_AllFile);