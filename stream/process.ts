let a: number;
let b: number;
process.stdin.on("data", (data) => {
  if (a === undefined) {
    a = Number(data.toString());
  } else if (b === undefined) {
    b = Number(data.toString());
    console.log(`${a} + ${b} = ${a + b}`);
    process.stdin.pause();
  }
});
