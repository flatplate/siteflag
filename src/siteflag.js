// var boxElem = $("</div>");
// boxElem.css("padding", "20px");
// boxElem.css("background-color", "gray");
// boxElem.css("position", "relative");
// boxElem.css("height", "200px");
// boxElem.css("width", "500px");
// boxElem.css("right", "-20px");
// boxElem.css("top", "-50px");
// boxElem.text("Suck a dick.");
// boxElem.attr("id", "flagBox");
// boxElem.css("z-index", "-1");


console.log("Suck a dick");

function closeButtonOnClick(event) {
    $("#flagBox").remove();
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
    
    console.log("Suck a dick");
    $("a").on('mouseover',function(e) {
        $this = $(this);
        if ($this.attr('href').startsWith("/")){
            return;
        }
        if (!timeoutId && !$this.find("#flagBox").length) {
            timeoutId = window.setTimeout(function() {
                closeButtonOnClick(null);
                timeoutId = null;
                console.log("Suck a dick");
                e = e || window.event;
                var pageX = e.clientX;
                var pageY = e.clientY;
                
                console.log(pageX);
                console.log(pageY);
                
                var boxElem = $("<div id='flagBox'></div>")
                //var boxElem = $(this).append("div");
                boxElem.css("padding", "20px");
                boxElem.css("background-color", "white");
                //boxElem.css("border-width", "2px");
                boxElem.css("border", "2px solid black");
                //boxElem.css("border-color", "black");
                boxElem.css("position", "fixed");
                boxElem.css("height", "100px");
                boxElem.css("width", "500px");
                boxElem.css("left", pageX + "px");
                boxElem.css("top", pageY + "px");
                var headerElem = $("<h3>" + $this.attr('href').split("/")[2] + "</h3>");
                
                headerElem.on("click", null);
                boxElem.append(headerElem);
                boxElem.css("z-index", "100");
                boxElem.click(function(event){
                    event.stopPropagation();
                });
                var buttonElem = $("<button id='closeButton'>x</button>");
                buttonElem.on("click", closeButtonOnClick);
                buttonElem.css("position", "absolute");
                buttonElem.css("right", "10px");
                buttonElem.css("top", "5px");
                boxElem.append(buttonElem);
                $("body").append(boxElem);
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