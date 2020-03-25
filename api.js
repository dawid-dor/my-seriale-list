class Seriale{
    constructor(){
        this.url = "http://api.tvmaze.com/";
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
}