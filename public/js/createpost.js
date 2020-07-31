$(document).ready(function(){
    $("#urlpost").hide(); 
    $("#textpost").focus();
    $('button').on('click', function() {
      $('button').removeClass('active');
      $(this).addClass('active');
    });
    $("#text").click(function(){
      $("#textpost").show();
      $("#urlpost").hide();
    });
    $("#url").click(function(){
      $("#urlpost").show();
      $("#textpost").hide();
    });
});