

function setListeners(){
    document.getElementById("start").addEventListener('click', start);

    document.getElementById("ready").hidden=false;

}

function start() {
    document.getElementById("start").hidden=true;
    let target = new Date();
    target.setMinutes(target.getMinutes()+1);
    target.setSeconds(0);
    let now = new Date();
    while (now<target) {
        now = new Date();
        let abs = 123;
    }
    setInterval(checkSpot, 5000)
    //checkAction()
}


setTimeout(setListeners,3000);

function sendState(state){
    var xhr = new XMLHttpRequest();
    let params="?spot="+state+"&?time="+Date.now().toString();
    url='http://185.203.241.155:8080/'+params;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function()
    {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            resText=xhr.responseText;
           // alert("sended"+resText);
        } else resText="can not send state";
    };
    xhr.send();

}

function checkSpot() {
    try {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

            chrome.tabs.executeScript(tabs[0].id, {file: "parse.js"}, function (result) {
                try {
                    spot = result[0]["spot"];
                } catch (e) {
                    spot = "Exception!"
                }
                sendState(spot)

            });
        });
    } catch (e) {
        contin = false;
        setTimeout(function () {
            sendState("error")
        }, 100)

    }
}