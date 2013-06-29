//FirstView Component Constructor
function FirstView() {
    //create object instance, a parasitic subclass of Observable
    var self = Ti.UI.createView();
    var webview = Titanium.UI.createWebView({
    });

    webview.setHtml('<html><body><h1>SAY SOMETHING!</h1></body></html>');
    self.add(webview);
    //Add behavior for UI

    interval = setInterval(function() {
        if (Titanium.Network.online == true) {
            var request = Titanium.Network.createHTTPClient();
            request.enableKeepAlive = true;
            request.setTimeout(100000000);
            request.open('GET', "http://slnode-onpaas.rhcloud.com/rest/smsmessage");
            request.send();
            request.onload = function() {
                var messages = JSON.parse(request.responseText);
                if (messages.length > 0) {
                    var allMessages = "<html><body>";
                    for (var i = 0; i < messages.length; i++) {
                        if (i < 22) {
                            allMessages += ("<font color='red'>" + messages[i].FromCity + ", " + messages[i].FromState + " said: </font>" + messages[i].Body + "</br>");
                        }
                    };
                    allMessages += "</body></html>";
                    webview.setHtml(allMessages);
                }
            };
        }
    }, 2000);
    return self;
}

module.exports = FirstView;
