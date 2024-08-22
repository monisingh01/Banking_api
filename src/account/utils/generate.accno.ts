/* eslint-disable prettier/prettier */
 export function generateAccountNumber(): string {
  const timestamp = Date.now().toString(); // current timestamp
  const randomDigits = Math.floor(Math.random() * 1000000).toString().padStart(6, '0'); // 6 random digits
  return `${timestamp}${randomDigits}`;
}
