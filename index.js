var map;
var rectangles = [];
var count = 0;
var score = 0;

var min = 0;
var sec = 0;
var csec = 0;
var timeElapsed = 0;
var timerOn = false;
var formattedTimer;
var functionTimer;
const theTimer = document.querySelector(".timer");

var scores = [];

// all google map stuff happens here
function initMap() {
  //setup the google maps and locations for your game; make sure it cant be revealed when hovered
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.24099357342392, lng: -118.52692382118829 },
    zoom: 15.5,
    disableDefaultUI: true,
    gestureHandling: "none",
  });
  map.setOptions({ styles: styles["hide"] });

  //Physical Power Management building
  rectangles[0] = new google.maps.Rectangle({
    clickable: false,
    bounds: {
      north: 34.24468988421333,
      south: 34.24296929896279,
      east: -118.5300663488957,
      west: -118.53204313693968,
    },
  });

  //Tennis fields
  rectangles[1] = new google.maps.Rectangle({
    clickable: false,
    bounds: {
      north: 34.24433134740937,
      south: 34.24347105551596,
      east: -118.52356201607697,
      west: -118.52455041009895,
    },
  });

  //Student recreation center
  rectangles[2] = new google.maps.Rectangle({
    clickable: false,
    bounds: {
      north: 34.24035318202122,
      south: 34.239492849469016,
      east: -118.52441093928289,
      west: -118.52539933330488,
    },
  });

  //Sierra Quad
  rectangles[3] = new google.maps.Rectangle({
    clickable: false,
    bounds: {
      north: 34.23894163574275,
      south: 34.238081288764825,
      east: -118.528799666081389,
      west: -118.52978806010337,
    },
  });

  //check the round
  if (count < 4)
    //check if the person double clicks in the map
    map.addListener("dblclick", (e) => {
      //start the timer if it hasnt already started
      if (timerOn !== true) started();
      //check if their hasnt been four rounds
      if (count < 4) {
        //used dom element to manipulate the bootstrap classes and change the look
        //check if the clicked area is in the game location
        checkLocation(e.latLng, map, count);
        document.getElementById("location-" + count).classList.remove("active");
        //change the next round visuals
        if (count + 1 < 4) {
          document
            .getElementById("location-" + (count + 1))
            .classList.add("active");
          document.getElementById("location-" + (count + 1)).style.display =
            "block";
        }
        count++;
        //wjem the game ends, show the score
        if (count === 4) {
          timerOn = false;
          clearInterval(functionTimer);
          document.getElementById("scoreCard").style.display = "block";
          document.getElementById("score").innerHTML =
            score + "/4 in " + format();
          var ratio = (score / 4) * timeElapsed;
          var totalScore = [score, format, timeElapsed, ratio];
          scores.push(totalScore);
        }
      }
    });
}

//check the location if it contains and see if it hits(green) or not(red)
function checkLocation(latLng, map, i) {
  if (rectangles[i].getBounds().contains(latLng)) {
    rectangles[i].setOptions({
      strokeColor: "#00FF00",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#00FF00",
      fillOpacity: 0.35,
      map,
    });
    insertAfter(correctMsg(), document.getElementById("location-" + count));
    score++;
  } else if (!rectangles[i].getBounds().contains(latLng)) {
    rectangles[i].setOptions({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
    });
    insertAfter(incorrectMsg(), document.getElementById("location-" + count));
    if (score < 0) score--;
  }
}

//insert the win or loss message after the round ui
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//loss msg
function incorrectMsg() {
  var incorrect = document.createElement("li");
  incorrect.classList.add("list-group-item", "list-group-item-danger", "thick");
  incorrect.textContent = "Sorry wrong location.";
  return incorrect;
}

//win msg
function correctMsg() {
  var correct = document.createElement("li");
  correct.classList.add("list-group-item", "list-group-item-success");
  correct.textContent = "Your answer is correct!";
  return correct;
}

//format timer with 2 digits in each section
function format() {
  return (formattedTimer =
    (min < 10 ? "0" + min : min) +
    ":" +
    (sec < 10 ? "0" + sec : sec) +
    ":" +
    (csec < 10 ? "0" + csec : csec));
}

//start the timer with the units of min/sec/csec
function timerStart() {
  functionTimer = setInterval(() => {
    csec++;
    timeElapsed++;
    if (csec / 100 == 1) {
      csec = 0;
      sec++;
    }
    if (sec / 60 == 1) {
      sec = 0;
      min++;
    }
    theTimer.innerHTML = format();
  }, 10);
}

//start and turn on timer
function started() {
  timerStart();
  timerOn = true;
}

//json map styling
var styles = {
  hide: [
    {
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
};

window.initMap = initMap;
