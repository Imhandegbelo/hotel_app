export const formatNum = (num) =>
  Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: "0",
    maximumFractionDigits: "0",
  }).format(num);
