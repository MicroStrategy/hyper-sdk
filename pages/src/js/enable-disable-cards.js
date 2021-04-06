import './utils/common';
import { storage } from './utils/storage';

window.addEventListener(
  'load',
  () => {
    const txtCards = document.form.cards;
    txtCards.placeholder = `Enter the cards to be enabled, as in:

mstrHyper.start({
    cards: [{
        "projectId": "B7CA92F04B9FAE8D941C3E9B7E0CD754",
        "id": "03A628394383C0F5785A36B8D3F47A76",
        "name": "Companies"
    }, {
        "projectId": "B7CA92F04B9FAE8D941C3E9B7E0CD754",
        "id": "9BD5FEF54349135608EB05B7291A37AE",
        "name": "Employees"
    }]
});`;

    txtCards.value = storage.cards() || '';
    txtCards.addEventListener('change', () => {
      storage.cards(txtCards.value || '');
    });
  },
  { once: true }
);
