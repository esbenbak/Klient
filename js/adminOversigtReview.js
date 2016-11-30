$(document).ready(function () {
  var id = location.hash.replace('#', '');
  $.ajax({
      type: "GET",
      url: SDK.serverURL + "/review/" + id,
      dataType: "json",
      success: function(reviews){
        var decrypted = $.parseJSON(SDK.Decrypt(reviews))
        var table = $("#reviewTableBody");
        console.log(decrypted);

        decrypted.forEach(function (decrypted) {
          table.append(
              "<tr>" +
              "<td>" + decrypted.comment + "</td>" +
              "<td>" + decrypted.rating + "</td>" +
              "<td class='btn-row'> <button class='btn btn-default toDelete' data-user=" + decrypted.userId +" data-id=" + decrypted.id+ ">Slet upassende kommentar</button></td>" +
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
  var userId = $(this).data("user");

  $.ajax({
      type: "DELETE",
      url: SDK.serverURL + "/student/review",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        id: id,
        userId: userId
      }),
      success: function(res){
        location.reload()
      },
      error: function(err) {
        console.log(err);
      }
  })
});
