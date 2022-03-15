module.exports = {
  beerColors: (length) => {
    const colors = [
      '#100c00',
      '#181200',
      '#201800',
      '#281f00',
      '#302500',
      '#382b00',
      '#403100',
      '#493800',
      '#513e00',
      '#594400',
      '#614a00',
      '#695100',
      '#715700',
      '#795d00',
      '#816300',
      '#8a6a00',
      '#927000',
      '#9a7600',
      '#a27c00',
      '#aa8300',
      '#b28900',
      '#ba8f00',
      '#c29500',
      '#cb9c00',
      '#d3a200',
      '#dba800',
      '#e3ae01',
      '#ebb501',
      '#f3bb01',
      '#fbc101',
      '#fdc407',
      '#fdc60f',
      '#fdc817',
      '#feca1f',
      '#fecc27',
      '#fece2f',
      '#fed037',
      '#fed240',
      '#fed348',
      '#fed550',
      '#fed758',
      '#fed960',
      '#fedb68',
      '#fedd70',
      '#fedf78',
      '#fee181',
      '#fee389',
      '#fee591',
      '#fee799',
      '#fee8a1',
      '#feeaa9',
      '#feecb1',
      '#feeeb9',
      '#fef0c2',
      '#fef2ca',
      '#fef4d2',
      '#fef6da',
      '#fef8e2',
      '#fefaea',
      '#fefcf2',
    ];

    let colorSet = [];
    const lastColor = colors[colors.length - 1];
    const colorSkip = ((colors.length - 1) / length).toFixed(0);

    for (let x = 0; x < length; x++) {
      colorSet.push(colors[x * colorSkip]);
    }
    colorSet.push(lastColor);

    return colorSet;
  },
};
