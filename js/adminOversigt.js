$(document).ready(function () {
  var adminTableBody = $("#adminTableBody");

    $.ajax({
        type: "GET",
        url: SDK.serverURL + "/course/" + SDK.Storage.load("userId"),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(course){
          var decrypted = $.parseJSON(SDK.Decrypt(course))

          decrypted.forEach(function (decrypted) {

            adminTableBody.append(
                "<tr>" +
                "<td>" + decrypted.code + "</td>" +
                "<td>" + /*course.reviewAverage*/ + "</td>" +
                "<td class='btn-row'> <button class='btn btn-default toLecture' data-lecture=" + decrypted.displaytext + ">Klik for lektioner</button> </td>" +
                "</tr>"

            );

          });

        },

        error: function(){
          alert('failed!');
        }

    })
    //(".toLecture").on("click", function(e){
})
$('#adminTableBody').on('click','.toLecture',function(e){
  var lectureCode = $(this).data("lecture");
  window.location.href = "adminLectureView.html#" + lectureCode;
});
