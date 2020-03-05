var data = new Date();
var hours = data.getHours();
var minutes = data.getMinutes();

var currentTime = hours + ':' + minutes;
// console.log(currentTime);

// Azione invio tramite icona
$('.sent-msg').click(function() {
    sentMessage();
    randomReply();
});

// Azione invio tramite tasto Enter
$('#write-msg').keydown(function(event) {
    switch (event.key) {
        case 'Enter':
            sentMessage();
            randomReply();
            $('.sent-msg').hide();
            $('.record-audio').show();
            break;
        default:

    }
});

// Focus sull'input Scrivi un messaggio --> Scompare icona microfono e compare icona invio
// $('#write-msg').focus(function() {
//     $('.record-audio').hide();
//     $('.sent-msg').show();
// });

//
$('#write-msg').keyup(function(event){
    if($(this).val() != '') {
        $('.record-audio').hide();
        $('.sent-msg').show();
    } else {
        $('.sent-msg').hide();
        $('.record-audio').show();
    }
});

// Filtro ricerca amici
$('#friends-search-input').keyup(function(event){
    var searchInputValue = $(this).val().toLowerCase();
    console.log(searchInputValue);
    $('#friends-list-container .friend-container').each(function() {
        if($(this).find('.friend-name').text().toLowerCase().includes(searchInputValue)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});
// FUNZIONI /////////////////////////////////////////////////////
// Invio messaggio
function sentMessage() {
    var writeMsg = $('#write-msg').val();
    console.log(writeMsg);
    $('#write-msg').val('');
    var clonedSent = $('.templates-msgs .row-sent').clone();
    console.log(clonedSent);
    $(clonedSent).find('.sent-text').text(writeMsg);
    $(clonedSent).find('.sent-time').text(currentTime);
    $('.history-messages-container').append(clonedSent);
}

// Messaggio di risposta random
function randomReply() {
    setTimeout(function() {
        var clonedReceived = $('.templates-msgs .row-received').clone();
        console.log(clonedReceived);
        $(clonedReceived).find('.received-text').text('OK');
        $(clonedReceived).find('.received-time').text(currentTime);
        $('.history-messages-container').append(clonedReceived);
    }, 1000);
}
