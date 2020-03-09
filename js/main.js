var data = new Date();
var hours = data.getHours();
var minutes = data.getMinutes();
// console.log(minutes);
if (minutes < 10) {
    minutes = '0' + minutes;
}
var currentTime = hours + ':' + minutes;
// console.log(currentTime);

// Azione invio tramite icona
$('.sent-msg').click(function() {
    sentMessage();
    randomReply();
});

// Azione invio tramite tasto Enter
$(document).on('keypress', '.active-chat-container.visible .write-msg' ,function() {
    if(event.key == 'Enter') {
        sentMessage();
        randomReply();
        $('.sent-msg').hide();
        $('.record-audio').show();
    }
});

// $('.write-msg').keypress(function(event) {         // alla pressione del tasto enter
//      if(event.key == 'Enter') {
//          sentMessage();
//          randomReply();
//          $('.sent-msg').hide();
//          $('.record-audio').show();
//      }
// });
// $('.write-msg').keydown(function(event) {
//     switch (event.key) {
//         case 'Enter':
//             sentMessage();
//             randomReply();
//             $('.sent-msg').hide();
//             $('.record-audio').show();
//             break;
//         default:
//
//     }
// });

// Focus sull'input Scrivi un messaggio --> Scompare icona microfono e compare icona invio
// $('.write-msg').focus(function() {
//     $('.record-audio').hide();
//     $('.sent-msg').show();
// }).blur(function() {
//     $('.record-audio').show();
//     $('.sent-msg').hide();
// });

// Controllo se c'è del testo nell'input, lo spazio non viene considerato
$(document).on('keyup', '.active-chat-container.visible .write-msg' ,function() {
    if($(this).val().trim() != '') {
        $('.record-audio').hide();
        $('.sent-msg').show();
    } else {
        $('.sent-msg').hide();
        $('.record-audio').show();
    }
});

// $('.active-chat-container.visible .write-msg').keyup(function(event){
//     if($(this).val().trim() != '') {
//         $('.record-audio').hide();
//         $('.sent-msg').show();
//     } else {
//         $('.sent-msg').hide();
//         $('.record-audio').show();
//     }
// });

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

// Collego lista amici alla chat
$(document).on('click', '.friend-container', function(){
    if (!$(this).hasClass('active')) {
        $('.friend-container').removeClass('active');
        $(this).addClass('active');
    }
    var friendId = $(this).data('friendId');
    console.log(friendId);
    $('.active-chat-container').each(function(){
        var chatId = $(this).data('chatId');
        console.log(chatId);
        if ((friendId == chatId) && $(this).hasClass('hidden')) {
            $('.active-chat-container').removeClass('visible');
            $('.active-chat-container').addClass('hidden');
            $(this).removeClass('hidden');
            $(this).addClass('visible');
        }
    });
    if($('.active-chat-container.visible .write-msg').val().trim() != '') {
        $('.record-audio').hide();
        $('.sent-msg').show();
    } else {
        $('.sent-msg').hide();
        $('.record-audio').show();
    }
});

// $('.friend-container').click(function(){
//     if (!$(this).hasClass('active')) {
//         $('.friend-container').removeClass('active');
//         $(this).addClass('active');
//     }
//     var friendId = $(this).data('friendId');
//     console.log(friendId);
//     $('.active-chat-container').each(function(){
//         var chatId = $(this).data('chatId');
//         console.log(chatId);
//         if ((friendId == chatId) && $(this).hasClass('hidden')) {
//             $('.active-chat-container').removeClass('visible');
//             $('.active-chat-container').addClass('hidden');
//             $(this).removeClass('hidden');
//             $(this).addClass('visible');
//         }
//     });
//     if($('.active-chat-container.visible .write-msg').val().trim() != '') {
//         $('.record-audio').hide();
//         $('.sent-msg').show();
//     } else {
//         $('.sent-msg').hide();
//         $('.record-audio').show();
//     }
// });

// Menu a tendina opzioni messaggio
$(document).on('mouseenter', '.msg-container', function(){
    $(this).find('.msg-icon-options').removeClass('hidden');
});

$(document).on('mouseleave', '.msg-container', function(){
    $(this).find('.msg-icon-options').addClass('hidden');
});
// $('.msg-container').mouseenter(function(){
//     $(this).find('.msg-icon-options').removeClass('hidden');
// }).mouseleave(function(){
//     $(this).find('.msg-icon-options').addClass('hidden');
// });


// FUNZIONI /////////////////////////////////////////////////////
// Scroll
function scroll() {
    var pixelScroll = $('.history-messages-container').height();
    $('.history-messages-container').scrollTop(pixelScroll);
}

// Invio messaggio
function sentMessage() {
    var writeMsg = $('.active-chat-container.visible .write-msg').val();
    // console.log(writeMsg);
    $('.active-chat-container.visible .write-msg').val('');
    var clonedSent = $('.templates-msgs .row-sent').clone();
    // console.log(clonedSent);
    $(clonedSent).find('.sent-text').text(writeMsg);
    $(clonedSent).find('.sent-time').text(currentTime);
    $('.active-chat-container.visible .history-messages-container').append(clonedSent);
    scroll();
}

// Messaggio di risposta random
function randomReply() {
    setTimeout(function() {
        var clonedReceived = $('.templates-msgs .row-received').clone();
        console.log(clonedReceived);
        $(clonedReceived).find('.received-text').text(poligen);
        $(clonedReceived).find('.received-time').text(currentTime);
        $('.active-chat-container.visible .history-messages-container').append(clonedReceived);
        scroll();
    }, 1000);
}

// POLIGEN //
var poligen = $('.polygenOutput').text();
// console.log(poligen);
