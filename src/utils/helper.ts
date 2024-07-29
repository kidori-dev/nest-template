import cryptoJs from 'crypto-js';

export const JsonArrayNullKeyClear = (list: any[]) => {
  for (const item of list) {
    const keyNames = Object.keys(item);
    for (const key of keyNames) {
      if (!item[key]) {
        delete item[key];
      }
    }
  }
  return list;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const arrDevision = (data: any[], size: number) => {
  const arr: any = [];
  for (let i = 0; i < data.length; i += size) {
    arr.push(data.slice(i, i + size));
  }
  return arr;
};

export const randomStr = (size: number = 4) => {
  return cryptoJs.lib.WordArray.random(size).toString();
};

export const encryptSha256 = (item: any) => {
  return cryptoJs.SHA256(item).toString();
};
