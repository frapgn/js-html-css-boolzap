var data = new Date();
var hours = data.getHours();
var minutes = data.getMinutes();
// console.log(minutes);
if (minutes < 10) {
    minutes = '0' + minutes;
}
var currentTime = hours + ':' + minutes;

// Azione invio tramite icona
$('.right-column').on('click', '.sent-msg', function(){
    sentMessage();
    randomReply();
});

// $('.sent-msg').click(function() {
//     sentMessage();
//     randomReply();
// });

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


// db message template
var dbMsgTemplateSrc = $('#db-message-template').html();
var dbMsgTemplate = Handlebars.compile(dbMsgTemplateSrc);
// end db message template

// friend in list template
var friendInListSrc = $('#friend-in-list-template').html();
var friendInListTemlpate = Handlebars.compile(friendInListSrc);
// end friend in list template

// active chat template
var activeChatSrc = $('#active-chat-template').html();
var activeChatTemplate = Handlebars.compile(activeChatSrc);
// end active chat template

// "Database" amici
var friendsDB = {
    nc1: {
        name: 'Rocco',
        avatar: "img/1.png",
        messages: [
            {
                text: 'Ciao mi chiamo Rocco e mi piacciono le patatine',
                direction: 'received'
            },
            {
                text: 'Con o senza salsa?',
                direction: 'sent'
            }
        ]
    },
    nc2: {
        name: 'Ernesto',
        avatar: "img/2.png",
        messages: [
            {
                text: 'Ciao mi chiamo Ernesto e non mi piace stare all\'esterno',
                direction: 'received'
            },
            {
                text: 'Piacere anagramma di Esterno',
                direction: 'sent'
            }
        ]
    },
    nc3: {
        name: 'Pablo Escobar',
        avatar: "img/3.png",
        messages: [
            {
                text: 'Io esco, vado al Bar',
                direction: 'sent'
            },
            {
                text: 'Ti raggiungo appena finisco di tagliere questo cadavere',
                direction: 'received'
            }
        ]
    },
    nc4: {
        name: 'Michelo',
        avatar: "img/4.png",
        messages: [
            {
                text: 'Sono bipolare',
                direction: 'received'
            },
            {
                text: 'Ok',
                direction: 'sent'
            }
        ]
    },
    nc5: {
        name: 'Leonardo',
        avatar: "img/5.png",
        messages: [
            {
                text: 'É stata una giornata intensa',
                direction: 'sent'
            },
            {
                text: 'Ma divertente',
                direction: 'received'
            }
        ]
    },
    nc6: {
        name: 'Walker T.R.',
        avatar: "img/6.png",
        messages: [
            {
                text: 'Ho imparato il calcio volante',
                direction: 'sent'
            },
            {
                text: 'Che paura',
                direction: 'received'
            }
        ]
    },
    nc7: {
        name: 'Rachele',
        avatar: "img/7.png",
        messages: [
            {
                text: 'Stasera da te?',
                direction: 'sent'
            },
            {
                text: 'Ho già installato i pannelli fonoassorbenti',
                direction: 'received'
            }
        ]
    },
    nc8: {
        name: 'Avvocato',
        avatar: "img/8.png",
        messages: [
            {
                text: 'Sei un incompetente',
                direction: 'sent'
            },
            {
                text: 'Ero ubriaco...',
                direction: 'received'
            }
        ]
    }
};

// sent messages from friendsDB
function sentDBMessage(textMessage, msgDirection, chatSelector) {
    var message = {
        text: textMessage,
        direction: msgDirection,
        time: currentTime
    };
    var dbMsgTemplateHTML = dbMsgTemplate(message);
    $(chatSelector).append(dbMsgTemplateHTML);

    scroll();
};

for (var nChat in friendsDB) {
    // console.log(nChat);
    // console.log(friendsDB[nChat]);
    chatNumber = nChat[2];

    // Creo html lista amici
    friendInfo = {
        friendName: friendsDB[nChat].name,
        friendID: chatNumber,
        chatID: chatNumber,
        friendAvatar: friendsDB[nChat].avatar
    }
    friendInListTemlpateHTML = friendInListTemlpate(friendInfo);
    $('#friends-list-container').append(friendInListTemlpateHTML);

    //creo chat corrispondente
    activeChatTemplateHTML = activeChatTemplate(friendInfo);
    $('.right-column').append(activeChatTemplateHTML);

    var chatMessages = friendsDB[nChat].messages;

    for (var i = 0; i < chatMessages.length; i++) {
        var textMessage = chatMessages[i].text;
        var msgDirection = chatMessages[i].direction;

        var chatSelector = $('.active-chat-container[data-chat-id="' + chatNumber + '"] .history-messages-container');

        sentDBMessage(textMessage, msgDirection, chatSelector);
    }
}

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
};

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
};

// Handlebars received template
var receivedSource = $('#received-template').html();
var receivedTemplate = Handlebars.compile(receivedSource);

function randomReply() {
    setTimeout(function() {

        var receivedMsg = {
            receivedText: poligen,
            msgTime: currentTime
        };

        var receivedHTML = receivedTemplate(receivedMsg);
        $('.active-chat-container.visible .history-messages-container').append(receivedHTML);
        scroll();
    }, 1000);
};

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
