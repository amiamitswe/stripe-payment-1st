export const calculateOrderAmount = (amount) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client

  return Math.round(amount * 100);
};
