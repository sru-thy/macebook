$("document").ready(function () {
$("time").each(function (index) {
//     var date = $(this).attr('title')
//     var result = formatDistanceToNow(
//         new Date(2015, 0, 1, 0, 0, 15),
//         {includeSeconds: true}
//     )
//     $(this).text(result)
//     console.log(result)
// });
$("time").each(function (index) {
    $(this).text(moment($(this).attr('title')).fromNow())
});
});
});