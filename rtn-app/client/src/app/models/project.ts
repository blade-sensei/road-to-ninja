export class Project {
  title: string;
  description: string;
  status: string;
  data: string;
  uid: string;
  requires: Project[];

  constructor(title = '', uid = '') {
    this.title = title;
    this.description = '';
    this.status = 'not started';
    this.data = 'http://';
    this.uid = uid;
    this.requires = [];
  }
}
