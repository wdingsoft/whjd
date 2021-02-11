function rephili(tx) {
    for (const [key, ar] of Object.entries(Hilites)) {
        //console.log(`${key}: ${ar}`);
        ar.forEach(function (v, i) {
            //console.log(v);
            //var tt = "the first great fact which "
            var tt2 = `<a hilit='1'>${v}</a>`
            var reg = new RegExp(v, "g")
            if (tx.indexOf(v) >= 0) {
                tx = tx.replace(reg, tt2)
                console.log(v);
            }
        });
    }
    return tx
}
function hilit() {
    $("p").each(function () {
        var tx = $(this).text()

        tx = rephili(tx)
        

        $(this).html(tx)
    })
}
$(function () {
    hilit()
})
var Hilites =
{
    "fact": [
        "mutual affinities of organic beings, on their embryological relations, their geographical distribution, geological succession",
        "In considering the distribution of organic beings over the face of the globe, the first great fact which strikes us is, that neither the similarity nor the dissimilarity of the inhabitants of various regions can be accounted for by their climatal and other physical conditions. "
    ]

}