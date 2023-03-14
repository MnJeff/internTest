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

let arr = [4, 5, 6, 7, 8];
findMinMaxSum(arr);

// Method 2

function miniMaxSum(arr) {
  arr.sort((a, b) => a - b);
  const minSum = arr.slice(0, 4).reduce((sum, num) => sum + num, 0);
  const maxSum = arr.slice(1).reduce((sum, num) => sum + num, 0);
  console.log(minSum, maxSum);
}

miniMaxSum(arr);
