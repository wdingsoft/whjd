

var journey_data_obj =
{
    "1964": [
        "0",
        "born in Beijing"
    ],
    "1965": [
        "-26",
        "sent to old town."
    ],
    "1966": [
        "",
        ""
    ],
    "1967": [
        "",
        ""
    ],
    "1968": [
        "",
        ""
    ],
    "1969": [
        "",
        ""
    ],
    "1970": [
        "",
        ""
    ],
    "1971": [
        "",
        ""
    ],
    "1972": [
        "-51",
        "back to Beijing w/ parents"
    ],
    "1973": [
        "",
        ""
    ],
    "1974": [
        "",
        ""
    ],
    "1975": [
        "",
        ""
    ],
    "1976": [
        "",
        ""
    ],
    "1977": [
        "",
        ""
    ],
    "1978": [
        "",
        ""
    ],
    "1979": [
        "",
        ""
    ],
    "1980": [
        "",
        ""
    ],
    "1981": [
        "",
        ""
    ],
    "1982": [
        "-29",
        "College life. during the period, influenced by Chinese Daoism(Laozi/Zhuangzi). (2) in 1986, I continued to pursue the master's degree major in vibration control."
    ],
    "1983": [
        "",
        ""
    ],
    "1984": [
        "",
        ""
    ],
    "1985": [
        "",
        ""
    ],
    "1986": [
        "",
        ""
    ],
    "1987": [
        "",
        ""
    ],
    "1988": [
        "",
        ""
    ],
    "1989": [
        "-93",
        "Tiananmen massacre. a tough decision to make between the master's degree diploma and the freedom, justice or truth, between the surviving and death. (2) It is a turning point of my original materialism, marxism and communism faith. The three love became three hatred in my life. My goal of life was to leave China forever. Trump is my reminder of such trauma."
    ],
    "1990": [
        "",
        ""
    ],
    "1991": [
        "",
        ""
    ],
    "1992": [
        "-74",
        "marriage. visited USA,"
    ],
    "1993": [
        "",
        ""
    ],
    "1994": [
        "",
        ""
    ],
    "1995": [
        "-15",
        "USA dream."
    ],
    "1996": [
        "",
        ""
    ],
    "1997": [
        "",
        ""
    ],
    "1998": [
        "-24",
        "First job"
    ],
    "1999": [
        "",
        ""
    ],
    "2000": [
        "",
        ""
    ],
    "2001": [
        "-37",
        "(1) got citizenship. (2)laid off "
    ],
    "2002": [
        "-48",
        "stayed at home"
    ],
    "2003": [
        "-100",
        "(1) family conflict. (2) found a job in Ligos Software in Savannah GA."
    ],
    "2004": [
        "50",
        "baptized at ACCC."
    ],
    "2005": [
        "24",
        "(1) family burged. (2) children game"
    ],
    "2006": [
        "64",
        "Shacco-Spring Retreat"
    ],
    "2007": [
        "",
        ""
    ],
    "2008": [
        "",
        ""
    ],
    "2009": [
        "",
        ""
    ],
    "2010": [
        "",
        ""
    ],
    "2011": [
        "48",
        "Work alone at Huntsville. join CCCM"
    ],
    "2012": [
        "",
        ""
    ],
    "2013": [
        "",
        ""
    ],
    "2014": [
        "",
        ""
    ],
    "2015": [
        "",
        ""
    ],
    "2016": [
        "89",
        "(1) quitted Emerson in Huntsville to go to CIU. (2) visited Beijing in Dec 2019.(3) on the crossroad in the missionary: My vision: 'Leave your country, your people and your father's household and go to the land I will show you.' (Gen12:1 NIV)  "
    ],
    "2017": [
        "",
        ""
    ],
    "2018": [
        "",
        ""
    ],
    "2019": [
        "71",
        "graduated fr CIU."
    ],
    "2020": [
        "",
        ""
    ],
    "2021": [
        "100",
        "pandemic serve in school,"
    ],
    "2022": [
        "85",
        "(1)Journey in Beijing (2)missionary calling."
    ],
    "2023": [
        "",
        ""
    ],
    "2024": [
        "",
        ""
    ],
    "2025": [
        "",
        ""
    ]
}

function get_d3_data(obj) {
    var d3ar = []
    Object.keys(obj).forEach(function (yrs) {
        var x = parseFloat(yrs)
        var y = obj[yrs][0]
        if (y.length > 0) {
            y = parseFloat(y)
            d3ar.push([x, y])
        }
    })
    return d3ar
}

console.log(JSON.stringify(get_d3_data(journey_data_obj),null,4))

