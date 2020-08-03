type DataPassword = { data: string; encryptedData: string; password: string };

export const getDataAndPassword = (validPassword = true): DataPassword => ({
  data: 'data',
  encryptedData: 'mcC558NgehROxpUCW/AZAlwef94GMx1kzsL4ih7V4+uBdWMgsn/XRcy56LYbZYe3',
  password: validPassword ? 'password' : 'PASSWORD',
});
