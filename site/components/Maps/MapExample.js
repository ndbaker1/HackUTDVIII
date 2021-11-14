import React from "react";

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function MapExample() {
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    //infoWindow = new google.maps.InfoWindow();
    let lat = "40.748817";
    let lng = "-73.985428";
    const myLatlng = new google.maps.LatLng("32.978354", "-96.748451");
    const shelterLatlng = new google.maps.LatLng("33.013370", "-96.781360");
    const mapOptions = {
      zoom: 12,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#cbd5e0" }, { visibility: "on" }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    const svgMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
    };

    const currmarker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: svgMarker,
      title: "Current Location",
    });

    const contentString =
      '<div class="info-window-content"><h2>Current Location</h2><div>';
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    // google.maps.event.addListener(marker, "click", function () {
    //   //infowindow.open(map, marker);
    //   infowindow.open(map, shelterMarker);
    // });

    // infowindow.open(map, shelterMarker);

    console.log(navigator.geolocation);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          currmarker.setPosition(pos);
          //infowindow.setContent("Current Location");
          infowindow.open(map);
          map.setCenter(pos);

          currmarker.addListener('click', function() {
            infowindow.open(map, currmarker);
          });
        },
        () => {
          handleLocationError(true, infowindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infowindow, map.getCenter());
    }

    const features = [
      {
        position: new google.maps.LatLng(32.879510, -96.889190),
        label: "Tornado Shelter Co. Of Dallas",
      },
      {
        position: new google.maps.LatLng(32.884630, -96.676320),
        label: "Storm Dorms Tornado Shelters",
      },
      {
        position: new google.maps.LatLng(32.909900, -96.448850,),
        label: "FamilySAFE of Texas Tornado Shelters",
      },
      {
        position: new google.maps.LatLng(32.830780, -96.838460),
        label: "ArmourGuard Storm Shelters and Saferooms",
      },
      {
        position: new google.maps.LatLng(32.730560, -97.163770),
        label: "Safe Shelters Direct",
      },
      {
        position: new google.maps.LatLng(32.822300, -96.865750),
        label: "Great American Storm Shelters"
      },
      // {
      //   position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
      //   //type: "parking",
      // }
      // {
      //   position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
      //   //type: "library",
      // },
    ];
  
    // Create markers.
    for (let i = 0; i < features.length; i++) {
      const marker = new google.maps.Marker({
        position: features[i].position,
        //label: features[i].label,
        //icon: icons[features[i].type].icon,
        map: map,
      });

      const infowindowLabel = new google.maps.InfoWindow({
        content: features[i].label,
      });

      marker.addListener('click', function() {
        infowindowLabel.open(map, marker);
      });
    }


  });
  return (
    <>
      <div className="relative w-full rounded h-600-px">
        <div className="rounded h-full" ref={mapRef} />
      </div>
    </>
  );
}

export default MapExample;
