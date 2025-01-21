export const verifyEmail = (email) => {
  return /^([a-z0-9_\-.]+)@([a-z0-9_\-.]+)\.([a-z]{2,5})$/i.test(email.trim());
};
