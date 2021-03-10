import Store from 'electron-store';

class AppStorage {
  store: Store;

  constructor(options?: Store.Options<Record<string, any>>) {
    this.store = new Store(options);
  }

  set(key: string, value: any) {
    this.store.set(key, value);
  }

  get(key: string, defaultValue?: any) {
    try {
      const value = this.store.get(key, defaultValue);
      return value;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  has(key: string) {
    return this.store.has(key);
  }

  delete(key: string) {
    this.store.delete(key);
  }

  clear() {
    return this.store.clear();
  }
}

const appStorage = new AppStorage();

export default appStorage;
