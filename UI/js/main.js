const myFunction = () => {
    let x = document.querySelector("#myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

const icon = document.querySelector('.icon');

icon.addEventListener('click', myFunction);

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        const inputLoc = document.querySelector('.content .entry-box .body .addlocation input');
        const inputLoc2 = document.querySelector('.modal-content .body .addloc input');
        // Get location data
        var latlong = "Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude;
        inputLoc.value = latlong;
        inputLoc2.value = latlong;
    });
} else {
    console.log('Geolocation Not Supported');
}



const showMap = () => {
    document.querySelector('.content .entry-box .body button').style.display = 'none';
    document.querySelector('.content .entry-box .body .addlocation').style.display = "block";
}

const showGeo = () => {
    document.querySelector('.modal-content .body .btnLoc').style.display = 'none';
    document.querySelector('.modal-content .body .addloc').style.display = "block";
}

const addLoc = document.querySelector('.content .entry-box .body button');

const editLoc = document.querySelector('.modal-content .body .btnLoc');

addLoc.addEventListener('click', showMap);
editLoc.addEventListener('click', showGeo);

const autoGrow = (el) => {
    el.style.height = "5px";
    el.style.height = (el.scrollHeight) + "px";
};