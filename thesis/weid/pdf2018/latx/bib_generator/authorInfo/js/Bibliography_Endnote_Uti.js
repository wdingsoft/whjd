
var Bibliography_Endnote_Uti = {

    get_footnote_author: function (sauthor) {
        sauthor = sauthor.trim();
        function Get_Last_First(sname) {
            sname = sname.trim(" ");
            var ret = "";
            if (sname.indexOf(",") < 0) {
                return sname;
            } else {
                var arr3 = sname.split(",");
                arr3.reverse();
                ret += arr3.join(" ");
            }
            return ret;
        }
        var ar = sauthor.split(/and/ig);
        var ret = "";
        const S_and = " and ";
        for (var i = 0; i < ar.length; i++) {
            ret += Get_Last_First(ar[i]) + S_and;
        }
        ret = ret.substr(0, ret.length - S_and.length);
        ret = ret.trim();
        return ret;
    },
    get_footnote: function (obj) {
        if (!obj) {
            console.log("obj is null:", obj)
        }
        var ftn = this.get_footnote_author(obj.author);
        switch (obj.doctype) {
            case "report":
                var month = "";
                if (obj.month) month = obj.month + " ";

                var src = "";
                if (obj.booktitle && obj.booktitle.length > 0) {
                    src = `<cite>${obj.booktitle}</cite>`;
                    src += ", " + obj.publisher;
                }
                ftn += `, "${obj.title}" ${src} (${obj.year})`;
                break;
            case "article":
                var month = "";
                if (obj.month) month = obj.month + " ";
                if (!!obj.journal) {
                    ftn += `, "${obj.title}" In: <cite>${obj.journal}</cite> (${obj.year})`;
                    break;
                }
                var src = obj.journal;
                if (obj.booktitle && obj.booktitle.length > 0) {
                    src = `<cite>${obj.booktitle}</cite>`;
                    src += ", " + obj.publisher;
                }
                ftn += `, "${obj.title}" In: ${src} (${obj.year})`;
                break;
            case "mastersthesis":
                ftn += `. "${obj.title}" Master Thesis, ${obj.school}, ${obj.year}`;
                break;
            case "phdthesis":
                ftn += `. "${obj.title}" PhD Thesis, ${obj.school}, ${obj.year}`;
                break;
            case "book":
                var booktit = obj.booktitle;
                if (!booktit) {
                    booktit = obj.title;
                }
                ftn += `. <cite>${booktit}</cite>. Ed. ${obj.publisher}, ${obj.year}`;
                break;
            case "incollection":
                ftn += `. "${obj.title}" In: <cite>${obj.booktitle}</cite>. Ed. by ${obj.editor}. ${obj.address}:${obj.publisher}, ${obj.year}`;
                break;
            case "webpage":
                ftn += `. "${obj.title}" ${obj.year}. URL:${obj.url} (visited on ${obj.Urldate} )`;
                break;
        };
        console.log(ftn);
        console.log();
        return ftn;
    },
    get_bibliography_author: function (sauthor) {
        function Get_First_Last(sname) {
            var ret = "";
            if (sname.indexOf(",") >= 0) {//family and first ready.
                return sname;
            } else {
                sname = sname.trim(" ");
                var arr3 = sname.split(" ");
                if (arr3.length > 1) {
                    arr3 = arr3.reverse();
                    ret = arr3.shift() + ", ";
                    ret += arr3.join(" ");
                } else {
                    ret = sname;
                }

            }
            return ret;
        }
        var ar = sauthor.split(/and/ig);
        var ret = "";
        const S_and = " and ";
        for (var i = 0; i < ar.length; i++) {
            ret += Get_First_Last(ar[i]) + S_and;
        }
        ret = ret.substr(0, ret.length - S_and.length);
        return ret;
    },
    get_bibliography: function (obj) {
        var ftn = this.get_bibliography_author(obj.author) + ". ";
        switch (obj.doctype) {
            case "report":
                var month = "";
                if (obj.month) month = obj.month + " ";

                var src = "";
                if (obj.booktitle && obj.booktitle.length > 0) {
                    src = `<cite>${obj.booktitle}</cite>`;
                    src += ", " + obj.publisher;
                }
                ftn += `, "${obj.title}" (${obj.year})`;
                break;
            case "article":
                var month = "";
                if (obj.month) month = obj.month + " ";
                var src = obj.journal;
                if (!src) {
                    src = obj.booktitle;
                }
                ftn += `"${obj.title}." In: <cite>${src}</cite> (${month}${obj.year})`;
                break;
            case "mastersthesis":
                ftn += `"${obj.title}". Master Thesis, ${obj.school}, ${obj.year}`;
                break;
            case "phdthesis":
                ftn += `${obj.title}. PhD Thesis, ${obj.school}, ${obj.year}`;
                break;
            case "book":
                var boktit = obj.booktitle;
                if (!boktit) {
                    boktit = obj.title;
                }
                ftn += ` <cite>${boktit}</cite>. ${obj.publisher}, ${obj.year}`;
                break;
            case "incollection":
                ftn += `. "${obj.title}" In: ${obj.booktitle}. Ed. by ${obj.editor}. ${obj.address}:${obj.publisher}, ${obj.year}`;
                break;
            case "webpage":
                ftn += `. "${obj.title}." ${obj.year}. URL: ${obj.url} (visited on ${obj.Urldate} )`;
                break;
            default:
                console.error("erro doctyp:", obj);
                break;
        }
        console.log(ftn);
        console.log();
        return ftn;
    }
}