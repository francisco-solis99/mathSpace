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
    this.answerPlace = this.mathSpace.querySelector('.figure__answer');
    // insert inputs according to the figure
    this.insertInputs();
    this.addListeners();
    console.log(this.getColors());
  }

  getColors () {
    const colorsObj = {
      colorBack: '#00DE83',
      colorFigure: '#22E997',
      colorShadowDark: '0 189 11',
      colorShadowWhite: '0 189 11'
    };

    return Object.entries(colorsObj)
      .map(([colorName, value]) => `--${colorName.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}: ${value}`)
      .join('; ');
  }

  render () {
    this.shadowRoot.innerHTML = `
    <style>${Circle.styles}</style>
    <mathspace-figure name="circle" style=${this.getColors()}>
    </mathspace-figure>
    `;
  }

  insertInputs () {
    const form = this.mathSpace.querySelector('.figure__form');
    const htmlToAdd = `
      <label for="circle-ratio" class="figure__label">
        <span class="figure__text-span">Ratio</span>
        <input type="number" class="figure__input" id="circle-ratio" name="circle-ratio"/>
      </label>
    `;
    form.insertAdjacentHTML('afterbegin', htmlToAdd);
  }

  addListeners () {
    const btnArea = this.mathSpace.querySelector('.figure__btn:first-child');
    const btnPerimeter = this.mathSpace.querySelector('.figure__btn:last-child');

    btnArea.addEventListener('click', () => this.getArea());
    btnPerimeter.addEventListener('click', () => this.getPerimeter());
  }

  getData () {
    const data = {
      ratio: +this.mathSpace.querySelector('#circle-ratio').value,
      unit: this.mathSpace.querySelector('#unit').value
    };

    const isValidateData = Object.values(data).every(element => element);
    if (!isValidateData) {
      this.answerPlace.textContent = 'Complete all the fields';
      return null;
    }

    return data;
  }

  getArea () {
    const data = this.getData();
    if (!data) return;
    const { ratio, unit } = data;
    const area = (ratio ** ratio) * Math.PI;

    this.answerPlace.innerHTML = `Area: ${area.toFixed(2)}${unit}<sup>2<sup>`;
  }

  getPerimeter () {
    const data = this.getData();
    if (!data) return;
    const { ratio, unit } = data;
    const perimeter = ratio * (Math.PI * 2);

    this.answerPlace.textContent = `Perimeter: ${perimeter.toFixed(2)}${unit}`;
  }
}

customElements.define('mathspace-circle', Circle);
