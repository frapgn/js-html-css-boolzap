$('.record-audio').click(function() {
    // Invio messaggio
    var writeMsg = $('#write-msg').val();
    console.log(writeMsg);
    $('#write-msg').val('');
    var clonedSent = $('.templates-msgs .row-sent').clone();
    console.log(clonedSent);
    var writeClonedSent = $(clonedSent).find('.sent-text').text(writeMsg);
    $('.history-messages-container').append(clonedSent);

    // Risposta random
    setTimeout(function() {
        var clonedReceived = $('.templates-msgs .row-received').clone();
        console.log(clonedReceived);
        var writeClonedReceived = $(clonedReceived).find('.received-text').text('OK');
        $('.history-messages-container').append(clonedReceived);
    }, 2000);

})
