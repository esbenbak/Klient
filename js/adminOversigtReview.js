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
              "<td class='btn-row'> <button class='btn btn-default toDelete' data-delete=>Slet upassende kommentar</button> </td>" +
              "</tr>"
          );

        })

      },
      error: function(err) {
        console.log(err);
      }
  })

})
