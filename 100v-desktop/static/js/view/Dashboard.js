import AbstactView from "./AbstactView.js"

export default class extends AbstactView{
    constructor(){
        super();
        this.setTitle("Dashboard")
    }

    //we use asyc bocouse you can add inf from api
    async getHtml(){
        return "Hello";
    }
}
