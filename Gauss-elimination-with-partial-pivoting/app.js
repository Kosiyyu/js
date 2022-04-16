"use strict";

var n = 4;

// var array = [
//   [2, 4, 2, 1, 10],
//   [1, 2, 3, 3, 6],
//   [4, 5, 2, 1, 6],
//   [0, 1, 2, 9, 1],
// ];

var array = new Array(n);
for (var i = 0; i < n; i++) {
  array[i] = new Array(n);
}

var X = new Array(n);
const body = document.body;

function createOutputTable(superContainer) {
  const div = document.createElement("div");
  div.id = "container2";
  div.classList.add("container");
  var id = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n + 1; j++) {
      const output = document.createElement("div");
      output.textContent = "⠀";
      output.id = "div1-" + id;
      output.classList.add("div");
      div.append(output);
      id++;
    }
    const br = document.createElement("br");
    div.append(br);
  }
  superContainer.append(div);
}

function createInputTable(superContainer) {
  const div = document.createElement("div");
  div.id = "container1";
  div.classList.add("container");
  var id = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n + 1; j++) {
      const input = document.createElement("div");
      input.type = "number";
      input.contentEditable = true;
      input.textContent = "0";
      input.id = "div0-" + id;
      input.classList.add("div");
      div.append(input);
      id++;
    }
    const br = document.createElement("br");
    div.append(br);
  }
  superContainer.append(div);
}

function createGenerateButton(superContainer) {
  const button = document.createElement("button");
  button.textContent = "Calculate";
  button.id = "button0";
  button.classList.add("button");
  superContainer.append(button);
  button.addEventListener("click", () => {
    getImput();
    fillZeroInput();
    updateImput();
    gaussPartialPivoting();
    updateOutput();
    updateSolution();
  });
}

function createCleanButton(superContainer) {
  const button = document.createElement("button");
  button.textContent = "Clean";
  button.id = "button1";
  button.classList.add("button");
  superContainer.append(button);
  button.addEventListener("click", () => {
    cleanInput();
    cleanOutput();
    cleanSolution();
    forceFillZeroInput();
  });
}

function getImput() {
  var id = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n + 1; j++) {
      const element = document.getElementById("div0-" + id);
      array[i][j] = Number(element.textContent);
      id++;
    }
  }
  console.table(array);
}

function fillZeroInput() {
  var id = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n + 1; j++) {
      const element = document.getElementById("div0-" + id);
      if (element.textContent.length == 0 || element.textContent == "0") {
        array[i][j] = 0;
      }
      id++;
    }
  }
}

function forceFillZeroInput() {
  var id = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n + 1; j++) {
      array[i][j] = 0;
      id++;
    }
  }
}

function cleanOutput() {
  var id = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n + 1; j++) {
      const element = document.getElementById("div1-" + id);
      element.textContent = "⠀";
      id++;
    }
  }
}

function cleanInput() {
  var id = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n + 1; j++) {
      const element = document.getElementById("div0-" + id);
      element.textContent = "0";
      id++;
    }
  }
}

function updateImput() {
  var id = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n + 1; j++) {
      const element = document.getElementById("div0-" + id);
      if (Number.isInteger(array[i][j])) {
        element.textContent = array[i][j];
      } else {
        element.textContent = array[i][j].toPrecision(4);
      }
      id++;
    }
  }
}

function updateOutput() {
  var id = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n + 1; j++) {
      const element = document.getElementById("div1-" + id);
      if (Number.isInteger(array[i][j])) {
        element.textContent = array[i][j];
      } else {
        element.textContent = array[i][j].toPrecision(4);
      }
      id++;
    }
  }
}

function createSolution(superContainer) {
  const div = document.createElement("div");
  div.id = "container5";
  var counter = n - 1;
  div.classList.add("solution");
  for (var i = 0; i < n; i++) {
    div.textContent += "x" + counter + " = \n";
    counter--;
  }
  superContainer.append(div);
}

function updateSolution() {
  const element = document.getElementById("container5");
  var counter = n - 1;
  element.textContent = "";
  for (var i = 0; i < n; i++) {
    element.textContent += "x" + counter + " = " + X[i] + "\n";
    counter--;
  }
}

function cleanSolution() {
  const element = document.getElementById("container5");
  element.textContent;
  var counter = n - 1;
  element.textContent = "";
  for (var i = 0; i < n; i++) {
    element.textContent += "x" + counter + " = \n";
    counter--;
  }
}

//________________________________________________________________________________________________________________
//________________________________________________________________________________________________________________
//__|___GAUSS___|_________________________________________________________________________________________________
//__|___________|_________________________________________________________________________________________________
//__v___________V_________________________________________________________________________________________________

function swapRow(y1, y2) {
  let temp = 0;
  for (var i = 0; i < n + 1; i++) {
    temp = array[y1][i];
    array[y1][i] = array[y2][i];
    array[y2][i] = temp;
  }
}

function killNegativeZero() {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n + 1; j++) {
      if (array[i][j] == 0) {
        array[i][j] = 0;
      }
    }
  }
}

function printArray() {
  killNegativeZero();
  console.table(array);
}

function makeTriangularMatrix() {
  for (var i = 0; i < n; i++) {
    var maxi = i;
    var y = array[i][i];
    for (var j = i + 1; j < n; j++) {
      if (Math.abs(array[j][i]) > y) {
        y = array[j][i];
        maxi = j;
      }
    }
    if (i != j) {
      swapRow(maxi, i);
    }
    for (var j = i + 1; j < n; j++) {
      let m = array[j][i] / array[i][i];
      for (var k = i + 1; k < n + 1; k++) {
        array[j][k] = array[j][k] - array[i][k] * m;
      }
      array[j][i] = 0;
    }
  }
}

function calculateSolution() {
  for (var i = n - 1; i >= 0; i--) {
    X[i] = array[i][n];
    for (var j = i + 1; j < n; j++) {
      X[i] = X[i] - array[i][j] * X[j];
    }
    X[i] = X[i] / array[i][i];
  }
}

function printX() {
  console.table(X);
}

function gaussPartialPivoting() {
  //printArray();
  makeTriangularMatrix();
  //printArray();
  calculateSolution();
  printX();
}

//________________________________________________________________________________________________________________
//________________________________________________________________________________________________________________
//__|___MAIN___|_________________________________________________________________________________________________
//__|___________|_________________________________________________________________________________________________
//__v___________V_________________________________________________________________________________________________
const superContainer = document.createElement("div");
superContainer.id = "container0";
superContainer.classList.add("superContainer");
createInputTable(superContainer);
createOutputTable(superContainer);
body.append(superContainer);
const superContainer1 = document.createElement("div");
superContainer1.id = "container3";
superContainer1.classList.add("superContainer");
createGenerateButton(superContainer1);
createCleanButton(superContainer1);
body.append(superContainer1);
const superContainer2 = document.createElement("div");
superContainer2.id = "container4";
superContainer2.classList.add("superContainer");
createSolution(superContainer2);
body.append(superContainer2);
// updateSolution();
// cleanSolution();
