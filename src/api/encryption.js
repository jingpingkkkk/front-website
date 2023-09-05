/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import CryptoJS from 'crypto-js';

const dataProp = 'cpr_ctx';

const mergeArrFragmentsToStr = (arr) => {
  let str = '';
  for (const obj of arr) {
    for (const key in obj) {
      const sortedKeys = Object.keys(obj[key]).sort((a, b) => a - b);
      for (const keyIndex of sortedKeys) {
        str += obj[key][keyIndex];
      }
    }
  }
  return str;
};

const encryptRequest = (data = {}) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify({ message: data }),
    import.meta.env.VITE_RESPONSE_AES_SECRET,
  );
  return encrypted.toString();
};

const decryptResponse = (data = {}) => {
  const mergedString = mergeArrFragmentsToStr(data[dataProp]);
  const decrypted = CryptoJS.AES.decrypt(
    mergedString,
    import.meta.env.VITE_RESPONSE_AES_SECRET,
  );
  const parsed = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  return parsed;
};

export { dataProp, decryptResponse, encryptRequest, mergeArrFragmentsToStr };
