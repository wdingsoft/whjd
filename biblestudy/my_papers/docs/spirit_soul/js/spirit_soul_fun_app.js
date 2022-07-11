







var DatViewerApp = function (wordFrqsDb) {
    this.Set(wordFrqsDb)
}

DatViewerApp.prototype.Set = function (wordFrqsDb) {
    var fullView_Stats = {}
    var fullView_Rates = {}
    var kword_TotFrq = {}
    var kword_TotRat = {}

    var books_FreqAry = JSON.parse(JSON.stringify(BlueLetterBibleCode_Bks_Ary))
    var books_RateAry = JSON.parse(JSON.stringify(BlueLetterBibleCode_Bks_Ary))

    Object.keys(wordFrqsDb).forEach(function (keyWord) {
        fullView_Stats[keyWord] = JSON.parse(JSON.stringify(BlueLetterBibleCode_Bks_Ary))
        fullView_Rates[keyWord] = JSON.parse(JSON.stringify(BlueLetterBibleCode_Bks_Ary))

        var obj = wordFrqsDb[keyWord]
        kword_TotFrq[keyWord] = 0
        kword_TotRat[keyWord] = 0
        Object.keys(obj).forEach(function (book) {
            if (!fullView_Stats[keyWord][book]) { alert(keyWord + "=" + book) }
            fullView_Rates[keyWord][book] = 0

            var frq = obj[book]
            var rate = (frq * 100 / BooksTotalWords[book])
            fullView_Stats[keyWord][book] = frq
            fullView_Rates[keyWord][book] = rate.toFixed(2, 2)
            kword_TotFrq[keyWord] += frq
            kword_TotRat[keyWord] += (rate)

            books_FreqAry[book].push(frq)
            books_RateAry[book].push(rate)
        })
    });;;;/////////////

    this.KeyWord_BooksFrq = fullView_Stats;
    this.KeyWord_BooksRat = fullView_Rates;
    this.KeyWord_TotFrq = kword_TotFrq;
    this.KeyWord_TotRat = kword_TotRat;

    this.Books_FreqAry = books_FreqAry
    this.Books_RateAry = books_RateAry
};

DatViewerApp.prototype.output_dat2table = function (caption, key_booksval) {
    var fullView_Total = this.KeyWord_TotFrq

    var theader = "<thead>"

    theader += "<tr><td>idx</td><td></td><td></td>"
    Object.keys(Hebrew_Vocabulary).forEach(function (keyword, icol) {
        theader += `<th>${icol}</th>`
    })

    theader += "<tr><td></td><td></td><td>English</td>"
    Object.keys(Hebrew_Vocabulary).forEach(function (keyword, icol) {
        theader += `<th>${Hebrew_Vocabulary[keyword][0]}</th>`
    })
    theader += "<tr><td></td><td></td><td>Hebrew</td>"
    Object.keys(Hebrew_Vocabulary).forEach(function (keyword, icol) {
        theader += `<th>${Hebrew_Vocabulary[keyword][1]}</th>`
    })

    theader += "<tr><td></td><td></td><td>Literal</td>"
    Object.keys(Hebrew_Vocabulary).forEach(function (keyword) {
        theader += `<th>${keyword}</th>`
    })


    theader += "</tr><tr><td></td><td>Book</td><td>TotWords</td>"
    Object.keys(Hebrew_Vocabulary).forEach(function (keyword) {
        theader += `<th title='${Hebrew_Vocabulary[keyword][2]}'>x${fullView_Total[keyword]}</th>`
    })
    theader += "</tr></thead>"


    var tab = `<caption>${caption}</caption>${theader}<tbody>`
    var idx = 1
    Object.keys(BlueLetterBibleCode_Bks_Ary).forEach(function (book) {
        var str = `<tr><td class='${BooksCatalogs[book][0]}' title='${BooksCatalogs[book][0]}'>${idx++}</td><td class='bkid'>${book}</td><td>${BooksTotalWords[book]}</td>`
        Object.keys(BlueLetter_WordFrq_DB).forEach(function (keyword) {
            var frq = key_booksval[keyword][book]
            if (frq <= 0) frq = ""
            str += `<td class='frqval'>${frq}</td>`
        })
        str += "</tr>"
        tab += str
    })
    tab += "</tbody>"
    return tab;
}

DatViewerApp.prototype.output_table = function (caption, bRate) {
    var tab = this.output_dat2table(caption, this.KeyWord_BooksFrq)
    if (bRate) {
        tab = this.output_dat2table(caption, this.KeyWord_BooksRat)
    }
    return tab
}



