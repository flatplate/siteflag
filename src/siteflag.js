function closeButtonOnClick(event) {
    var flagBox = $("#flagBox");
    var url = flagBox.children("h3").text();
    var comment = $.trim($("#siteFlagTextArea").val());

    if (url && comment) {
        var sending = browser.runtime.sendMessage({url: url, comment: comment, type: "update"});
    }
    flagBox.remove();
}

function scrollEffect(event) {
    window.setTimeout(function() {
        $("#flagBox").remove();
    }, 60);
    
}

var timeoutId = null;

$(document).ready(function() {

    $(window).click(function() {
        closeButtonOnClick(null);
    });

    $(window).on("scroll",scrollEffect);

    $("a").on('mouseover',function(e) {
        $this = $(this);
        if (!$this.attr('href').startsWith("http")){
            return;
        }
        if (!timeoutId && !$this.find("#flagBox").length) {
            timeoutId = window.setTimeout(function() {
                closeButtonOnClick(null);
                timeoutId = null;
                e = e || window.event;
                var pageX = e.clientX;
                var pageY = e.clientY;
                
                var boxElem = $("<div id='flagBox'></div>")
                boxElem.css("padding", "20px");
                boxElem.css("background-color", "white");
                boxElem.css("border", "1px solid #E8E8E8");
                boxElem.css("position", "fixed");
                boxElem.css("left", pageX + "px");
                boxElem.css("top", pageY + "px");
                boxElem.css("box-shadow", "0 4px 8px 0 rgba(0,0,0,0.2)");
                boxElem.css("transition", "0.3s");
                boxElem.css("padding", "10px");
                
                var url = $this.attr('href').split("/")[2];
                var headerElem = $("<h3>" + url + "</h3>");
                
                headerElem.on("click", null);
                boxElem.append(headerElem);
                boxElem.css("z-index", "100");
                boxElem.click(function(event){
                    event.stopPropagation();
                });
                var textArea = $("<textarea id='siteFlagTextArea' rows='4' cols='60'></textarea>");
                textArea.css("float", "bottom");
                textArea.css("margin-top", "4px");
                textArea.css("resize", "none");
                textArea.css("font-family", "Arial, Helvetica, sans-serif");
                textArea.attr("placeholder", "Type here.....");

                boxElem.append(textArea);
                $("body").append(boxElem);


                var query = browser.runtime.sendMessage({
                    url: url, 
                    type: "get"
                });
                query.then(function(value) {
                    console.log(value);
                    textArea.text(value.comment);
                });
            }, 500);
            
        }
    });
    
    $("a").on('mouseout',function() {
        if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
        }
    });
    
})