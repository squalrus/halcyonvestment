module.exports = {
  randomColors: (num) => {
    let colorSet = [];
    for (let i = 0; i < num; i++) {
      let color = '#';
      for (let j = 0; j < 6; j++) {
        const random = Math.random();
        const bit = (random * 16) | 0;
        color += bit.toString(16);
      }
      colorSet.push(color);
    }
    return colorSet;
  },
};
