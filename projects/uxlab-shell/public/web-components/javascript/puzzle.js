class ImagePuzzle extends HTMLElement {
      static get observedAttributes() {
        return ['src'];
      }

      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.rows = 5;
        this.cols = 10;
        this.size = this.rows * this.cols;
        this.order = Array.from({ length: this.size }, (_, i) => i);

        this.shadowRoot.innerHTML = `
          <style>
            .reference { margin-bottom: 10px; text-align: center; }
            .reference img { max-width: 100%; border: 2px solid #ccc; border-radius: 6px; }
            .controls { margin-bottom: 8px; display: flex; gap: 8px; justify-content: center; }
            button { padding: 6px 10px; border: 1px solid #ccc; border-radius: 6px; background: #fff; cursor: pointer; }
            button:hover { background: #f7f7f7; }
            .board {
              display: grid;
              grid-template-columns: repeat(${this.cols}, 100px);
              grid-template-rows: repeat(${this.rows}, 80px);
              gap: 2px;
              background: #333;
              padding: 4px;
              border-radius: 8px;
              user-select: none;
              justify-content: center;
            }
            .piece {
              width: 100px;
              height: 80px;
              background-size: ${this.cols * 100}px ${this.rows * 80}px;
              border: 1px solid #999;
              cursor: grab;
            }
            .piece.drag-over {
              outline: 3px dashed #3498db;
              outline-offset: -3px;
            }
          </style>
          <div class="reference">
            <img id="reference-img" alt="Puzzle reference image">
          </div>
          <div class="controls">
            <button id="shuffle">Shuffle</button>
            <button id="reset">Reset</button>
          </div>
          <div class="board"></div>
        `;
      }

      connectedCallback() {
        this.board = this.shadowRoot.querySelector('.board');
        this.shuffleBtn = this.shadowRoot.querySelector('#shuffle');
        this.resetBtn = this.shadowRoot.querySelector('#reset');
        this.referenceImg = this.shadowRoot.querySelector('#reference-img');

        this.shuffleBtn.addEventListener('click', () => this.shuffle());
        this.resetBtn.addEventListener('click', () => this.reset());

        // Initialize with current src
        this.updateImage(this.getAttribute('src'));
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'src' && newValue !== oldValue) {
          this.updateImage(newValue);
        }
      }

      updateImage(src) {
        if (!src) return;
        this.imageSrc = src;
        this.referenceImg.src = src;
        this.shuffle(); // shuffle by default when image changes
      }

      render() {
        this.board.innerHTML = '';
        this.order.forEach((pieceIndex, positionIndex) => {
          const row = Math.floor(pieceIndex / this.cols);
          const col = pieceIndex % this.cols;

          const piece = document.createElement('div');
          piece.className = 'piece';
          piece.style.backgroundImage = `url(${this.imageSrc})`;
          piece.style.backgroundPosition = `-${col * 100}px -${row * 80}px`;

          piece.draggable = true;
          piece.dataset.index = positionIndex;
          piece.dataset.value = pieceIndex;

          piece.addEventListener('dragstart', this.onDragStart.bind(this));
          piece.addEventListener('dragenter', this.onDragEnter.bind(this));
          piece.addEventListener('dragover', this.onDragOver.bind(this));
          piece.addEventListener('dragleave', this.onDragLeave.bind(this));
          piece.addEventListener('drop', this.onDrop.bind(this));
          piece.addEventListener('dragend', this.onDragEnd.bind(this));

          this.board.appendChild(piece);
        });
      }

      onDragStart(e) {
        const fromIndex = e.target.dataset.index;
        const value = e.target.dataset.value;
        e.dataTransfer.setData('text/plain', JSON.stringify({ fromIndex, value }));
        e.dataTransfer.effectAllowed = 'move';
        e.target.style.opacity = '0.6';
      }
      onDragEnter(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }
      onDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
      onDragLeave(e) { e.currentTarget.classList.remove('drag-over'); }
      onDrop(e) {
        e.preventDefault();
        const target = e.currentTarget;
        target.classList.remove('drag-over');
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        const fromIndex = parseInt(data.fromIndex, 10);
        const toIndex = parseInt(target.dataset.index, 10);
        if (fromIndex !== toIndex) this.swap(fromIndex, toIndex);
      }
      onDragEnd(e) {
        e.target.style.opacity = '1';
        this.board.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      }

      swap(i, j) {
        [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
        this.render();
        this.emitState('swap', { from: i, to: j, order: [...this.order] });
      }
      shuffle() {
        for (let i = this.order.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.order[i], this.order[j]] = [this.order[j], this.order[i]];
        }
        this.render();
        this.emitState('shuffle', { order: [...this.order] });
      }
      reset() {
        this.order = Array.from({ length: this.size }, (_, i) => i);
        this.render();
        this.emitState('reset', { order: [...this.order] });
      }
      emitState(action, detail) {
        this.dispatchEvent(new CustomEvent('puzzle-change', {
          detail: { action, ...detail },
          bubbles: true,
          composed: true
        }));
      }
    }

    customElements.define('uxlab-ele-puzzle', ImagePuzzle);