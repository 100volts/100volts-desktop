import AbstactView from "./AbstactView.js"

export default class extends AbstactView{
    constructor(){
        super();
        this.setTitle("Profile")
    }

    //we use asyc bocouse you can add inf from api
    async getHtml(){
        return `
            <h1> GElo h1 profile</h1>
        `;
    }
}
