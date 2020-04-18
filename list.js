class SerialeList{
    constructor(pos, img, name, score, userEpisodes, episodes, userSeasons, seasons, status, id){
        this.pos = pos;
        this.img = img;
        this.name = name;
        this.score = score;
        this.userEpisodes = userEpisodes;
        this.episodes = episodes;
        this.userSeasons = userSeasons;
        this.seasons = seasons;
        this.status = status;
        this.id = id;
    }

    inject(){
        // Cover
        const cover = document.createElement('img')
        cover.setAttribute('src', `${this.img}`);

        // Selectors
        const rowBody = document.createElement('tr');
        
        const watchStatus = document.createElement('td');
        const serialNumber = document.createElement('th');
        const coverRow = document.createElement('td');
        const serialName = document.createElement('td');
        const userScore = document.createElement('td');
        const episodes = document.createElement('td');
        const seasons = document.createElement('td');
        const status = document.createElement('td');
        const deleteRow = document.createElement('td');
        const deleteBtn = document.createElement('h5');


        // Text Nodes
        watchStatus.setAttribute('id', `serial-color-${this.id}`)
        watchStatus.classList.add('bg-info');

        serialNumber.appendChild(document.createTextNode(`${this.pos}`));
        coverRow.appendChild(cover);

        serialName.classList.add('font-weight-bold', 'text-success');
        serialName.appendChild(document.createTextNode(`${this.name}`));

        // User Score
        userScore.innerHTML = `<a href="javascript::" class="font-weight-bold text-primary" id="user-score-${this.id}">${this.score}</a>`

        // Episodes
        episodes.innerHTML = `<p><a href="javascript::" id="user-episodes-${this.id}">${this.userEpisodes}</a>/${this.episodes}</p>
                                <br>
                                <i class="fa fa-arrow-circle-o-up text-success number-up mr-1" id="user-episodes-up-${this.id}"></i><i class="fa fa-arrow-circle-o-down text-danger number-down" id="user-episodes-down-${this.id}"></i>`

        // Seasons
        seasons.innerHTML = `<p><a href="javascript::" id="user-seasons-${this.id}">${this.userSeasons}</a>/${this.seasons}</p>
                                <br>
                                <i class="fa fa-arrow-circle-o-up text-success number-up mr-1" id="user-seasons-up-${this.id}"></i><i class="fa fa-arrow-circle-o-down text-danger number-down" id="user-seasons-down-${this.id}"></i>`

        // Watch Status
        status.innerHTML = `<a href="#" id="status-${this.id}" class="text-info">${this.status}</a>`
        
        // Delete
        deleteBtn.appendChild(document.createTextNode('\xd7'));
        deleteBtn.setAttribute('id', `delete-${this.id}`);
        deleteBtn.classList.add('delete-cross');
        deleteRow.appendChild(deleteBtn);
        deleteRow.classList.add('text-danger', 'font-weight-bold', 'text-center');

        // Row Body
        rowBody.setAttribute('id', `serial-${this.id}`);
        rowBody.setAttribute('class', 'serial-row');

        // Append hidden status select window to status row
        this.statusList(status);

        // Append hidden score select window to score row
        this.scoreList(userScore);

        // Appending to row body
        rowBody.appendChild(watchStatus);
        rowBody.appendChild(serialNumber);
        rowBody.appendChild(coverRow);
        rowBody.appendChild(serialName);
        rowBody.appendChild(userScore);
        rowBody.appendChild(episodes);
        rowBody.appendChild(seasons);
        rowBody.appendChild(status);
        rowBody.appendChild(deleteRow);
        
        // Appending to seriale list
        document.getElementById('seriale-list').appendChild(rowBody);

        // Makes episode and season buttons interactable and saves them in Local Storage
        this.episodeUpDown();
        this.seasonUpDown();

        // Makes status changable
        this.setStatus();
        // Color Status
        this.colorStatus(this.status);

        // Makes score changable;
        this.setScore();
        
    }

    // Change color depending on the status - watching, completed etc.
    colorStatus(changeValue){
        const statusColor = document.getElementById(`serial-color-${this.id}`);
        const status = document.getElementById(`status-${this.id}`);
    
        switch(changeValue){
            case "Completed":
                statusColor.className = 'bg-success';
                status.className = 'text-success';
                break;
            case "Watching":
                statusColor.className = 'bg-info';
                status.className = 'text-info';
                break;
            case "Plan To Watch":
                statusColor.className = 'bg-secondary';
                status.className = 'text-secondary';
                break;
            case "Dropped":
                statusColor.className = 'bg-danger';
                status.className = 'text-danger';
                break;
            case "On Hold":
                statusColor.className = 'bg-warning';
                status.className = 'text-warning';
                break;
        }
    }

    // Change score by clicking on it
    setScore(){
        const score = document.getElementById(`user-score-${this.id}`);
        const scoreList = document.getElementById(`score-list-${this.id}`);
        score.addEventListener('click', () => {
            score.style.display = "none";
            scoreList.style.display="block";
            scoreList.addEventListener('input', (e) => {
                score.textContent = e.target.value;
                this.updateScore(this.id, e.target.value);
                score.style.display="block";
                scoreList.style.display="none";
            })
        })
    }

    // Change status by clicking on it
    setStatus(){
        const status = document.getElementById(`status-${this.id}`);
        const statusList = document.getElementById(`status-list-${this.id}`);
        status.addEventListener('click', () => {
            status.style.display="none";
            statusList.style.display="block";
            statusList.addEventListener('input', (e) => {
                const statusColor = document.getElementById(`serial-color-${this.id}`);
                if(e.target.value === "Completed") {
                    statusColor.className = '';
                    statusColor.classList.add('bg-success');

                    this.updateStatus(this.id, "Completed");

                    status.textContent = "Completed";
                    status.className = '';
                    status.classList.add('text-success');

                    status.style.display="block";
                    statusList.style.display="none";
                }

                if(e.target.value === "Watching") {
                    statusColor.className = '';
                    statusColor.classList.add('bg-info');

                    this.updateStatus(this.id, "Watching");

                    status.textContent = "Watching";
                    status.className = '';
                    status.classList.add('text-info');

                    status.style.display="block";
                    statusList.style.display="none";
                }

                if(e.target.value === "Plan To Watch") {
                    statusColor.className = '';
                    statusColor.classList.add('bg-secondary');

                    this.updateStatus(this.id, "Plan To Watch");

                    status.textContent = "Plan To Watch";
                    status.className = '';
                    status.classList.add('text-secondary');

                    status.style.display="block";
                    statusList.style.display="none";
                }

                if(e.target.value === "Dropped") {
                    statusColor.className = '';
                    statusColor.classList.add('bg-danger');

                    this.updateStatus(this.id, "Dropped");

                    status.textContent = "Dropped";
                    status.className = '';
                    status.classList.add('text-danger');

                    status.style.display="block";
                    statusList.style.display="none";
                }

                if(e.target.value === "On Hold") {
                    statusColor.className = '';
                    statusColor.classList.add('bg-warning');

                    this.updateStatus(this.id, "On Hold");

                    status.textContent = "On Hold";
                    status.className = '';
                    status.classList.add('text-warning');

                    status.style.display="block";
                    statusList.style.display="none";
                }

                

            })

        });

    }
    
    // Function that appends a hidden select table to make score changable
    scoreList(table){
        const scoreList = document.createElement("select");
        scoreList.setAttribute("id", `score-list-${this.id}`);
        scoreList.classList.add('mdb-select', 'custom-select', 'mr-n5');
        scoreList.style.display = "none";

        let lorem = document.createElement("option");
        lorem.value = "default";
        lorem.text = ""
        scoreList.appendChild(lorem);
        for(let i = 1; i <= 10; i++){
            let score = document.createElement("option");
            score.value = i;
            score.text = `${i}`;
            scoreList.appendChild(score);
        }

        table.appendChild(scoreList);
    }

    // Function that appends a hidden select table to make status changable
    statusList(table){
        const status = document.createElement("select");
        status.setAttribute("id", `status-list-${this.id}`);
        status.classList.add('mdb-select', 'custom-select', 'mr-n5');
        status.style.display = "none";

        const defaultOption = document.createElement("option");
        const watching = document.createElement("option");
        const completed = document.createElement("option");
        const dropped = document.createElement("option");
        const onHold = document.createElement("option");
        const planToWatch = document.createElement("option");

        defaultOption.value = "Default";
        watching.value = "Watching";
        completed.value = "Completed";
        dropped.value = "Dropped";
        onHold.value = "On Hold";
        planToWatch.value = "Plan To Watch";

        defaultOption.text = "Select status..."
        watching.text = "Watching";
        completed.text = "Completed";
        dropped.text = "Dropped";
        onHold.text = "On Hold";
        planToWatch.text = "Plan To Watch";

        status.appendChild(defaultOption);
        status.appendChild(watching);
        status.appendChild(completed);
        status.appendChild(dropped);
        status.appendChild(onHold);
        status.appendChild(planToWatch);

        table.appendChild(status);
    }

    // Function that makes episodes buttons work
    episodeUpDown(){
        const buttonUp = document.getElementById(`user-episodes-up-${this.id}`);
        const buttonDown = document.getElementById(`user-episodes-down-${this.id}`);
        let episode = this.userEpisodes;

        buttonUp.addEventListener('click', () => {
            if(episode < this.episodes)
            episode +=1;

            document.getElementById(`user-episodes-${this.id}`).textContent = `${episode}`;
            this.updateEpisodes(this.id, episode);
        });

        buttonDown.addEventListener('click', () => {
            if(episode > 0)
            episode -=1;
            document.getElementById(`user-episodes-${this.id}`).textContent = `${episode}`;
            this.updateEpisodes(this.id, episode);
        })
    }

    // Function that makes seasons buttons work
    seasonUpDown(){
        const seasonUp = document.getElementById(`user-seasons-up-${this.id}`);
        const seasonDown = document.getElementById(`user-seasons-down-${this.id}`);
        let season = this.userSeasons;

        seasonUp.addEventListener('click', () => {
            if(season < this.seasons)
            season +=1;

            document.getElementById(`user-seasons-${this.id}`).textContent = `${season}`;
            this.updateSeasons(this.id, season);
        });

        seasonDown.addEventListener('click', () => {
            if(season > 0)
            season -=1;

            document.getElementById(`user-seasons-${this.id}`).textContent = `${season}`;
            this.updateSeasons(this.id, season);
        })
    }


    // Functions to update certain values in local storage and in storage array - I tried to make it into one, single function, but couldn't really get it to work so I had to make few of those

    updateSeasons(id, changeValue){
        const data = JSON.parse(localStorage.getItem('seriale'));
        const filter = data.filter(element => element.id === id);
        filter[0].userSeasons = changeValue;
        for(let i = 0; i< serialeMemory.length; i++){
            if(serialeMemory[i].id === filter[0].id) serialeMemory[i].userSeasons = changeValue;
        }
        localStorage.setItem('seriale', JSON.stringify(serialeMemory));
        
    }
    updateEpisodes(id, changeValue){
        const data = JSON.parse(localStorage.getItem('seriale'));
        const filter = data.filter(element => element.id === id);
        filter[0].userEpisodes = changeValue;
        for(let i = 0; i< serialeMemory.length; i++){
            if(serialeMemory[i].id === filter[0].id) serialeMemory[i].userEpisodes = changeValue;
        }
        localStorage.setItem('seriale', JSON.stringify(serialeMemory));
        
    }
    updateStatus(id, changeValue){
        const data = JSON.parse(localStorage.getItem('seriale'));
        const filter = data.filter(element => element.id === id);
        filter[0].status = changeValue;
        for(let i = 0; i< serialeMemory.length; i++){
            if(serialeMemory[i].id === filter[0].id) {
                serialeMemory[i].status = changeValue
                
            };
        }
        localStorage.setItem('seriale', JSON.stringify(serialeMemory));
    }
    updateScore(id, changeValue){
        const data = JSON.parse(localStorage.getItem('seriale'));
        const filter = data.filter(element => element.id === id);
        filter[0].score = changeValue;
        for(let i = 0; i< serialeMemory.length; i++){
            if(serialeMemory[i].id === filter[0].id) {
                serialeMemory[i].score = changeValue
                
            };
        }
        localStorage.setItem('seriale', JSON.stringify(serialeMemory));
    }
}