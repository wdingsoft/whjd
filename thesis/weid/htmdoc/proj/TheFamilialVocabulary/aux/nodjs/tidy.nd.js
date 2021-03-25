var fs = require("fs");
var tidy = require("tidy-html5");
 


//require("../../../TheSonContextualization/doc.html")

var content = fs.readFileSync("../../../TheSonContextualization/doc.html","utf8");
content = content.replace(/\n/g, "");
content = content.replace(/(\s+)/g, " ");
var opts = {
    doctype: 'html5',
    //hideComments: false, //  multi word options can use a hyphen or "camel case"
    //indent: true,
    "indent-spaces": 4
}
var result = tidy(content, opts);
 
fs.writeFileSync("o.htm",content,"utf8")
console.log(result);