var data = new Date();
var hours = data.getHours();
var minutes = data.getMinutes();
// console.log(minutes);
if (minutes < 10) {
    minutes = '0' + minutes;
}
var currentTime = hours + ':' + minutes;

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

// Menu a tendina opzioni messaggio
$(document).on('mouseenter', '.msg-container', function(){
    $(this).find('.msg-icon-options').removeClass('hidden');
});

$(document).on('mouseleave', '.msg-container', function(){
    if ($(this).find('.msg-options-container').hasClass('hidden')) {
        $(this).find('.msg-icon-options').addClass('hidden');
    }
});

$(document).on('click', '.msg-icon-options', function(){
    $(this).find('.msg-options-container').toggleClass('hidden');
});

$(document).on('click', '.delete-msg', function(){
    $(this).parentsUntil('.history-messages-container').remove('.msg-row');
});


// FUNZIONI /////////////////////////////////////////////////////
// Scroll
function scroll() {
    var pixelScroll = $('.history-messages-container').height();
    $('.history-messages-container').scrollTop(pixelScroll);
}

// Handlebars sent template
var sentSource = $('#sent-template').html();
var sentTemplate = Handlebars.compile(sentSource);

function sentMessage() {
    var writeMsg = $('.active-chat-container.visible .write-msg').val();
    $('.active-chat-container.visible .write-msg').val('');

    var sentMsg = {
        sentText: writeMsg,
        msgTime: currentTime
    };

    var sentHTML = sentTemplate(sentMsg);
    $('.active-chat-container.visible .history-messages-container').append(sentHTML);
    scroll();
}

// Handlebars received template
var receivedSource = $('#received-template').html();
var receivedTemplate = Handlebars.compile(receivedSource);

function randomReply() {
    setTimeout(function() {

        receivedMsg = {
            receivedText: poligen,
            msgTime: currentTime
        };

        receivedHTML = receivedTemplate(receivedMsg);
        $('.active-chat-container.visible .history-messages-container').append(receivedHTML);
        scroll();
    }, 1000);
}

// Invio messaggio
// function sentMessage() {
//     var writeMsg = $('.active-chat-container.visible .write-msg').val();
//     $('.active-chat-container.visible .write-msg').val('');
//     var clonedSent = $('.templates-msgs .row-sent').clone();
//     $(clonedSent).find('.sent-text').text(writeMsg);
//     $(clonedSent).find('.msg-time').text(currentTime);
//     $('.active-chat-container.visible .history-messages-container').append(clonedSent);
//     scroll();
// }

// Messaggio di risposta random
// function randomReply() {
//     setTimeout(function() {
//         var clonedReceived = $('.templates-msgs .row-received').clone();
//         console.log(clonedReceived);
//         $(clonedReceived).find('.received-text').text(poligen);
//         $(clonedReceived).find('.msg-time').text(currentTime);
//         $('.active-chat-container.visible .history-messages-container').append(clonedReceived);
//         scroll();
//     }, 1000);
// }

// POLIGEN //
var poligen = $('.polygenOutput').text();
// console.log(poligen);
