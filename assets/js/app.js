function loadPage(page) {
    $("#content").empty();
    $.LoadingOverlay("show")
    fetch("pages/" + page)
      .then(res => res.text())
      .then(html => {
         $("#content").html(html);

         // ambil semua script dan eksekusi manual
         $("#content script").each(function () {
            eval($(this).text());
         });
         $("#loadingSpinner").hide()
      })
      .catch(err => {
         $("#content").html("<p>Error loading page</p>");
     })
     .finally(() => {
         $.LoadingOverlay("hide");
     });
      ;
}
