class MathSpaceHeader extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get styles () {
    return `
     :host {
      display: block;
     }

     .header {
      width: 100%;
      min-height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      background-color: var(--header-color);
    }

    .logo__wrapper {
      display: inline-block;
    }

    .logo__image {
      width: 100%;
      height: 100%;
    }

    .logo__title {
      margin-left: 8px;
      font-size: 3rem;
      font-weight: 700;
    }
   `;
  }

  connectedCallback () {
    this.render();
  }

  render () {
    this.shadowRoot.innerHTML = `
    <style>${MathSpaceHeader.styles}</style>
    <header class="header">
      <picture class="logo__wrapper">
        <img src="../assets/logoMathSpace.svg" alt="Logo de MathSpace" class="logo__image">
      </picture>
      <h1 class="logo__title">MathSpace</h1>
    </header>`;
  }
}

customElements.define('mathspace-header', MathSpaceHeader);
