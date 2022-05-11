import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

import "./style.css";

const slider = document.getElementById("slider");
const range = (n) => [...Array(n + 1).keys()];

const noSlider = noUiSlider.create(slider, {
  start: [1, 10],
  step: 1,
  orientation: "vertical",
  direction: "rtl",
  connect: true,
  tooltips: {
    to: function (value) {
      return "level " + Math.ceil(value);
    },
    from: function (value) {
      return Math.ceil(value);
    },
  },
  range: {
    min: 1,
    max: 300,
  },
  pips: {
    mode: "values",
    values: [
      1,
      ...range(30)
        .slice(1)
        .map((n, i) => n * 10),
    ],
    density: 2,
  },
});

// XP Required
function xpRequired(startLevel, desiredLevel) {
  return Math.ceil(
    -220480 *
      (Math.pow(1.05, startLevel - 1) - Math.pow(1.05, desiredLevel - 1))
  );
}

function zombiesRequired(xp) {
  return Math.ceil(xp / 750);
}

// wood blocks
function blocks(xp) {
  return {
    wood: Math.ceil(xp / 150),
  };
}

function howToLevel(startLevel, desiredLevel) {
  const xp = xpRequired(startLevel, desiredLevel);
  const zombieReq = zombiesRequired(xp);
  const blockReq = blocks(xp);

  return `You need ${xp} exp to go from level ${startLevel} to level ${desiredLevel} which can be obtained
  by killing around ${zombieReq} Zombies or upgrading ${blockReq.wood} Wood Blocks one time.`;
}

noSlider.on("update", function (values) {
  const [startLevel, desiredLevel] = values.map(Math.ceil);
  const xp = xpRequired(startLevel, desiredLevel);
  const zombieReq = zombiesRequired(xp);
  const blockReq = blocks(xp);

  const infoEle = document.getElementById("howToLevel");
  const expEle = document.getElementById("expReq");
  const zombieEle = document.getElementById("zombieReq");
  const woodEle = document.getElementById("woodReq");

  infoEle.innerText = howToLevel(startLevel, desiredLevel);
  expEle.innerText = xp;
  zombieEle.innerText = zombieReq;
  woodEle.innerText = blockReq.wood;
});
