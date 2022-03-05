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
        max-width: 800px;
        margin: 0 auto;
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
     }

     :host([name="circle"]) .figure__draw{
        width: 100px;
        height: 100px;
        border-radius: 50%;
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

   `;
  }

  connectedCallback () {
    this.figureName = this.getAttribute('name'); ;
    if (!this.figureName) {
      this.figureName = DEFAULT_FIGURE;
      this.setAttribute('name', `${DEFAULT_FIGURE}`);
    }
    this.render();
  }

  render () {
    this.shadowRoot.innerHTML = `
    <style>${Figure.styles}</style>
    <div class="figure">
      <div class="figure__draw"></div>
      <h2 class="figure__name">${this.figureName}</h2>
      <form action="" class="figure__form">
        <input list="units" name="unit" id="unit" class="figure__input figure__units">
        <datalist id="units" class="figure__dataList-units">
          <option value="cm" class="figure__option-unit"></option>
          <option value="m" class="figure__option-unit"></option>
          <option value="mm" class="figure__option-unit"></option>
        </datalist>

        <div class="figure__buttons">
          <button class="figure__btn">Area</button>
          <button class="figure__btn">Perimeter</button>
        </div>
      </form>

      <p class="figure__answer">
        Perimeter:81<span class="figure__answer-unit">cm</span>
      </p>
  </div>`;
  }
}

customElements.define('mathspace-figure', Figure);
