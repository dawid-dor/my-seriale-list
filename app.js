// Global vars
const seriale = new Seriale();

const addSerialInput = document.getElementById("add-serial-input");
const addSerialBtn = document.getElementById("add-serial-button");

let serialeMemory = [];
const serialeList = document.getElementById('seriale-list');


// Category
const categoryName = document.getElementById('category');

const allSeriale = document.getElementById('category-all_seriale');
allSeriale.addEventListener('click', () => {
    categoryFilterReset();
    categoryFilter('none');
});

const watching = document.getElementById('category-watching');
watching.addEventListener('click', () => {
    categoryFilterReset();
    categoryFilter('bg-info');
});

const completed = document.getElementById('category-completed');
completed.addEventListener('click', () => {
    categoryFilterReset();
    categoryFilter('bg-success');
});

const onHold = document.getElementById('category-on-hold');
onHold.addEventListener('click', () => {
    categoryFilterReset();
    categoryFilter('bg-warning');
});

const dropped = document.getElementById('category-dropped');
dropped.addEventListener('click', () => {
    categoryFilterReset();
    categoryFilter('bg-danger');
});

const planToWatch = document.getElementById('category-plan-to-watch');
planToWatch.addEventListener('click', () => {
    categoryFilterReset();
    categoryFilter('bg-secondary');
});

// Serial Information
document.addEventListener("DOMContentLoaded", readFromMemory);

// Add serial
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

function categoryFilterReset(){
    const serialRow = document.querySelectorAll('.serial-row');
    serialRow.forEach(element => element.style.display = "");
}

function categoryFilter(category){
    const serialRow = document.querySelectorAll('.serial-row');
    serialRow.forEach(element => {
        const status = element.cells[0].className;
        switch(category){
            case 'bg-danger':
                console.log('Dropped');
                if(category !== status){
                    element.style.display="none";
                    categoryName.textContent = "Dropped";
                }
                break;
            case 'bg-info':
                console.log('Watching');
                if(category !== status){
                    element.style.display="none";
                    categoryName.textContent = "Currently Watching";
                    
                }
                break;
            case 'bg-success':
                console.log('Completed');
                if(category !== status){
                    element.style.display="none";
                    categoryName.textContent = "Completed";
                }
                break;
            case 'bg-secondary':
                console.log('Plan To Watch');
                if(category !== status){
                    element.style.display="none";
                    categoryName.textContent = "Plan To Watch";
                }
                break;
            case 'bg-warning':
                console.log('On Hold');
                if(category !== status){
                    element.style.display="none";
                    categoryName.textContent = "On Hold";
                }
                break;
            case 'none':
                console.log('All Seriale')
                element.style.display="";
                categoryName.textContent = "All Seriale";
                break;
        }
    })
}



function readFromMemory(){
    const data = JSON.parse(localStorage.getItem('seriale'));
    data.forEach(element => {
        serialeMemory.push(element);
        let serialInMemory = new SerialeList(element.pos, element.img, element.name, element.score, element.userEpisodes, element.episodes,element.userSeasons, element.seasons, element.status, element.id);
        serialInMemory.inject();
    });
    deleteSerialRow();
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
