import Component from '../lib/component.js';
import store from '../store/index.js';

export default class List extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('.js-items')
        });
    }

    render() {
        // console.log(this.element)
        if (store.state.items.length === 0) {
            this.element.innerHTML = `<p class="no-items">You've done nothing yet &#x1f622;</p>`;
            return;
        }

        this.element.innerHTML = `
            <ul>
                ${store.state.items.map(item => {
                    return  `
                        <li>${item}<button aria-label="Delete this item">×</button></li>
                    `;
                }).join('')}
            </ul>
        `;

        this.element.querySelectorAll('button').forEach((button, index) => {
            button.addEventListener('click', () => {
                store.dispatch('clearItem', { index }); // 这里深层次的调用this，虽然有箭头函数（也有可能出错）
            })
        });
    }
}