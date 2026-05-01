export function calculator() {
  const variables = {
    Zc: 0,
    Dc: 0,
    Vc: 0,
    n: 0,
    fz: 0,
    Vf: 0,
    ap: 0,
    ae: 0,
    kapr: 0,
    re: 0,
    Q: 0,
    angle: 0, // θ
    hm: 0,
    eta: 0,
    kc: 0,
    mc: 0,
    Pc: 0,
    Mc: 0,
  };

  const formulas = {
    Vc: function (vars) {
      return (vars.n * Math.PI * vars.Dc) / 1000;
    },
    n: function (vars) {
      return (vars.Vc * 1000) / (Math.PI * vars.Dc);
    },
    fz: function (vars) {
      return vars.Vf / (vars.n * vars.Zc);
    },
    Vf: function (vars) {
      return vars.n * vars.Zc * vars.fz;
    },
    Q: function (vars) {
      return (vars.ae * vars.ap * vars.Vf) / 1000;
    },
    angle: function (vars) {
      return Math.acos(1 - (2 * vars.ae) / vars.Dc) * (180 / Math.PI);
    },
    hm: function (vars) {
      return (vars.Vf / vars.n) * Math.sin(vars.kapr);
    },
    Pc: function (vars) {
      return (vars.Vc * vars.ap * (vars.Vf / vars.n) * vars.kc) / 60000;
    },
    Mc: function (vars) {
      return (vars.Pc * 30000) / (Math.PI * vars.n);
    },
  };

  let editObj = {},
    calcObj = {};

  inputsHandler();

  document.documentElement.addEventListener("click", function (event) {
    const button = event.target.closest("[data-material]");

    if (!button) return;

    applyMaterialValues(button);
    closeAllPopups();
  });

  function inputsHandler() {
    const calculators = document.querySelectorAll("[data-calculator]");

    calculators.forEach((calculator) => {
      const editInputs = calculator.querySelectorAll("input[data-editable]");
      const calcInputs = calculator.querySelectorAll("input[data-calculate]");

      editInputs.forEach((input) => {
        editObj[input.name] = input;
        input.addEventListener("input", () => onInputChange());
      });
      calcInputs.forEach((input) => (calcObj[input.name] = input));
    });
  }

  function onInputChange() {
    // получаем значения
    for (let input in editObj) {
      if (checkIssues(editObj, input)) continue;

      variables[input] = Number(editObj[input].value);
    }

    // вычисляем значения
    for (let formula in formulas) {
      let value = formulas[formula](variables);

      if (
        value === 0 &&
        editObj[formula] &&
        editObj[formula].hasAttribute("disabled")
      )
        variables[formula] = 0;
      if (value === 0 || isNaN(value) || !isFinite(value)) continue;
      if (editObj[formula] && !editObj[formula].hasAttribute("disabled"))
        continue;

      variables[formula] = value;
    }

    // записываем значения
    for (let input in calcObj) {
      if (variables[input] === 0) {
        calcObj[input].value = "";
        continue;
      }
      if (checkIssues(calcObj, input) || variables[input] === 0) continue;

      calcObj[input].value = Math.round(variables[input] * 1000) / 1000;
    }
  }

  function checkIssues(inputs, input) {
    if (inputs[input].name === "") {
      console.log("У данный input нет name", input);
      return true;
    }
    if (variables[input] === undefined) {
      console.log(`В массиве нет переменной ${input}`);
      return true;
    }
    return false;
  }

  function applyMaterialValues(button) {
    const valuesString = button.getAttribute("data-material");
    const calculatorName = button.getAttribute("data-target");
    if (!valuesString || !calculatorName) return;

    const obj = strToObject(valuesString);
    const calculator = document.querySelector(
      `[data-calculator='${calculatorName}']`
    );

    const materialLabel = calculator.querySelector("[data-current-material]");
    materialLabel.textContent = button.textContent;

    for (const key in obj) {
      const input = calculator.querySelector(`input[name='${key}']`);

      if (!input) {
        console.log(`Нет input с таким name "${key}".`);
        continue;
      }
      input.value = +obj[key];
    }
  }

  function strToObject(str) {
    const props = str.split(",");
    let obj = {};

    props.forEach(function (prop) {
      const line = prop.split(":");
      obj[line[0]] = line[1];
    });
    return obj;
  }
}

import { closeAllPopups } from "./popup-handler";
