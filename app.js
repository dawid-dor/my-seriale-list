const seriale = new Seriale();

const addSerialInput = document.getElementById("add-serial-input");
const addSerialBtn = document.getElementById("add-serial-button");

let serialeMemory = [];

const serialeList = document.getElementById('seriale-list');


// Serial Information
document.addEventListener("DOMContentLoaded", readFromMemory);


addSerialBtn.addEventListener('click', () => {
    const name = addSerialInput.value;
    addSerialInput.value = '';
    seriale.search(name)
    .then(data => {
        const serialName = data.name;
        const cover = data.image.medium;
        const serialID = data.id;
        seriale.getEpisodes(serialID)
        .then(data => {
            const episodes = data.length;
            seriale.getSeasons(serialID)
            .then(data => {
                const seasons = data.length;
                let newSerial = new SerialeList(serialeMemory.length+1 ,cover, serialName, 0, 0, episodes, 0, seasons, 'Watching', serialID);
                serialeMemory.push(newSerial);
                localStorage.setItem('seriale', JSON.stringify(serialeMemory));
                newSerial.inject();

                // Delete Button
                document.getElementById(`delete-${serialID}`).addEventListener('click', () => {
                    const currentRow = document.getElementById(`serial-${serialID}`)
                    currentRow.parentNode.removeChild(currentRow);

                    const IDs = serialeMemory.map(element => element.id);
                    const idToDelete = serialeMemory.filter(element => element.id === serialID).map(element => element.id).reduce((last, current) => last + current);
                    const index = IDs.indexOf(idToDelete);
                    serialeMemory.splice(index, 1);
                    localStorage.setItem('seriale', JSON.stringify(serialeMemory));
                });


            })
        })
    })
})


function readFromMemory(){
    const data = JSON.parse(localStorage.getItem('seriale'));
    data.forEach(element => {
        serialeMemory.push(element);
        let serialInMemory = new SerialeList(element.pos, element.img, element.name, element.score, element.userEpisodes, element.episodes,element.userSeasons, element.seasons, element.status, element.id);
        serialInMemory.inject(); //Creates list from class
    });
    deleteSerialRow(); //method to delete the whole row from list and from local storage
}



function deleteSerialRow(){
    const data = JSON.parse(localStorage.getItem('seriale'));
    const IDs = data.map(element => element.id);

    for(let i = 0; i< IDs.length; i++){
        document.getElementById(`delete-${IDs[i]}`).addEventListener('click', () => {
            const currentRow = document.getElementById(`serial-${IDs[i]}`)
            currentRow.parentNode.removeChild(currentRow);

            const idToDelete = data.filter(element => element.id === IDs[i]).map(element => element.id).reduce((last, current) => last + current);
            const index = IDs.indexOf(idToDelete);
            data.splice(index, 1);
            localStorage.setItem('seriale', JSON.stringify(data));
        });
    }
}
