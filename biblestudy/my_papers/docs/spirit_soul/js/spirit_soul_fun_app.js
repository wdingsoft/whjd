







var DatViewerApp = function (wordFrqsDb) {
    this.Set(wordFrqsDb)
}

DatViewerApp.prototype.Set = function (wordFrqsDb) {
    var fullView_Stats = {}
    var fullView_Rates = {}
    var fullView_Total = {}

    Object.keys(wordFrqsDb).forEach(function (keyWord) {
        fullView_Stats[keyWord] = JSON.parse(JSON.stringify(BlueLetterBibleCode_Stats_Init))
        fullView_Rates[keyWord] = JSON.parse(JSON.stringify(BlueLetterBibleCode_Stats_Init))

        var obj = wordFrqsDb[keyWord]
        fullView_Total[keyWord] = 0
        Object.keys(obj).forEach(function (book) {
            if (!fullView_Stats[keyWord][book]) { alert(keyWord + "=" + book) }
            fullView_Rates[keyWord][book] = 0

            fullView_Stats[keyWord][book] = obj[book]
            fullView_Rates[keyWord][book] = (obj[book] * 100 / BooksTotalWords[book]).toFixed(2, 2)
            fullView_Total[keyWord] += obj[book]
        })
    });;;;/////////////

    this.KeyWord_BooksFrq = fullView_Stats;
    this.KeyWord_BooksRat = fullView_Rates;
    this.KeyWord_BooksSum = fullView_Total;
};

DatViewerApp.prototype.output_dat2table = function (caption, key_booksval) {
    var fullView_Total = this.KeyWord_BooksSum

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
    Object.keys(BlueLetterBibleCode_Stats_Init).forEach(function (book) {
        var tr = `<tr><td class='${BooksCatalogs[book][0]}' title='${BooksCatalogs[book][0]}'>${idx++}</td><td class='bkid'>${book}</td><td>${BooksTotalWords[book]}</td>`
        Object.keys(BlueLetter_WordFrq_DB).forEach(function (keyword) {
            var frq = key_booksval[keyword][book]
            if (frq <= 0) frq = ""
            tr += `<td class='frqval'>${frq}</td>`
        })
        tr += "</tr>"
        tab += tr
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

    var chart_booksValarr = Array(Object.keys(BlueLetterBibleCode_Stats_Init).length + 1).fill(0);
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
    arr.push(['Bible', 'Frq Rate(%)', { role: 'style' }, '-', { role: 'style' }])
    Object.keys(booksRate).forEach(function (book, i) {
        if (!booksRate[book]) booksRate[book] = 0
        if (i >= 39) return
        var frat = (1 * booksRate[book])
        var ary = [`${(1 + i)}-${book}`, frat, BooksCatalogs[book][1], frat, 'blue']
        arr.push(ary)

    })

    return arr;
}