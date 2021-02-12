export const formatToTwoDigitsNumber = (number) => {
  if (number && number) {
    const decimal = (number.toString().split(".")[1] || []).length;
    return decimal > 2 ? Number(number).toFixed(2) : +number;
  } else {
    return +number;
  }
};

const removeSecondPeriod = (string) => {
  let t = 0;
  return string.replace(/\./g, (match) => {
    t++;
    return t === 2 ? "" : match;
  });
};

export const formatInputValueToTwoDigitsNumber = (string) => {
  let stringMod;
  if (string.includes(".") && string.indexOf(".") > string.length - 1) {
    stringMod = parseFloat(string.replace(/[^\d.]/g, ""));

    return formatToTwoDigitsNumber(removeSecondPeriod(stringMod));
  } else {
    stringMod = removeSecondPeriod(string.replace(/[^\d.]/g, ""));

    return stringMod;
  }
};

export const getCurrencySymbol = (currencyCode) => {
  switch (currencyCode) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return "$";
  }
};
