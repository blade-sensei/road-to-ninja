export class User {
  username: string;
  uid: string;
  name: string;
  password: string;
  admin: boolean;

  constructor();
  constructor(username?, uid?, name?, password?) {
    this.username = username;
    this.uid = uid;
    this.name = name;
    this.password = password;
    this.admin = false;
  }
}
