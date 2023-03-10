function findMinMaxSum(arr) {
  let minSum = 0;
  let maxSum = 0;

  arr.sort((a, b) => a - b);

  for (let i = 0; i < 4; i++) {
    minSum += arr[i];
  }

  for (let i = 1; i < 5; i++) {
    maxSum += arr[i];
  }

  console.log(minSum + " " + maxSum);
}

let arr = [1, 2, 3, 4, 5];
findMinMaxSum(arr);
