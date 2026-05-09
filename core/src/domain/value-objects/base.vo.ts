export class BaseVo<Name extends string, DataType extends unknown> {
  protected readonly __type: Name;
  protected readonly _data: DataType;

  protected constructor(type: Name, data: DataType) {
    this.__type = type;
    this._data = data;

    Object.freeze(this);
  }

  get value() {
    return this._data;
  }

  equals(x: unknown) {
    if (x instanceof BaseVo)
      return this.__type === x.__type && this._data === x._data;
    return this._data === x;
  }
}
