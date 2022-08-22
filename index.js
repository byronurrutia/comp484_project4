var map;
var rectangles = [];
var i = 0;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.24099357342392, lng: -118.52692382118829 },
    zoom: 15.5,
    disableDefaultUI: true,
    gestureHandling: "none",
  });
  map.setOptions({ styles: styles["hide"] });

  rectangles[0] = new google.maps.Rectangle({
    clickable: false,
    bounds: {
      north: 34.24468988421333,
      south: 34.24296929896279,
      east: -118.5300663488957,
      west: -118.53204313693968,
    },
  });

  rectangles[1] = new google.maps.Rectangle({
    clickable: false,
    bounds: {
      north: 34.24433134740937,
      south: 34.24347105551596,
      east: -118.52356201607697,
      west: -118.52455041009895,
    },
  });

  rectangles[2] = new google.maps.Rectangle({
    clickable: false,
    bounds: {
      north: 34.24035318202122,
      south: 34.239492849469016,
      east: -118.52441093928289,
      west: -118.52539933330488,
    },
  });

  rectangles[3] = new google.maps.Rectangle({
    clickable: false,
    bounds: {
      north: 34.23894163574275,
      south: 34.238081288764825,
      east: -118.528799666081389,
      west: -118.52978806010337,
    },
  });

  map.addListener("click", (e) => {
    checkLocation(e.latLng, map, i);
    if (i < 4) {
      i++;
    }
  });
}

function checkLocation(latLng, map, i) {
  if (rectangles[i].getBounds().contains(latLng))
    rectangles[i].setOptions({
      strokeColor: "#00FF00",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#00FF00",
      fillOpacity: 0.35,
      map,
    });
  else if (!rectangles[i].getBounds().contains(latLng))
    rectangles[i].setOptions({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
    });
}

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
