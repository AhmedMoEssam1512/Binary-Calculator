import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());

function addBin(a, b) {
  let sum = "";
  let carry = 0;
  let i = a.length - 1;
  let j = b.length - 1;

  while (i >= 0 || j >= 0 || carry > 0) {
    const bitA = i >= 0 ? parseInt(a[i], 10) : 0;
    const bitB = j >= 0 ? parseInt(b[j], 10) : 0;
    const currentSum = bitA + bitB + carry;

    sum = (currentSum % 2) + sum;
    carry = Math.floor(currentSum / 2);

    i--;
    j--;
  }

  return sum;
}

function subBin(a, b) {
  let result = "";
  let borrow = 0;
  let i = a.length - 1;
  let j = b.length - 1;

  while (i >= 0 || j >= 0) {
    const bitA = i >= 0 ? parseInt(a[i], 10) : 0;
    const bitB = j >= 0 ? parseInt(b[j], 10) : 0;

    let diff = bitA - bitB - borrow;

    if (diff < 0) {
      diff += 2;
      borrow = 1;
    } else {
      borrow = 0;
    }

    result = diff + result;

    i--;
    j--;
  }

  result = result.replace(/^0+/, '');

  return (result === "" ? "0" : result);
}

app.get('/add/:num1/:num2', (req, res) => {
  const a = req.params.num1;
  const b = req.params.num2;

  if (!/^[01]+$/.test(a) || !/^[01]+$/.test(b)) {
    return res.status(400).json({ error: 'Both inputs must be binary numbers' });
  }

  const sum = addBin(a, b);
  res.json({ sum });
});

app.get('/sub/:num1/:num2', (req, res) => {
  const a = req.params.num1;
  const b = req.params.num2;

  if (!/^[01]+$/.test(a) || !/^[01]+$/.test(b)) {
    return res.status(400).json({ error: 'Both inputs must be binary numbers' });
  }

  const result = subBin(a, b);
  res.json({ difference: result });
});

app.get('/comp/:num1', (req, res) => {
  const number = req.params.num1;

  if (!/^[01]+$/.test(number)) {
    return res.status(400).json({ error: 'Invalid binary number' });
  }

  let complement = "";
  for (let i = 0; i < number.length; i++) {
    const bit = (number[i] === "0" ? "1" : "0");
    complement += bit;
  }

  return res.json({ complement });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
