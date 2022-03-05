// Figures classes
import { Circle } from '../figures/js/Circle.js';
import { Rectangle } from '../figures/js/Rectangle.js';
import { Triangle } from '../figures/js/Triangle.js';
import { Square } from '../figures/js/Square.js';

const DEFAULT_FIGURE = 'circle';

class Figure extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles () {
    return `
     :host {
        display: block;
        width: 90%;
        max-width: 400px;
        margin-bottom: 40px;
     }

     .figure {
        display: flex;
        flex-direction: column;
        padding: 15px 20px;
        border-radius:60px;
        text-align: center;
        background-color: var(--color-back);
     }

     .figure > *:not(.figure__name) {
        box-shadow:
                0px 6px 15px 0px rgb(var(--color-shadow-dark) / 25%),
                0px -11px 13px 0 rgb(var(--color-shadow-white) / 30%);
     }

     .figure__draw {
       align-self: center;
       background-color: var(--color-figure);
       animation: idle 1s infinite alternate;
     }

     @keyframes idle {
      0% {
        transform: translateY(0);
      }

      100% {
        transform: translateY(-8px);
      }
    }

     :host([name="circle"]) .figure__draw{
        width: 100px;
        height: 100px;
        border-radius: 50%;
     }

     :host([name="rectangle"]) .figure__draw{
      width: 140px;
      height: 80px;
     }

     :host([name="triangle"]) .figure__draw{
      width: 120px;
      height: 100px;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
     }

     :host([name="square"]) .figure__draw{
      width: 100px;
      height: 100px;
     }


     .figure__name {
       text-transform: capitalize;
       margin-top: 5px;
       font-size: 2.4rem;
       font-weight: 400;
       color: #fff;
     }

     .figure__form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px 0;
        margin-bottom: 20px;
      }

     .figure > .figure__form {
        box-shadow: none;
     }

     .figure > .figure__form {
        box-shadow: none;
     }

     .figure__form  input, .figure__form button {
        box-shadow:
                  0px 6px 15px 0px rgb(var(--color-shadow-dark) / 25%),
                  0px -11px 13px 0 rgb(var(--color-shadow-white) / 30%);
     }

     .figure__input, .figure__answer {
       width:100%;
       padding: 5px;
       font-size: 1.6rem;
       outline: none;
       background-color: var(--color-back);
       color: white;
       border: 0;
       border-radius: 8px;
     }

     .figure__units {
       font-weight: 700;
     }

     .figure__buttons {
       display: flex;
       justify-content: space-between;
     }

     .figure__btn {
       min-width: min-content;
       width: 30%;
       padding: 8px;
       border: 0;
       border-radius: 10px;
       font-size: 1.4rem;
       font-weight: 700;
       background-color: #fff;
       color: var(--color-back);
       cursor:pointer;
     }

     .figure__answer {
       font-size: 1.8rem;
       font-weight: 700;
     }

     .figure__input-name {
        display: block;
        margin-bottom: 8px;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: left;
        color: white;
     }

   `;
  }

  connectedCallback () {
    this.figureName = this.getAttribute('name'); ;
    if (!this.figureName) {
      this.figureName = DEFAULT_FIGURE;
      this.setAttribute('name', `${DEFAULT_FIGURE}`);
    }
    this.render();
    this.addInputs();
    this.aswerSpace = this.shadowRoot.querySelector('.figure__answer');
    this.addListeners();
  }

  render () {
    this.shadowRoot.innerHTML = `
    <style>${Figure.styles}</style>
    <div class="figure">
      <div class="figure__draw"></div>
      <h2 class="figure__name">${this.figureName}</h2>
      <form action="" class="figure__form">

        <input list="units" name="unit" id="unit" class="figure__input figure__units" value="cm">
        <datalist id="units" class="figure__dataList-units">
          <option value="cm" class="figure__option-unit"></option>
          <option value="m" class="figure__option-unit"></option>
          <option value="mm" class="figure__option-unit"></option>
        </datalist>

        <div class="figure__buttons">
          <button class="figure__btn" type="button">Area</button>
          <button class="figure__btn" type="button">Perimeter</button>
        </div>
      </form>

      <p class="figure__answer">
      </p>
    </div>`;
  }

  addListeners () {
    // create a instance of a figure
    const figure = this.getFigure().createInstance();

    // get the btn from shadow root
    const perimeterBtn = this.shadowRoot.querySelector('.figure__buttons .figure__btn:last-child');
    const areaBtn = this.shadowRoot.querySelector('.figure__buttons .figure__btn:first-child');

    // listeners
    areaBtn.addEventListener('click', () => {
      // get the data
      const data = this.getFigure().getData();
      // if some value of data is undefined just complete the fields
      if (!data) {
        this.aswerSpace.textContent = 'Complete all the fields';
        return;
      }
      // init the atributes in the instance of the figure
      figure.init(data);
      const area = figure.getArea();
      const units = this.shadowRoot.querySelector('#unit').value;

      this.aswerSpace.textContent = `Area: ${area.toFixed(2)} ${units}`;
    });
    perimeterBtn.addEventListener('click', () => {
      // get the data
      const data = this.getFigure().getData();
      // if some value of data is undefined just complete the fields
      if (!data) {
        this.aswerSpace.textContent = 'Complete all the fields';
        return;
      }
      // init the atributes in the instance of the figure
      figure.init(data);
      const perimeter = figure.getPerimeter();
      const units = this.shadowRoot.querySelector('#unit').value;

      this.aswerSpace.textContent = `Perimeter: ${perimeter.toFixed(2)} ${units}`;
    });
  }

  addInputs () {
    const form = this.shadowRoot.querySelector('.figure__form');
    form.insertAdjacentHTML('afterbegin', this.getFigure().inputs);
  }

  getFigure () {
    const figures = {
      circle: {
        inputs: `
          <label for="circle-ratio" class="figure__label">
            <span class="figure__input-name">Ratio</span>
            <input type="number" class="figure__input" id="circle-ratio" name="circle-ratio"/>
          </label>
        `,

        getData: () => {
          const data = {
            ratio: +this.shadowRoot.querySelector('#circle-ratio').value
          };

          const areGoodValues = Object.values(data).every(value => value);
          if (!areGoodValues) return null;

          return data;
        },

        createInstance () {
          return new Circle();
        }
      },
      rectangle: {
        inputs: `
          <label for="rectangle-base" class="figure__label">
            <span class="figure__input-name">Base</span>
            <input type="number" class="figure__input" id="rectangle-base" name="rectangle-base"/>
          </label>

          <label for="rectangle-height" class="figure__label">
            <span class="figure__input-name">Height</span>
            <input type="number" class="figure__input" id="rectangle-height" name="rectangle-height"/>
          </label>
        `,

        getData: () => {
          const data = {
            base: +this.shadowRoot.querySelector('#rectangle-base').value,
            height: +this.shadowRoot.querySelector('#rectangle-height').value
          };

          const areGoodValues = Object.values(data).every(value => value);
          if (!areGoodValues) return null;

          return data;
        },

        createInstance () {
          return new Rectangle();
        }

      },
      triangle: {
        inputs: `
          <label for="triangle__side" class="figure__label">
            <span class="figure__input-name">Side 1</span>
            <input type="number" class="figure__input" id="triangle__side1" name="triangle__side"/>
          </label>

          <label for="triangle__side2" class="figure__label">
            <span class="figure__input-name">Side 2</span>
            <input type="number" class="figure__input" id="triangle__side2" name="triangle__side2"/>
          </label>
        `,
        getData: () => {
          const data = {
            side1: +this.shadowRoot.querySelector('#triangle__side1').value,
            side2: +this.shadowRoot.querySelector('#triangle__side2').value
          };

          const areGoodValues = Object.values(data).every(value => value);
          if (!areGoodValues) return null;

          return data;
        },

        createInstance () {
          return new Triangle();
        }
      },
      square: {
        inputs: `
          <label for="square-side" class="figure__label">
            <span class="figure__input-name">Side</span>
            <input type="number" class="figure__input" id="square-side" name="square-side"/>
          </label>
        `,
        getData: () => {
          const data = {
            side: +this.shadowRoot.querySelector('#square-side').value
          };

          const areGoodValues = Object.values(data).every(value => value);
          if (!areGoodValues) return null;

          return data;
        },

        createInstance () {
          return new Square();
        }
      }
    };
    return figures[this.figureName ?? DEFAULT_FIGURE];
  }
}

customElements.define('mathspace-figure', Figure);
