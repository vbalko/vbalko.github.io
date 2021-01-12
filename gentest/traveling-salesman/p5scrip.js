const s = (p) => {
  let y;
  const margin = 10;
  p.setup = function () {
    p.createCanvas(
      window.generations + margin * 2,
      window.canvasSizeGraph + margin * 2
    );
    p.stroke(255);
    p.noLoop();

    y = p.height * 0.5;
  };

  p.draw = function () {
    p.background(220);
    p.stroke('black');
    p.line(margin, margin, margin, window.canvasSizeGraph + margin);
    p.line(
      margin,
      window.canvasSizeGraph + margin + 2,
      window.generations,
      window.canvasSizeGraph + margin + 2
    );
    p.translate(0, 0);
    p.drawLines();
  };

  p.drawLines = function () {
    p.stroke(0);

    let px = 0 + margin;
    let py = 0 + margin;
    for (let i = 0; i < window.generations; i++) {
      let x = i * ((p.width - 20) / window.generations) + margin;
      let y =
        window.canvasSizeGraph - window.dataNorm[i] + margin || 0 + margin;
      p.line(px, py, x, y);
      px = x;
      py = y;
    }
  };
};

const mapP5 = (p) => {
  const margin = 10;
  p.setup = function () {
    p.createCanvas(
      window.canvasSizeMap + margin * 2,
      window.canvasSizeMap + margin * 2
    );

    p.noLoop();
  };

  p.draw = function () {
    p.background(220);
    p.drawCityConnections();
    p.drawCities();
  };

  p.drawCities = function () {
    p.noStroke();
    let color = p.color('white');
    for (let i = 0; i < cities.length; i++) {
      if (i == window.lastSolution[0]) {
        color = p.color('red');
      } else {
        color = p.color('white');
      }
      let x = cities[i].x + margin;
      let y = cities[i].y + margin;
      p.fill(color);
      p.ellipse(x, y, 15);
      p.fill(p.color('black'));
      p.text(cities[i].name, x, y);
    }
  };

  p.drawCityConnections = function () {
    p.stroke(0);
    p.strokeWeight(4);
    p.colorMode(p.HSL, 255);
    let hue;
    if (window.lastSolution.length > 0) {
      let px = cities[window.lastSolution[0]].x + margin;
      let py = cities[window.lastSolution[0]].y + margin;
      for (let i = 1; i < cities.length; i++) {
        let x = cities[window.lastSolution[i]].x + margin;
        let y = cities[window.lastSolution[i]].y + margin;
        hue < 255 ? (hue += 10) : (hue = 0);
        p.stroke(hue, 200, 150);
        p.line(px, py, x, y);
        px = x;
        py = y;
      }
      p.line(
        px,
        py,
        cities[window.lastSolution[0]].x + margin,
        cities[window.lastSolution[0]].y + margin
      );
    }
  };
};
