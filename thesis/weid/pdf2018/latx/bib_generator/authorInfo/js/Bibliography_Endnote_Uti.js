
var Bibliography_Endnote_Uti = {
    Get_Last_First: function (sname) {// Ding, William
        sname = sname.trim(" ");
        if (sname.length === 0) return ""
        var ret = "";
        if (sname.indexOf(",") < 0) {//Ding, william
            return sname;
        } else {
            var arr3 = sname.split(",");
            arr3.reverse();
            ret = arr3.join(" ");
        }
        return ret;
    },
    Get_First_Last: function (sname) {//retrun form: Ding, William W 
        sname = sname.trim(" ");
        if (sname.length === 0) return ""
        var ret = "";
        if (sname.indexOf(",") >= 0) {//Ding, Wiilaim W,  first family name ready.
            return sname;
        } else {
            var arr3 = sname.split(" "); //William We Ding
            if (arr3.length > 1) {
                ret = arr3.pop() + ", ";
                ret += arr3.join(" ");
            } else {
                ret = sname;
            }
        }
        return ret;
    },

    get_footnote_author: function (sauthor) {
        sauthor = sauthor.trim();
        var ar = sauthor.split(/\s+and\s+/ig);
        var ar2 = []
        for (var i = 0; i < ar.length; i++) {
            var nams = this.Get_Last_First(ar[i])
            if (nams.length == 0) continue;
            ar2.push(nams);
        }
        return ar2.join(" and ");
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
            case "masterthesis":
                ftn += `. "<cite>${obj.title}</cite>" Master Thesis, ${obj.school}, ${obj.year}`;
                break;
            case "phdthesis":
                ftn += `. "<cite>${obj.title}</cite>" PhD Thesis, ${obj.school}, ${obj.year}`;
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
        sauthor = sauthor.trim();
        var ar = sauthor.split(/\s+and\s+/ig);
        var ar2 = []
        for (var i = 0; i < ar.length; i++) {
            var nams = this.Get_First_Last(ar[i])
            if (nams.length == 0) continue;
            ar2.push(nams);
        }
        return ar2.join(" and ");
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
            case "masterthesis":
                ftn += `"<cite>${obj.title}</cite>" Master Thesis, ${obj.school}, ${obj.year}`;
                break;
            case "phdthesis":
                ftn += `"<cite>${obj.title}</cite>" PhD Thesis, ${obj.school}, ${obj.year}`;
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