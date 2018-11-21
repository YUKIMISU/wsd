interface message {
  message: string;
  btnText: string;
  link: string
}

export default interface messages {
  bank: message;
  changeJymm: message;
  changeJymmById: message;
  login: message;
  recharge: message;
  setJymm: message;
}