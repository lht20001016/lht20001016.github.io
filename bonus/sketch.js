// // Bubble Sort

// let theNumbers = [5, 15, 3, 8, 9, 1, 20, 7];

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   console.log(bubbleSort(theNumbers));
// }

// function draw() {
//   background(220);
// }

// function bubbleSort(someArray) {

//   let status = true;

//   while (status){

//     status = false;
//     for (let i = 0; i < someArray.length - 1; i++) {
//       if (someArray[i] > someArray[i + 1]) {
//         let temp = someArray[i];
//         someArray[i] = someArray[i + 1];
//         someArray[i + 1] = temp;
//         status = true;
//       }
//     }

//   }

//   return someArray;

// }

// Selection Sort

let small;
let swapto;
let theNumbers = [5, 15, 3, 8, 9, 1, 20, 7];

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(selectionSort(theNumbers));
}

function draw() {
  background(220);
}

function selectionSort(someArray) {

  for (let i = 0; i < someArray.length; i++) {

    small = 500;

    for (let j = i; j < someArray.length; j++) {

      if (someArray[j] < small) {
        small = someArray[j];
        swapto = j;
      }

    }

    let temp = someArray[i];
    someArray[i] = someArray[swapto];
    someArray[swapto] = temp;

  }

  return someArray;

}