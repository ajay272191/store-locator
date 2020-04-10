
window.onload = function() {
}

var map;
var markers = [];
var infoWindow;

function initMap() {
    var losAngeles = {
        lat: 34.063380,
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        mapTypeId: 'roadmap',
        zoom: 13,
         styles: [
           {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
           {
             featureType: 'administrative.locality',
             elementType: 'labels.text.fill',
             stylers: [{color: '#d59563'}]
           },
           {
             featureType: 'poi',
             elementType: 'labels.text.fill',
             stylers: [{color: '#d59563'}]
           },
           {
             featureType: 'poi.park',
             elementType: 'geometry',
             stylers: [{color: '#263c3f'}]
           },
           {
             featureType: 'poi.park',
             elementType: 'labels.text.fill',
             stylers: [{color: '#6b9a76'}]
           },
           {
             featureType: 'road',
             elementType: 'geometry',
             stylers: [{color: '#38414e'}]
           },
           {
             featureType: 'road',
             elementType: 'geometry.stroke',
             stylers: [{color: '#212a37'}]
           },
           {
             featureType: 'road',
             elementType: 'labels.text.fill',
             stylers: [{color: '#9ca5b3'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'geometry',
             stylers: [{color: '#746855'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'geometry.stroke',
             stylers: [{color: '#1f2835'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'labels.text.fill',
             stylers: [{color: '#f3d19c'}]
           },
           {
             featureType: 'transit',
             elementType: 'geometry',
             stylers: [{color: '#2f3948'}]
           },
           {
             featureType: 'transit.station',
             elementType: 'labels.text.fill',
             stylers: [{color: '#d59563'}]
           },
           {
             featureType: 'water',
             elementType: 'geometry',
             stylers: [{color: '#17263c'}]
           },
           {
             featureType: 'water',
             elementType: 'labels.text.fill',
             stylers: [{color: '#515c6d'}]
           },
           {
             featureType: 'water',
             elementType: 'labels.text.stroke',
             stylers: [{color: '#17263c'}]
           }
         ]
    });
    infoWindow = new google.maps.InfoWindow();
    searchStores();
}

function searchStores(){
    var foundStores = [];
    var zipCode = document.getElementById('zip-code-input').value;
    if(zipCode){
        for(var store of stores){
            var postal = store['address']['postalCode'].substring(0, 5);
            if(postal == zipCode){
                foundStores.push(store);
            }
        }
    } else {
        foundStores = stores;
    }
    clearLocations();
    displayStores(foundStores);
    showStoresMarkers(foundStores);
    setOnClickListener();
}

function clearLocations(){
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
}

function setOnClickListener(){
    var storeElements = document.querySelectorAll('.store-container');
    storeElements.forEach(function(elem, index){
        elem.addEventListener('mouseover', function(){
            new google.maps.event.trigger(markers[index], 'mouseover');
            new google.maps.event.trigger(markers[index], 'click');
        })
    })
}

function displayStores(stores){
    var storesHtml = '';
    for(var [index, store] of stores.entries()){
        var address = store['addressLines'];
        var phone = store['phoneNumber'];
        storesHtml += `
            <div class="store-container">
                <div class="store-container-background">
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${address[0]}</span>
                            <span>${address[1]}</span>
                        </div>
                        <div class="store-phone-number">${phone}</div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">
                            ${index+1}
                        </div>
                    </div>
                </div>
            </div>
        `
        document.querySelector('.stores-list').innerHTML = storesHtml;
    }
}


function showStoresMarkers(stores){
    var bounds = new google.maps.LatLngBounds();
    for(var [index, store] of stores.entries()){
        var latlng = new google.maps.LatLng(
            store["coordinates"]["latitude"],
            store["coordinates"]["longitude"]);
        var name = store["name"];
        var address = store["addressLines"][0];
        var openStatusText = store["openStatusText"]
        var phoneNumber = store["phoneNumber"];
        bounds.extend(latlng);
        createMarker(latlng, name, address, openStatusText, phoneNumber, index+1);
    }
    map.fitBounds(bounds);
}


function createMarker(latlng, name, address, openStatusText, phoneNumber, index){
    var html = `
      <div class="store-info-window" style="color:green; display:inline;">
        <div style="padding-left:15px;">
          <p fort-weight="600"><b>${name}</b></p>
          <p>${openStatusText}</p>
        </div>
        <div style="display:flex; text-align:center; justify-content:center">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRwIJ4q1fM4rOnjQ_VS-g_nJ8SCOGuxMR6u7K3eyR-TIQ2twIdz&usqp=CAU" height="35" width="42" display="inline">
          <p>${address}</p>
          </div>

        <div style="display:flex; text-align:center; justify-content:center padding-left:0px">
          <img src="https://img.icons8.com/dotty/2x/call-male.png" height="35" width="42" display="inline">
          <p>${phoneNumber}</p>
        </div>
      </div>
    `;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      draggable:true,
      icon:'https://img.icons8.com/color/2x/shopping-basket-2.png',
      animation: google.maps.Animation.DROP,
      label: index.toString()
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    google.maps.event.addListener(marker,'click', function toggleBounce(){
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    });
    markers.push(marker);
}
