export default function generateVerificationToken(): string {
  // Generate a random number between 0 and 999999
  const randomNumber = Math.floor(Math.random() * 1000000);

  // Convert the number to a 6-digit string by padding with leading zeros
  const verificationCode = randomNumber.toString().padStart(6, "0");

  return verificationCode;
}
