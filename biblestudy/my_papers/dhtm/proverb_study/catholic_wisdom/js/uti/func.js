

$(function () {

    var obj = gen_json()
    $("#outx").val(JSON.stringify(obj, 0, 4))

})

function gen_json() {
    var obj = {}
    $("ol").each(function (ichap) {
        ichap++;
        if (undefined === obj[ichap]) obj[ichap] = {}
        $(this).find("li").each(function (ivrs) {
            ivrs++;
            var sid = (ichap) + ":" + (ivrs)
            var txt = $(this).text()
            console.log(sid, txt)
            obj[ichap][ivrs] = txt
        })
    })
    return obj
}