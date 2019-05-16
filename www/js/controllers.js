angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('TablaCtrl', function($scope) {})

.controller('GameCtrl', function($scope) {
    var BoxOpened = "";
    var ImgOpened = "";
    var Counter = 0;
    var ImgFound = 0;

    var Source = "#boxcard";

    var ImgSource = [
      "memo/1.png",
      "memo/2.png",
      "memo/3.png",
      "memo/4.png",
      "memo/5.png",
      "memo/6.png",
      "http://img2.uploadhouse.com/fileuploads/17699/1769925824ea93cbb77ba9e95c1a4cec7f89b80c.png",
      "http://img7.uploadhouse.com/fileuploads/17699/1769925708af4fb3c954b1d856da1f4d4dcd548a.png",
      "http://img9.uploadhouse.com/fileuploads/17699/176992568b759acd78f7cbe98b6e4a7baa90e717.png",
      "http://img9.uploadhouse.com/fileuploads/17699/176992554c2ca340cc2ea8c0606ecd320824756e.png"
    ];

function RandomFunction(MaxValue, MinValue) {
        return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
    }
    
function ShuffleImages() {
    var ImgAll = $(Source).children();
    var ImgThis = $(Source + " div:first-child");
    var ImgArr = new Array();

    for (var i = 0; i < ImgAll.length; i++) {
        ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
        ImgThis = ImgThis.next();
    }
    
        ImgThis = $(Source + " div:first-child");
    
    for (var z = 0; z < ImgAll.length; z++) {
    var RandomNumber = RandomFunction(0, ImgArr.length - 1);

        $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
        ImgArr.splice(RandomNumber, 1);
        ImgThis = ImgThis.next();
    }
}

    $scope.ResetGame = function() {
    ShuffleImages();
    $(Source + " div img").hide();
    $(Source + " div").css("visibility", "visible");
    Counter = 0;
    $("#success").remove();
    $("#counter").html("" + Counter);
    BoxOpened = "";
    ImgOpened = "";
    ImgFound = 0;
    return false;
}

function OpenCard() {
    var id = $(this).attr("id");

    if ($("#" + id + " img").is(":hidden")) {
        $(Source + " div").unbind("click", OpenCard);
    
        $("#" + id + " img").slideDown('fast');

        if (ImgOpened == "") {
            BoxOpened = id;
            ImgOpened = $("#" + id + " img").attr("src");
            setTimeout(function() {
                $(Source + " div").bind("click", OpenCard)
            }, 300);
        } else {
            CurrentOpened = $("#" + id + " img").attr("src");
            if (ImgOpened != CurrentOpened) {
                setTimeout(function() {
                    $("#" + id + " img").slideUp('fast');
                    $("#" + BoxOpened + " img").slideUp('fast');
                    BoxOpened = "";
                    ImgOpened = "";
                }, 400);
            } else {
                $("#" + id + " img").parent().css("visibility", "hidden");
                $("#" + BoxOpened + " img").parent().css("visibility", "hidden");
                ImgFound++;
                BoxOpened = "";
                ImgOpened = "";
            }
            setTimeout(function() {
                $(Source + " div").bind("click", OpenCard)
            }, 400);
        }
        Counter++;
        $("#counter").html("" + Counter);

        if (ImgFound == ImgSource.length) {
            $("#counter").prepend('<span id="success">Felicidades Encontraste Todas...</span>');
        }
    }
}

$(function() {

for (var y = 1; y < 3 ; y++) {
    $.each(ImgSource, function(i, val) {
        $(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
    });
}
    $(Source + " div").click(OpenCard);
    ShuffleImages();
});
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
