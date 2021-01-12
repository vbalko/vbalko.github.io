var genetic = Genetic.create();

genetic.seed = function () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  //creates random permutation of indexes of array of certain length
  function randomPermutation(len) {
    let res = [...Array(len).keys()];
    //   console.log(`Before: ${res}`);
    shuffleArrayInPlace(res);
    //   console.log(`After: ${res}`);
    return res;
  }
  function shuffleArrayInPlace(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // create random strings that are equal in length to solution
  return randomPermutation(this.userData.cities.length);
};

genetic.mutate = function (entity) {
  //mutation will get two random items and swaps them

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function swapItems(entity) {
    const index1 = getRandomInt(entity.length);
    const index2 = getRandomInt(entity.length);
    const tmp = entity[index1];
    entity[index1] = entity[index2];
    entity[index2] = tmp;
    return entity;
  }

  return swapItems(entity);
};

genetic.crossover = function (mother, father) {
  // one-point crossover
  var len = mother.length;
  var ca = Math.floor(Math.random() * len);

  var son = father
    .slice(0, ca)
    .concat(mother.filter((x) => !father.slice(0, ca).includes(x)));
  var daughter = mother
    .slice(0, ca)
    .concat(father.filter((x) => !mother.slice(0, ca).includes(x)));

  return [son, daughter];
};

genetic.fitness = function (entity) {
  let fitness = 0;

  function distance(c1, c2) {
    //   console.log(c1, c2);
    return Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
  }

  let i,
    j = 0;
  for (i = 0; i < entity.length; ++i) {
    j = i + 1 < entity.length ? i + 1 : 0;
    fitness += distance(
      this.userData.cities[entity[i]],
      this.userData.cities[entity[j]]
    );
  }

  return fitness;
};

//   genetic.generation = function (pop, generation, stats) {
//     // stop running once we've reached the solution
//     return pop[0].entity != this.userData['solution'];
//   };

genetic.notification = function (pop, generation, stats, isFinished) {
  function lerp(a, b, p) {
    return a + (b - a) * p;
  }

  var value = pop[0].entity;
  this.last = this.last || value;

  if (pop != 0 && value == this.last) return;

  var solution = [];
  // var i;
  // for (i = 0; i < value.length; ++i) {
  //   var diff = value.charCodeAt(i) - this.last.charCodeAt(i);
  //   var style = 'background: transparent;';
  //   if (diff > 0) {
  //     style = 'background: rgb(0,200,50); color: #fff;';
  //   } else if (diff < 0) {
  //     style = 'background: rgb(0,100,50); color: #fff;';
  //   }

  //   solution.push('<span style="' + style + '">' + value[i] + '</span>');
  // }

  function normalise(val, min, max) {
    return (val - min) / (max - min);
  }

  var buf = '';
  buf += '<tr>';
  buf += '<td>' + generation + '</td>';
  buf += '<td>' + pop[0].fitness.toPrecision(5) + '</td>';
  buf += '<td>' + value + '</td>';
  buf += `<td>${stats.mean.toPrecision(5)} ( ${stats.stdev.toPrecision(
    5
  )} ) </td>`;
  buf += '</tr>';
  $('#results tbody').prepend(buf);
  window.lastSolution = value;
  window.data.push(pop[0].fitness.toPrecision(5));
  let maxVal = Math.max(...window.data);
  let minVal = Math.min(...window.data);
  window.dataNorm = [];
  for (let val of window.data) {
    let normVal = window.myp5.map(val, minVal, maxVal, 0, window.canvasSizeMap);
    window.dataNorm.push(normVal);
  }

  window.myp5.redraw();
  window.myMapP5.redraw();

  this.last = value;
};
