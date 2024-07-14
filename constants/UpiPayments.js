const merchantVPA = "rashidmah351@okicici";
const merchantName = "Rashid Mahmood";
const transactionId = "1234ABI9O03FCD";
const transactionNote = "Purchase in Merchant";
const transactionAmount = "1.00";
const currencyCode = "INR";
const merchantUrl = "https://your.website/";

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
)}&pn=${encodeURIComponent(merchantName)}&mc=${encodeURIComponent(
  5601
)}&tid=${encodeURIComponent(transactionId)}&tn=${encodeURIComponent(
  transactionNote
)}&am=${encodeURIComponent(transactionAmount)}&cu=${encodeURIComponent(
  currencyCode
)}&url=${encodeURIComponent(merchantUrl)}`;

export { UPI_URL_GPAY, Phone_PAY_UPI_URL };
