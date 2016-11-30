$(document).ready(function () {
  var id = location.hash.replace('#', '');
  $.ajax({
      type: "GET",
      url: SDK.serverURL + "/review/" + id,
      dataType: "json",
      success: function(reviews){
        var decrypted = $.parseJSON(SDK.Decrypt(reviews))
        var table = $("#reviewTableBody");

        decrypted.forEach(function (decrypted) {

          var btn;
          if(decrypted.userId == SDK.Storage.load("userId")) {
            btn = "<button class='btn btn-default toDelete' data-id=" + decrypted.id+ ">Slet</button>"
          } else {
            btn = "<button class='btn btn-danger' data-id=" + decrypted.id+ ">Kan ikke slette</button>"
          }

          table.append(
              "<tr>" +
              "<td>" + decrypted.comment + "</td>" +
              "<td>" + decrypted.rating + "</td>" +
              "<td class='btn-row'>" + btn + "</td>" +
              "</tr>"
          );

        })

      },
      error: function(err) {
        console.log(err);
      }
  })

})

$("#reviewTableBody").on('click','.toDelete',function(e){
  var id = $(this).data("id");

  $.ajax({
      type: "DELETE",
      url: SDK.serverURL + "/student/review",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        id: id,
        userId: SDK.Storage.load("userId")
      }),
      success: function(res){
        location.reload()
      },
      error: function(err) {
        console.log(err);
      }
  })
});

$("#insertReviewBtn").click(function(e) {
  e.preventDefault()
  var rating = $("#rating").val()
  var comment = $("#comment").val()
  var lecture = location.hash.replace('#', '');

  $.ajax({
      type: "POST",
      url: SDK.serverURL + "/student/review",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        rating: rating,
        comment: comment,
        lectureId: lecture,
        userId: SDK.Storage.load("userId")
      }),
      success: function(res){
        location.reload()
      },
      error: function(err) {
        console.log(err);
      }
  })
})
