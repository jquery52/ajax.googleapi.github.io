// auto change version of to navigation bar left content
$("nav a button").html('<i class="fa fa-download mr-5"></i>'+"Download v" + $("nav select")[0].value);
$("nav .download-wv").attr("href", "data/jquery-v" + $("nav select")[0].value + ".zip");
$("select").change(function() {
    $("nav div a button").html('<i class="fa fa-download mr-5"></i>'+"Download v" + this.value);
    $(".download-wv").attr("href", "data/jquery-v" + this.value + ".zip");
} );

$(".plugins").on("click", function () {
    if ($(".Methods").height() === 0) {
        $(".Methods").css("transition", "all 0.3s linear");
        $(".Methods").height($(".Methods").scrollHeight());
    } else {
        $(".Methods").height(0);
    }
});

$(window).on("click", function (e) {
    if (!e.target.matches(".plugins")) {
        $(".Methods").height(0);
    }
});

var jqlink = "http://jquery-mdsrajax.atwebpages.com/ajax/libs/3.6.0/jquery.min.js";
$(".body").text("<body></body>"); $(".head").text("<head></head>");
$(".example-imp").text('<script src="'+ jqlink +'" type="text/javascript"></script>');