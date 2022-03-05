import './Figure.js';

class Circle extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles () {
    return `
     :host {

     }

   `;
  }

  connectedCallback () {
    this.render();
    this.mathSpace = this.shadowRoot.querySelector('MATHSPACE-FIGURE').shadowRoot;
    this.insertInputs();
  }

  render () {
    this.shadowRoot.innerHTML = `
    <style>${Circle.styles}</style>
    <mathspace-figure name="circle" style="--color-back: #00DE83; --color-figure: #22E997; --color-shadow-dark: 0 189 11; --color-shadow-white: 0 255 152;"></mathspace-figure>
    `;
  }

  insertInputs () {
    const form = this.mathSpace.querySelector('.figure__form');
    const htmlToAdd = `
      <label for="circle-ratio" class="circle__label">
        <span class="circle__ratio">Ratio</span>
        <input type="number" class="figure__input" id="circle-ratio" name="circle-ratio"/>
      </label>
    `;
    form.insertAdjacentHTML('afterbegin', htmlToAdd);
  }
}

customElements.define('mathspace-circle', Circle);
