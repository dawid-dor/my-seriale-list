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
        watchStatus.classList.add('bg-info');
        serialNumber.appendChild(document.createTextNode(`${this.pos}`));
        coverRow.appendChild(cover);

        serialName.classList.add('font-weight-bold', 'text-success');
        serialName.appendChild(document.createTextNode(`${this.name}`));

        // User Score
        userScore.innerHTML = `<a href="#" class="font-weight-bold text-primary" id="user-score-${this.id}">${this.score}</a>`

        // Episodes
        episodes.innerHTML = `<p><a href="#" id="user-episodes-${this.id}">${this.userEpisodes}</a>/${this.episodes}</p>
                                <br>
                                <i class="fa fa-arrow-circle-o-up text-success number-up" id="user-episodes-up-${this.id}"></i> / <i class="fa fa-arrow-circle-o-down text-danger number-down" id="user-episodes-down-${this.id}"></i>`

        // Seasons
        seasons.innerHTML = `<p><a href="#" id="user-seasons-${this.id}">${this.userSeasons}</a>/${this.seasons}</p>
                                <br>
                                <i class="fa fa-arrow-circle-o-up text-success number-up" id="user-seasons-up-${this.id}"></i> / <i class="fa fa-arrow-circle-o-down text-danger number-down" id="user-seasons-down-${this.id}"></i>`

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
    }
}