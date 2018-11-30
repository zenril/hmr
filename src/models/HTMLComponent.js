export class HTMLComponent extends HTMLElement{
    constructor () {
        super();
    }

    connectedCallback () {
        this.render();
    }

    render() {
        throw new Error('You have to implement the method render');
    }

    element(type) {
        if(!type) return;
        let element = document.cr
        Object.assign
    }
}