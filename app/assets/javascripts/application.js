// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var currUserIndex = 0;
var userDivs = [];
var box;

// XXX
// I have two potential iteration variables, div id or global variable, which is better?

var createUserDisplay = function(divID, user) {
  var userDisplay = $('<div></div>');
  userDisplay.append('<img src="' + user.profile_image_url + '"><br>');
  userDisplay.append('<a href="http://www.twitter.com/' + user.screen_name +'">' + user.screen_name + '</a><br>');
  userDisplay.append(user.name + '<br>');
  userDisplay.append(user.description + '<br>');
  userDisplay.append(user.status.text);
  userDisplay.attr('id', divID);
  return userDisplay;
};

$(function() {

  box = $('#user-select');

  $.ajax({
    url: '/poems/select_user',
    dataType: 'json',
    type: 'GET'
  }).done(function(data) { //handle the json response
    console.log(data);

    $(data).each(function(index, user) { userDivs.push(createUserDisplay(index, user)); });
    box.html(userDivs[currUserIndex]);
  });

  $('#left-arrow').click(scrollLeft);
  $('#right-arrow').click(scrollRight);

});

var scrollLeft = function() {
  console.log('clicked');
  if (currUserIndex !== 0) {
    currUserIndex -= 1;
    box.html($(userDivs[currUserIndex]));
  }
};

var scrollRight = function() {
  console.log('r');
  if (currUserIndex < userDivs.length - 1) {
    currUserIndex += 1;
    box.html($(userDivs[currUserIndex]));
  }
};







