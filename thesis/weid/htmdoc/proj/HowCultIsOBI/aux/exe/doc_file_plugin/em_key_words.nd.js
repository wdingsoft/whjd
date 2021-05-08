
var fs = require("fs");

//require("../../doc_files/_em_key_words/_aux_doc_dat.json.js")


//require("../../../TheSonContextualization/doc.html")
var em_key_words = {
    content: "",
    init: function () {
        this.m_fname = "../../../../TheSonContextualization/doc.html";
        //fname = "o2.htm";
        this.content = fs.readFileSync(this.m_fname, "utf8");
        //this.content = this.content.replace(/\&nbsp\;/g, " ");

        var daf = "../../../doc_files/_em_key_words/_aux_doc_dat.json.js";
        var txt = fs.readFileSync(daf, "utf8")
        var pos = txt.indexOf("{");
        var scp = txt.substr(pos);
        this.m_daObj = JSON.parse(scp);
    },
    em_word: function (kword) {
        var reg = new RegExp(`([ |\(|\)|\-])${kword}([ |\)|\.|\,|\-])`, "g");
        var ret = this.content.replace(reg, `$1<em>${kword}</em>$2`);
        this.content = ret;
    },
    em_words: function () {
        var _THIS = this;
        Object.keys(this.m_daObj.italics).forEach(function (kword) {
            _THIS.em_word(kword);
        });
    },
    em_dash:function(){
        var emdash = "&mdash;";
        var ret = this.content.replace(/(\w) [\-]{2} (\w)/g, `$1${emdash}$2`);
        this.content = ret;
    },
    em_space:function(){
        var ret = this.content.replace(/\&nbsp\;/g, ` `);
        this.content = ret;
    },
    run: function () {
        this.init();
        this.em_words();
        this.em_dash();
        this.em_space();
       
        fs.writeFileSync(this.m_fname, this.content, "utf8");
    }
}


em_key_words.run();

em_key_words.run();
em_key_words.run();
//console.log(result);