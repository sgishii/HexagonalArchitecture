export class BookDetail {
  private _title: string
  private _subTitle: string
  private _isbn: string

  constructor(title: string, subTitle: string, isbn: string) {
    this._title = title;
    this._subTitle = subTitle;
    this._isbn = isbn;
  }

  get title() {
    return this._title;
  }
  set title(title: string) {
    this._title = title;
  }

  get subTitle() {
    return this._subTitle;
  }
  set subTitle(subTitle: string) {
    this._subTitle = subTitle;
  }

  get isbn() {
    return this._isbn;
  }
  set isbn(isbn: string) {
    this._isbn = isbn;
  }
}