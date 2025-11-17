class MyCalculator extends HTMLElement {
  constructor() {
	super();
	this.attachShadow({ mode: 'open' });

	this.shadowRoot.innerHTML = `
	  <style>
		.calculator {
		  border: 2px solid #444;
		  border-radius: 8px;
		  padding: 1rem;
		  display: grid;
		  grid-template-columns: repeat(4, 60px);
		  grid-gap: 10px;
		  justify-content: center;
		  background: #f9f9f9;
		  font-family: Arial, sans-serif;
		  width: max-content;
		}
		input {
		  grid-column: span 2;
		  padding: 5px;
		  font-size: 1rem;
		  text-align: right;
		  border: 1px solid #ccc;
		  border-radius: 4px;
		}
		button {
		  padding: 10px;
		  font-size: 1rem;
		  border: none;
		  border-radius: 4px;
		  background: #eee;
		  cursor: pointer;
		  transition: background 0.2s;
		}
		button:hover {
		  background: #ddd;
		}
		.output {
		  grid-column: span 4;
		  text-align: right;
		  font-size: 1.2rem;
		  font-weight: bold;
		  padding: 5px;
		  border-top: 1px solid #ccc;
		  margin-top: 10px;
		}
	  </style>
	  <div class="calculator">
		<input type="number" id="num1">
		<input type="number" id="num2">

		<button id="add">+</button>
		<button id="subtract">−</button>
		<button id="multiply">×</button>
		<button id="reset">C</button>

		<div class="output" id="output">Result: </div>
	  </div>
	`;
  }

  connectedCallback() {
	this.num1 = this.shadowRoot.querySelector('#num1');
	this.num2 = this.shadowRoot.querySelector('#num2');
	this.output = this.shadowRoot.querySelector('#output');

	this.shadowRoot.querySelector('#add')
	  .addEventListener('click', () => this.calculate('add'));
	this.shadowRoot.querySelector('#subtract')
	  .addEventListener('click', () => this.calculate('subtract'));
	this.shadowRoot.querySelector('#multiply')
	  .addEventListener('click', () => this.calculate('multiply'));
	this.shadowRoot.querySelector('#reset')
	  .addEventListener('click', () => this.reset());
  }

  getValues() {
	const val1 = parseFloat(this.num1.value) || 0;
	const val2 = parseFloat(this.num2.value) || 0;
	return [val1, val2];
  }

  calculate(operation) {
	const [val1, val2] = this.getValues();
	let result = 0;

	switch (operation) {
	  case 'add': result = val1 + val2; break;
	  case 'subtract': result = val1 - val2; break;
	  case 'multiply': result = val1 * val2; break;
	}

	this.output.textContent = `Result: ${result}`;
	this.emitResult(result);
  }

  reset() {
	this.num1.value = '';
	this.num2.value = '';
	this.output.textContent = 'Result: ';
	this.emitResult(null);
  }

  emitResult(value) {
	this.dispatchEvent(new CustomEvent('calculation', {
	  detail: { result: value },
	  bubbles: true,
	  composed: true
	}));
  }
}

customElements.define('uxlab-ele-calculator', MyCalculator);