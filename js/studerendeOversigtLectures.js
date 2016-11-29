$(document).ready(function () {
  var lectureCode = location.hash.replace('#', '');
  var lectureTableBody = $("#studentLectureTableBody")

  $.ajax({
      type: "GET",
      url: SDK.serverURL + "/lecture/" + lectureCode,
      dataType: "json",
      success: function(lectures){
        var decrypted = $.parseJSON(SDK.Decrypt(lectures))
        var table = $("#studentLectureTableBody");
        console.log(decrypted);

        decrypted.forEach(function (decrypted) {
          table.append(
              "<tr>" +
              "<td>" + decrypted.startDate + "</td>" +
              "<td class='btn-row'> <button class='btn btn-default toReview' data-id=" + decrypted.id+ ">Klik for at tilføje kommentar</button></td>" +
              "</tr>"
          );

        })

      },
      error: function(err) {
        console.log(err);
      }
  })
})

$("#studentLectureTableBody").on('click','.toReview',function(e){
  var id = $(this).data("id");
  window.location.href = "studerendeReview.html#" + id;


});
