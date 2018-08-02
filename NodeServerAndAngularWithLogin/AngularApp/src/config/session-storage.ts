
class SessionStorage {

  public getSession(key: string): any {
    if (typeof(Storage) !== "undefined") {
      sessionStorage.getItem(key);
    } else {
      throw new Error("Sorry, your browser does not support Web Storage...");
    }
  }

  public setSession(key: string, value: any): void {
    if (typeof(Storage) !== "undefined") {
      sessionStorage.setItem(key, value);
    } else {
      throw new Error("Sorry, your browser does not support Web Storage...");
    }
  }

  public getToken(): string {
    if (typeof(Storage) !== "undefined") {
      return sessionStorage.getItem("token");
    } else {
      throw new Error("Sorry, your browser does not support Web Storage...");
    }
  }

  public setToken(value: string): void {
    if (typeof(Storage) !== "undefined") {
      sessionStorage.setItem("token", value);
    } else {
      throw new Error("Sorry, your browser does not support Web Storage...");
    }
  }

}

export default new SessionStorage();
