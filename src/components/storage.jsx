class Storage {
  static setItem(key, value) {
    return new Promise((resolve, reject) => {
      localStorage.setItem(key, value);
      return resolve(true);
    });
  }

  static getItem(key) {
    return localStorage.getItem(key);
  }

  static removeItem(...keys) {
    return new Promise((resolve, reject) => {
      keys.forEach(key => {
        localStorage.removeItem(key);
      });
      return resolve(true);
    });
  }
}

export default Storage;
