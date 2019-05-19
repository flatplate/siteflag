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
        if (!$this.attr('href').startsWith("http")){
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
                boxElem.css("border", "1px solid #E8E8E8");
                //boxElem.css("border-color", "black");
                boxElem.css("position", "fixed");
                //boxElem.css("height", "110px");
                //boxElem.css("width", "500px");
                boxElem.css("left", pageX + "px");
                boxElem.css("top", pageY + "px");
                boxElem.css("box-shadow", "0 4px 8px 0 rgba(0,0,0,0.2)");
                boxElem.css("tansition", "0.3s");
                boxElem.css("padding", "10px")
                

                var headerElem = $("<h3>" + $this.attr('href').split("/")[2] + "</h3>");
                
                headerElem.on("click", null);
                boxElem.append(headerElem);
                boxElem.css("z-index", "100");
                boxElem.click(function(event){
                    event.stopPropagation();
                });
                var textArea = $("<textarea id='textArea' rows='4' cols='60'></textarea>");
                textArea.css("float", "bottom");
                textArea.css("margin-top", "4px");
                textArea.css("resize", "none");
                textArea.css("font-family", "Arial, Helvetica, sans-serif");
                textArea.attr("placeholder", "Type here.....");
                /*
                var buttonElem = $("<button id='closeButton'>x</button>");
                buttonElem.on("click", closeButtonOnClick);
                buttonElem.css("position", "absolute");
                buttonElem.css("right", "10px");
                buttonElem.css("top", "5px");
                boxElem.append(buttonElem);
                */
               boxElem.append(textArea);
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