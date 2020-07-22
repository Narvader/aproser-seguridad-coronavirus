// START ----> ARRAY FROM WORKING FOR IE11

if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
// FINISH ----> ARRAY FROM WORKING FOR IE11

var scroll25 = false;
var scroll50 = false;
var scroll75 = false;
var scroll100 = false;

var viewportHeight = window.innerHeight;
var viewportWidth = window.innerWidth;

var offsetScroll

var footer = document.getElementById('footer');
var sharing = document.getElementById("sharing")

var videoIsVisible = true;

var characterButton = document.getElementsByClassName('button');
var contentDropped = document.getElementsByClassName('dropdown__content');
var frame = document.getElementsByClassName('frame');

// MAIN LOGIC
main();


// TO DROP CHARACTER
Array.from(characterButton).forEach(function(el) {
  el.addEventListener('click', displayCharacter);
});


function displayCharacter() {
  //For display info of the character
  var buttonSection = this.getAttribute("id");
  var section = document.getElementById(buttonSection).parentNode.parentNode.parentNode;
  
  var sectionToDrop = section.children;

  sectionToDrop[1].classList.toggle("unfold");

  var dropped = sectionToDrop[1].children;
  if(sectionToDrop[1].classList.contains("unfold")) {
    dropped[0].classList.add('visible');
  } else {
    dropped[0].classList.remove('visible');
  }

  //For change text of button
  var buttonText = document.getElementById(buttonSection).childNodes;
  if( buttonText[0].innerHTML === "Lee su historia") {
    buttonText[0].innerHTML = "Cerrar historia";
  } else {
    buttonText[0].innerHTML = "Lee su historia";
  }

  //For change appareance of the button
  document.getElementById(buttonSection).classList.toggle('opened');

}


window.addEventListener('scroll', function(){

  scrollActiv();

  var scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
  if ( scrollTop > viewportHeight ){
    sharing.classList.add("visible")
  } else {
    sharing.classList.remove("visible")
  }

  if(isMobile()){
    if( isElementInViewport(footer) ) {
      sharing.classList.remove("visible")
    }
  }

});

function main() {
  setRRSSLinks();
  onBoardVisible();
}


function onBoardVisible() {

  for(var i = 0; i < frame.length; i++) {
    if(!frame[i].classList.contains('visible')) {
        frame[i].classList.add('visible')
      }
  }

}

function isElementInViewport(el) {
    var scroll = window.scrollY || window.pageYOffset
    var boundsTop = el.getBoundingClientRect().top + scroll
    
    var viewport = {
        top: scroll,
        bottom: scroll + viewportHeight,
    }
    
    var bounds = {
        top: Math.floor(boundsTop) + el.offsetHeight,
        bottom: boundsTop + el.clientHeight,
    }


    return ( (viewport.bottom > bounds.top) && (viewport.top < bounds.bottom) ) 
}

function scrollActiv(){  
  scrollPercent = getScrollPercent();
  if (typeof universalGa !== 'undefined') {
    if ( scrollPercent >= 25 ) {
      if ( !scroll25 ) {
            universalGa('brands.send', 'event', 'Especial Aproser - la seguridad con el coronavirus', 'scroll', 'Scroll Depth 25%', {nonInteraction: true});
            universalGa('t1.send', 'event', 'Especial Aproser - la seguridad con el coronavirus', 'scroll', 'Scroll Depth 25%');
          scroll25 = true;
      }
    }
    if ( scrollPercent >= 50 ) {
      if ( !scroll50 ) {
           universalGa('brands.send', 'event', 'Especial Aproser - la seguridad con el coronavirus', 'scroll', 'Scroll Depth 50%', {nonInteraction: true});
            universalGa('t1.send', 'event', 'Especial Aproser - la seguridad con el coronavirus', 'scroll', 'Scroll Depth 50%');
          scroll50 = true;
      }
    }
    if ( scrollPercent >= 75 ) {
        if ( !scroll75 ) {
            universalGa('brands.send', 'event', 'Especial Aproser - la seguridad con el coronavirus', 'scroll', 'Scroll Depth 75%', {nonInteraction: true});
            universalGa('t1.send', 'event', 'Especial Aproser - la seguridad con el coronavirus', 'scroll', 'Scroll Depth 75%');
          scroll75 = true;
      }
    }
    if ( scrollPercent >= 100 ) {
      if ( !scroll100 ) {
            universalGa('brands.send', 'event', 'Especial Aproser - la seguridad con el coronavirus', 'scroll', 'Scroll Depth 100%', {nonInteraction: true});
            universalGa('t1.send', 'event', 'Especial Aproser - la seguridad con el coronavirus', 'scroll', 'Scroll Depth 100%');
          scroll100 = true;
      }
    }
  }
}

function getScrollPercent() {

  var height = document.documentElement.clientHeight;
    var scrollHeight = document.documentElement.scrollHeight - height;
    var scrollTop = document.documentElement.scrollTop;
    var percent = Math.round(scrollTop / scrollHeight * 100);

  return percent;
}


function setRRSSLinks() {
    var urlPage = window.location.href;

    //Facebook
    var shareFB = document.getElementById("shareFB")
    var fbHref = "https://www.facebook.com/sharer/sharer.php?u="+urlPage
    shareFB.setAttribute("href",fbHref)

    //Twitter
    var shareTW = document.getElementById("shareTW")
    var twText = shareTW.getAttribute("data-text")
    var twHref = "https://twitter.com/intent/tweet?url="+urlPage+"&text="+twText+"&original_referer="+urlPage
    shareTW.setAttribute("href",twHref)

    //Linkedin
    var shareLK = document.getElementById("shareLK")
    var lkText = shareLK.getAttribute("data-text")
    var lkHref = "https://www.linkedin.com/shareArticle?mini=true&url="+urlPage+"&title="+lkText+"&summary=&source="
    shareLK.setAttribute("href",lkHref)

    //WhatsApp
    var shareWA = document.getElementById("shareWA")
    var waText = shareWA.getAttribute("data-text")
    var waHref = "https://api.whatsapp.com/send?text="+waText+" "+urlPage
    shareWA.setAttribute("href",waHref)
}

function isMobile() {
  return viewportWidth < 768
}