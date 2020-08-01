$(document).ready(function(){
    $("#urlpost").hide();
    $("#type").hide(); 
    $("#textpost").focus();
    $('button').on('click', function() {
      $('button').removeClass('active');
      $(this).addClass('active');
    });
    $("#text").click(function(){
      $( ".value" ).val("text");
      $("#textpost").show();
      $("#urlpost").hide();
    });
    $("#url").click(function(){
      $( ".value" ).val("link");
      $("#urlpost").show();
      $("#textpost").hide();
    });
});