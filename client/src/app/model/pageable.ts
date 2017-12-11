export class Pageable {
  page: number;
  size: number;
  sort: string;

  constructor(page?: number,
              size?: number,
              sort?: string) {
    this.page = page;
    this.size = size;
    this.sort = sort;
  }

  public toString = (): string => {
    let result = '?';
    if (this.page) {
      result += `&page=${this.page}`;
    }
    if (this.size) {
      result += `&size=${this.size}`;
    }
    if (this.sort) {
      result += `&sort=${this.sort}`;
    }
    return result;
  }
}
