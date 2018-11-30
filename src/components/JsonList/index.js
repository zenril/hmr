export class JsonList extends HTMLElement{
    constructor (aa) {
        super();
        console.log(this);
    }

    connectedCallback () {
        this.render();
    }

    render () {
        //this.
        // var span = document.createElement('span');
        // span.innerText = "item " + i;
        // this.appendChild(span);
    }
}

customElements.define('json-list', JsonList);