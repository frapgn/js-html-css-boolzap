var data = new Date();
var hours = data.getHours();
var minutes = data.getMinutes();

var currentTime = hours + ':' + minutes;
console.log(currentTime);

$('.sent-msg').click(function() {
    // Invio messaggio
    var writeMsg = $('#write-msg').val();
    console.log(writeMsg);
    $('#write-msg').val('');
    var clonedSent = $('.templates-msgs .row-sent').clone();
    console.log(clonedSent);
    $(clonedSent).find('.sent-text').text(writeMsg);
    $(clonedSent).find('.sent-time').text(currentTime);
    $('.history-messages-container').append(clonedSent);

    // Risposta random
    setTimeout(function() {
        var clonedReceived = $('.templates-msgs .row-received').clone();
        console.log(clonedReceived);
        $(clonedReceived).find('.received-text').text('OK');
        $(clonedReceived).find('.received-time').text(currentTime);
        $('.history-messages-container').append(clonedReceived);
    }, 1000);

})

$('#write-msg').focus(function() {
    $('.record-audio').hide();
    $('.sent-msg').show();
})
