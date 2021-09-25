class QueryString {
  #entries;

  constructor(queryString) {
    if (typeof queryString === "string" && queryString !== "") {
      this.#entries = QueryString.parseQueryString(queryString);
    } else {
      this.#entries = [];
    }
  }

  get query() {
    return QueryString.queryStringFromEntries(this.#entries);
  }

  set query(value) {
    this.#entries = QueryString.parseQueryString(value);
  }

  get map() {
    return Object.fromEntries(this.entries);
  }

  set map(value) {
    this.query = QueryString.queryStringFromMap(value);
  }

  get entries() {
    return [...this.#entries];
  }

  set entries(value) {
    this.#entries = value;
  }

  get(key) {
    if (key === undefined) {
      return this.map();
    }
    return this.map[key];
  }

  set(key, value) {
    for (let i = 0; i < this.#entries.length; i++) {
      if (this.#entries[i][0] == key) {
        this.#entries[i] = [key, value];
        return;
      }
    }
    this.#entries.push([key, value]);
  }

  static fromMap(map) {
    let queryString = QueryString.queryStringFromMap(map);
    return new QueryString(queryString);
  }

  static fromEntries(entries) {
    let queryString = QueryString.queryStringFromEntries(entries);
    return new QueryString(queryString);
  }

  static fromString(queryString) {
    return new QueryString(queryString);
  }

  static queryStringFromEntries(entries) {
    return entries.map(a => a.map(kv => encodeURIComponent(kv)).join("=")).join("&")
  }

  static queryStringFromMap(map) {
    return Object.keys(map).map(key => encodeURIComponent(key) + "=" + encodeURIComponent(map[key])).join('&');
  }

  static parseQueryString(queryString) {
    let entries = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    entries = entries.map(x => x.split("="))
                     .map(x => [decodeURIComponent(x[0]), decodeURIComponent(x[1])]);
    return entries;
  }
 
  toString() {
    return this.query;
  }
}
