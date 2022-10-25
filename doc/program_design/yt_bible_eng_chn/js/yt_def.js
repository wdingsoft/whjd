
$(function () {
    $(".plus").next().hide()
    $(".plus").on("click", function () {
        $(this).next()
            .slideToggle()
            .attr("contenteditable", "true")
    })

    //gen_lst([yt_data_bible])
})


function get_trs(yt_obj) {

    function get_sec(mm_ss) {
        if (!mm_ss) return 0
        var sec = 0;
        var mat = mm_ss.match(/(\d):(\d)/)
        if (mat) {
            var sec = parseFloat(mat[1])
            sec *= 60
            sec += parseFloat(mat[2])
        }
        return sec;
    }


    var str = "", idx = 0
    for (const [ur, ar] of Object.entries(yt_obj)) {
        if (!ur) continue;
        var start = ar[1].start;

        var startSeconds = get_sec(start)
        str += `<tr><td>${idx++}</td><td><a href_vid='${ur}' startSeconds='${startSeconds}'>${ar[0]} (${start})</a></td></tr>`

    }
    return str;
}

function gen_lst(yt_obj_ary) {
    var str = ""

    for (var i = 0; i < yt_obj_ary.length; i++) {
        str += get_trs(yt_obj_ary[i])
    }

    $("#mylist").html(`<table border='1'>${str}</table>`)

    bind_yt_player()
}
function bind_yt_player() {
    $("a[href_vid]").on("click", function () {
        $(".hili").removeClass("hili")
        $(this).addClass("hili hili_old")

        var surl = $(this).attr("href_vid")
        const urlParams = new URL(surl);
        var vid = urlParams.searchParams.get("v")
        var startSeconds = $(this).attr("startSeconds")

        var speed = $("#ytspeedop").val()
        var url = `./yt_iframe_app/yt_iframe_videoID.htm?vid=${vid}&speed=${speed}&startSeconds=${startSeconds}`
        console.log("url=", url)

        $("iframe").attr("src", url)
    })
}
