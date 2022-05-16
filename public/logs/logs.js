getData();
async function getData() {
    const response = await fetch('/myApiEndPoint');
    const dataBase = await response.json();
    for (item of dataBase) {
        const root = document.createElement('p');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image64 = document.createElement('img');
        

        mood.textContent = `mood:${item.mood}`;
        geo.textContent = `${item.lat},${item.lon}`;
        date.textContent = new Date(item.timestamp).toLocaleString();
        image64.src = item.image64;
        root.append(mood, geo, date, image64);
        document.body.append(root);
    }

}

//to do
//add sorting otpion based on latest added and mood