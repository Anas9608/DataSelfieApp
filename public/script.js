function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320, 240);
    let lat;
    let long;
    //processes submitted mood from submit mood
    const button = document.getElementById("submit");
    button.addEventListener('click', async event => {
        const mood = document.getElementById('mood').value;
        video.loadPixels();
        const image64 = video.canvas.toDataURL();

        //data object to be sent to the server
        const data = {
            lat,
            lon,
            mood,
            image64
        };
        //packing my options object with required data
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        //sending post request object with given options to server.js at 127.0.0.1:<port>
        const res = await fetch('/myApiEndPoint', options);
        //recieving response object sent back from the server 
        //and console logging in client side 
        const jsonRes = await res.json();
        console.log(jsonRes);
    });

    if ('geolocation' in navigator) {

        /* geolocation is available */
        console.log('geolocation available');

        navigator.geolocation.getCurrentPosition(async (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;


            document.getElementById("lat").textContent = lat;
            document.getElementById("lon").textContent = lon;


            const myMap = L.map('myMap').setView([lat, lon], 3);

            //get my tiles for the map
            const attri_obj = {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',

                accessToken: 'pk.eyJ1Ijoib2Jpd2FuMDgiLCJhIjoiY2wyd3ZydG5wMGUxNjNkbG9oMHJtbHVmbSJ9.sxalBLotDYCA4bge6dWW7g',
                maxZoom: 200,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
            };
            const tile_url =
                'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';

            //adding tiles to my map
            L.tileLayer(tile_url, attri_obj).addTo(myMap);

            //add marker to map
            const marker = L.marker([lat, lon]).addTo(myMap);
        })
    } else {
        /* geolocation IS NOT available */
        console.log('geolocation is not available');
    }

}