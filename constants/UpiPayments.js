const merchantVPA = "paytmqr3vzc0xmpa8@paytm";
const merchantName = "MOHAMMAD NAZISH AKHTAR";
const transactionNote = "Purchase in Merchant";
const transactionAmount = "1.00";
const currencyCode = "INR";
const merchantUrl = "https://your.website/";

function generateTransactionId() {
  const timestamp = Date.now(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 100000); // Generate a random number
  return `TXN${timestamp}${randomNum}`; // Concatenate to form the transaction ID
}

const transactionId = generateTransactionId(); // Generate a new transaction ID

const UPI_URL_GPAY = `upi://pay?pa=${encodeURIComponent(
  merchantVPA
)}&pn=${encodeURIComponent(merchantName)}&tr=${encodeURIComponent(
  transactionId
)}&tn=${encodeURIComponent(transactionNote)}&am=${encodeURIComponent(
  transactionAmount
)}&cu=${encodeURIComponent(currencyCode)}&url=${encodeURIComponent(
  merchantUrl
)}`;

const Phone_PAY_UPI_URL = `phonepe://pay?pa=${encodeURIComponent(
  merchantVPA
)}&pn=${encodeURIComponent(merchantName)}&mc=5601&tid=${encodeURIComponent(
  transactionId
)}&tn=${encodeURIComponent(transactionNote)}&am=${encodeURIComponent(
  transactionAmount
)}&cu=${encodeURIComponent(currencyCode)}&url=${encodeURIComponent(
  merchantUrl
)}`;

export { UPI_URL_GPAY, Phone_PAY_UPI_URL };
