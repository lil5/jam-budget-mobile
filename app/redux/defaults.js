export const defaultState = {
  jars: [
    { desc: '', name: 'Travel', amount: 0, burn: 0, catId: 'work', id: 'travel_0', goal: {type: 'budget', amount: 80}, currency: '', repeat: 'M' },
    { desc: '', name: 'Going out', amount: 0, burn: 0, catId: 'fun', id: 'fun_1', goal: {type: 'budget', amount: 150}, currency: '', repeat: 'M' },
    { desc: '', name: 'Clothes', amount: 0, burn: 0, catId: 'fun', id: 'clothes_2', goal: {type: 'saving', amount: 1200}, currency: '', repeat: '' },
    { desc: '', name: 'Tax', amount: 0, burn: 0, catId: 'living_expences', id: 'tax_3', goal: {type: 'budget', amount: 100}, currency: '', repeat: 'Q' },
    { desc: '', name: 'Food', amount: 0, burn: 0, catId: 'living_expences', id: 'food_0', goal: {type: 'budget', amount: 250}, currency: '', repeat: 'M' },
  ],
  catagories: [
    { id: 'living_expences', name: 'Living Expences' },
    { id: 'fun', name: 'Leisure' },
    { id: 'work', name: 'Work' },
  ],
  unsorted: 0,
  lastUpdate: [0, 0],
  defaultCurrency: 'USD',
  version: 0,
}
