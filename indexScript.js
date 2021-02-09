var inside = false;
var placed = false;
var divTl;
var checkViewPort = setInterval(() => {
        try {

            var myElement = document.getElementById('animatedDiv');
            var elementLeft = myElement.style.left;
            var pIndex = elementLeft.indexOf("p");
            elementLeft = parseInt(elementLeft.substr(0, pIndex));


            var bounding = myElement.getBoundingClientRect();
            var myElementHeight = myElement.offsetHeight;
            var myElementWidth = myElement.offsetWidth;

            if (bounding.top >= -myElementHeight + 150 &&
                bounding.bottom + 150 <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight) {
                inside = true;
            } else {
                inside = false;
            }

            if (inside) {
                divTl = new TimelineMax();
                if (!placed) {
                    divTl.fromTo(myElement, .2, { left: elementLeft }, { left: "0px" });
                    placed = true;
                }
                console.log("Were In");
            } else {
                if (placed) {
                    divTl.fromTo(myElement, .2, { left: elementLeft }, { left: "-450px" });
                    placed = false;
                }
                console.log("Were Out");
            }
        } catch {

        }


    },
    50);