let answer;

answer = 1;

for (let i = 3; i <= 33; i++) {
  let k;
  k = Math.abs(2 * Math.pow(i, 4) - 25 * Math.pow(i, 3) + 33 * Math.pow(i, 2));
  if (k === 0) {
    alert(i);
  }
  answer *= k;
}





