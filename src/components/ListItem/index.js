export class ListItem extends HTMLElement{
    constructor () {
        super();
    }

    connectedCallback () {
        this.render()
    }

    render () {
    }
}

customElements.define('json-list', JsonList);