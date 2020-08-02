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
      $( "#urlar" ).val("");
      $("#textpost").show();
      $("#urlpost").hide();
    });
    $("#url").click(function(){
      $( ".value" ).val("link");
      $( "#textar" ).val("");
      $("#urlpost").show();
      $("#textpost").hide();
    });
});

function submitForm() {
  var frm = document.getElementById('createpostform');
  frm.submit(); 
  return false; 
}
