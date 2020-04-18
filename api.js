class Seriale{
    constructor(){
        this.url = "https://api.tvmaze.com/";
    }

    async search(serial){
        let response = await fetch(`${this.url}singlesearch/shows?q=${serial}`);
        let data = await response.json();
        return data;
    }

    async getEpisodes(id){
        let response = await fetch(`${this.url}shows/${id}/episodes`);
        let data = await response.json();
        return data;
    }

    async getSeasons(id){
        let response = await fetch(`${this.url}shows/${id}/seasons`);
        let data = await response.json();
        return data;
    }

    showAlert(property){
        const alert = document.createElement('div');
        alert.className = "p-2 text-center mb-3 mx-3";

        if(property === 'added'){
            alert.classList.add('bg-success');
            alert.appendChild(document.createTextNode('Serial added'))
        } else{
            alert.classList.add('bg-danger')
            alert.appendChild(document.createTextNode('Couldnt find the serial in the database'))
        }

        const parent = document.querySelector('.modal-content');
        parent.appendChild(alert);

        setTimeout(() => {alert.remove()}, 2000);
    }
}