DatViewerApp.prototype.output_chart_data = function (cbf) {

    var word_booksRate = this.KeyWord_BooksRat

    var arow = Array(1 + Object.keys(word_booksRate).length).fill(0);

    var chart_booksValarr = Array(Object.keys(BlueLetterBibleCode_Bks_Ary).length + 1).fill(0);
    for (var i = 0; i < chart_booksValarr.length; i++) {
        chart_booksValarr[i] = JSON.parse(JSON.stringify(arow))
        chart_booksValarr[i][0] = i
    }

    var icol = 0
    Object.keys(word_booksRate).forEach(function (keyWord) {
        if (cbf) cbf(keyWord)
        var obj = word_booksRate[keyWord]
        var idx = 1
        icol++
        Object.keys(obj).forEach(function (book) {
            chart_booksValarr[idx++][icol] = parseInt(obj[book] * 1000)
        })

    });;;;/////////////

    return chart_booksValarr
}

DatViewerApp.prototype.output_chart_sel = function (icolary, cbf) {


    var nameAr = Object.keys(this.KeyWord_BooksRat)
    if (!icolary) {
        icolary = []
        nameAr.forEach(function (v, i) {
            icolary.push(i)
        })
    }

    icolary.forEach(function (val, k) {
        if (cbf) cbf(nameAr[val])
    })

    //if (cbf) cbf("-")



    var chart_booksValarr = this.output_chart_data()

    var retary = []
    for (var idx = 0; idx <= 40; idx++) {
        var ary = chart_booksValarr[idx]

        var ar = [];
        ar[0] = ary[0]
        icolary.forEach(function (icol, k) {
            ar.push(ary[1 + icol])
        })
        //ar.push(0)
        retary.push(ar)
    }
    return retary
}

//DatViewerApp.Start(BlueLetter_WordFrq_DB)
//var tab = DatViewerApp.output_table()



DatViewerApp.prototype.output_BarChart_Arr = function (kword, cbf) {
    var booksRate = this.KeyWord_BooksRat[kword]
    //[
    //    ['Bible', 'Frq Rate(1000%)', { role: 'style' }, '-', { role: 'style' }],
    //    ['2012', 10000, "red", 10000, "blue"],]
    var arr = []
    arr.push(['Bible', '-', { role: 'style' }, '-', { role: 'style' }])
    Object.keys(booksRate).forEach(function (book, i) {
        if (!booksRate[book]) booksRate[book] = 0
        if (i >= 39) return
        var frat = (1 * booksRate[book])
        var ary = [`${(1 + i)}-${book}`, frat, BooksCatalogs[book][1], frat, 'blue']
        arr.push(ary)

    })

    return arr;
}
DatViewerApp.prototype.output_BarChart_Arr_by_icol = function (icol, cbf) {
    var kword = Object.keys(this.KeyWord_BooksRat)[icol]
    if (cbf) cbf(kword)
    return this.output_BarChart_Arr(kword, cbf);
}


DatViewerApp.prototype.getKwordsAry = function (icolary) {
    var kword_obj = this.KeyWord_BooksRat

    var nary = []
    icolary.forEach(function (icol, i) {
        nary.push(Object.keys(kword_obj)[icol])
    })
    return nary
}
DatViewerApp.prototype.getAvgRate = function (icolary) {
    var books_ary = this.Books_RateAry
    var overallrat = 0, itot = 0
    Object.keys(books_ary).forEach(function (book, i) {
        if (i >= 39) return
        var bary = books_ary[book]
        icolary.forEach(function (icol, i) {
            var val = bary[icol]
            overallrat += val
            itot++
        })
    })
    return overallrat / itot
}
DatViewerApp.prototype.getBooksArry = function (icolary, cbf) {
    var books_ary = this.Books_RateAry
    var kword_totrat = this.KeyWord_TotRat
    //[
    //    ['Bible', 'Frq Rate(1000%)', { role: 'style' }, '-', { role: 'style' }],
    //    ['2012', 10000, "red", 10000, "blue"],]
    var darr = []
    //arr.push(['Bible', '-', { role: 'style' }, '-', { role: 'style' }])


    var avgRat = this.getAvgRate(icolary)
    Object.keys(books_ary).forEach(function (book, i) {
        if (i >= 39) return
        var bary = books_ary[book]
        var ary = [book]
        icolary.forEach(function (icol, i) {
            var val = bary[icol]
            //ary.push(kword_totrat[nary[icol]]);//, parseFloat(val))
            if (0 === i) {
                ary.push(avgRat);
                ary.push(BooksCatalogs[book][1])
            }
            ary.push(parseFloat(val))
        })

        //var ary = [`${(1 + i)}-${book}`, frat, BooksCatalogs[book][1], frat, 'blue']
        darr.push(ary)

    })

    return { darr: darr, names: this.getKwordsAry(icolary) };
}