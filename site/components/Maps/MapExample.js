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

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      //animation: google.maps.Animation.DROP,
      title: "Alt Location",
    });

    const currmarker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      //animation: google.maps.Animation.DROP,
      title: "Current Location",
    });

    const shelterMarker = new google.maps.Marker({
      position: shelterLatlng,
      map: map,
      title: "Hello World!",
    });

    const contentString =
      '<div class="info-window-content"><h2>Current Location</h2><div>'; //+
      //"<p>A free Admin for Tailwind CSS, React, React Hooks, and NextJS.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    // google.maps.event.addListener(marker, "click", function () {
    //   //infowindow.open(map, marker);
    //   infowindow.open(map, shelterMarker);
    // });

    infowindow.open(map, shelterMarker);

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

    // const iconBase =
    // "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    // const icons = {
    //   parking: {
    //     icon: iconBase + "parking_lot_maps.png",
    //   },
    //   library: {
    //     icon: iconBase + "library_maps.png",
    //   },
    //   info: {
    //     icon: iconBase + "info-i_maps.png",
    //   },
    // };

    const features = [
      {
        position: new google.maps.LatLng(32.879510, -96.889190),
        label: "Tornado Shelter Co. Of Dallas"
        // type: "info",
      },
      {
        position: new google.maps.LatLng(32.884630, -96.676320),
        label: "Storm Dorms Tornado Shelters",
        // type: "info",
      },
      // {
      //   position: new google.maps.LatLng(-33.91747, 151.22912),
      //   // type: "info",
      // },
      // {
      //   position: new google.maps.LatLng(-33.9191, 151.22907),
      //   // type: "info",
      // },
      // {
      //   position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
      //   //type: "parking",
      // },
      // {
      //   position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
      //   //type: "parking",
      // },
      // {
      //   position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
      //   //type: "parking",
      // },
      // {
      //   position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
      //   //type: "parking",
      // },
      // {
      //   position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
      //   //type: "library",
      // },
    ];
  
    // Create markers.
    for (let i = 0; i < features.length; i++) {
      const marker2 = new google.maps.Marker({
        position: features[i].position,
        label: features[i].label,
        //icon: icons[features[i].type].icon,
        map: map,
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
