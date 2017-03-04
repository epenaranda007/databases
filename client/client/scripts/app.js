var app = {};
$(document).ready(function () {
  app.server = 'http://127.0.0.1:3000/';
  // app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  app.friends = new Set();
  var username = window.location.search.split('username=')[1];
  console.log(username);

  $('body').on('click', function() { app.init(); });

  $('#refresh').on('click', function() {
    app.fetch();
    // reset to lobby option
    $('select').val('lobby').trigger('change');
  });
  
  $('#send').on('submit', function() {
    app.handleSubmit();
  });

  $('#chats').on('click', 'a', function() {
    var $userName = $(this).attr('class');
    // the following two rows add a class for friends but this is lost with refresh(fetch+render)
    // evenso, must keep else friendMessages class will not be added until refresh
    var $allFriendMessages = $('p.' + $userName);
    $allFriendMessages.addClass('friendMessages');
    
    // hide all that are not the selected profile (among viewable messages)
    var $friendMessages = $(this).closest('#chats').find('p:visible').filter('.' + $userName);
    $(this).closest('#chats').find('p:visible').hide();
    $friendMessages.show();

    // add to friends list and update friends count
    app.friends.add($userName);
    var arrayOfFriends = Array.from(app.friends);
    var friendsLength = arrayOfFriends.length;
    $('.length').text(friendsLength);

    // update friendsList
    // ul is outside of the #chats div so render does not replace the class effect
    var $newFriend = $('<li></li');
    $newFriend.text(arrayOfFriends[friendsLength - 1]);
    $newFriend.addClass($userName);
    if (!$('li').hasClass($userName)) {
      $('.friendsList,ul').append($newFriend);
    }
  });

  $('select').on('change', function() {
    $('p').show();
    var $currentRoom = $('select option:selected').text(); 
    // grab roomname from select menu
    var $messages = $('p');
    // select all messages (inside #chat)
    $messages.hide();
    var $roomsToShow = $('.' + $currentRoom);
    // select rooms with the selected option as a class
    $roomsToShow.show();
  });

  $('button').on('click', function() {
    $('.friendsList,ul').slideToggle('fast');
  });

  app.init = function() {
    $('.username').on('click', function() {
      app.handleUsernameClick.call(this);
    });
  };

  app.send = function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      contentType: 'application/JSON',
      dataType: 'json',

      data: JSON.stringify(message),
      success: function(data) {
        console.log('Chatter Box: message sent');
      }, 
      fail: function (data) {
        console.log('Chatter Box: message failed to send');
      }
    });
  };

  app.fetch = function() {
    app.clearMessages();
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/JSON',
      dataType: 'json',
      // data: 'order=-createdAt',

      success: function(data) {
        console.log(data);
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
          app.renderRoom(data.results[i].roomname);
        }
      }, 
      fail: function () {
        console.log('Chatter Box: failed to pull');
      }
    });
  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

  app.renderMessage = function(message) {
    var $message = $('<p></p>');
    var $username = $('<a href = "#"></a>');
    $username.text(message.username);
    $username.addClass(message.username);

    $message.text(': ' + message.text);
    $message.prepend($username);

    $message.addClass('username ' + message.roomname + ' ' + message.username);

    if (app.friends.has(message.username)) {
      $message.addClass('friendMessages');
    }

    $('#chats').append($message);
  };

  app.renderRoom = function(roomName) {
    var $room = $('<option></option>');
    $room.text(roomName);
    $room.addClass(roomName);
    if (!$('#roomSelect option').hasClass(roomName)) {
      // should protect against xss here 
      $('#roomSelect').append($room);
      // $('#roomSelect').append('<option class =' + roomName + '>' + roomName + '</option>');
    }
  };

  app.handleUsernameClick = function() {
    console.log('hi');
    $(this).addClass('clickedUser');
  };

  app.handleSubmit = function() {
    var $currentUsername = username;
    var $currentMessage = $('#message').val();
    var $currentRoom = $('#roomText').val() || $( '#roomSelect option:selected' ).text() || 'lobby';

    var message = {
      username: $currentUsername,
      text: $currentMessage,
      roomname: $currentRoom
    };
    if ($currentMessage.length) {
      app.send(message);
    }
  };
  app.fetch();
});
