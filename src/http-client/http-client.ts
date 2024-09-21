// import { createDefaultHeaders } from "./headers";
import type { Headers, HttpMethods } from "./types";

/**
 * @class Creates an http_Client 🥷🏽
 * @since April 15 2024 | 19:13 hr
 *
 * @author RashJrEdmund
 *
 */
export class HTTP_CLIENT {
  private _headers;
  private _base_url;
  private _base_path; // e.g /auth

  /**
   * @constructor creates an instance of HTTP_CLIENT 👷🏾‍♂️ 🛠️ 🚧
   * @param {Object} options;
   * @param {string} options.base_url optional url to act as origin for all requests of an HTTP_CLIENT instance
   * @param {HeadersInit} options.base_headers optionally set"s default headers
   */
  constructor({ base_url = "", base_headers = {} }: { base_url?: string, base_headers?: HeadersInit }) {
    if (!["undefined", "string"].includes(typeof base_url))
      throw new Error("Invalid Base URL Specified"); // meaning something of type type "object" or "function" or something else was passed

    if (base_url.trim()) {
      if (!base_path.startsWith("/"))
        throw new Error('Base Path Must Start With A Slash "/" ');

      this._base_path = base_path;
    } else this._base_path = "";

    this._base_url = API_BASE_URL; // from env

    this._headers = { ...createDefaultHeaders(), ...base_headers };
  }

  private checkUrl(_url: string | undefined | null) {
    if (!this._base_url && !_url?.trim()) {
      // if no base url was specified and no url is specified too, throws error
      throw new Error("REQUEST URL NOT SPECIFIED");
    }

    return this._base_url + this._base_path + _url?.trim(); // if no base url is provided, then only the url passed by the user will be used.
  }

  private async requestWithoutBody<T>(
    _url: string,
    method: HttpMethods = "GET",
    _headers: Headers = {},
  ): Promise<T> {
    const url = this.checkUrl(_url);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          ...this._headers,
          ..._headers,
        },
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json() as Promise<T>;
    } catch (error) {
      throw new Error(this._base_url);
    }
  }

  private async requestWithBody<T>(
    _url: string,
    _body: object,
    method: HttpMethods = "POST",
    _headers: Headers = {},
  ): Promise<T> {
    const url = this.checkUrl(_url);

    const res = await fetch(url, {
      method,
      headers: {
        ...this._headers,
        ..._headers,
      },
      body: JSON.stringify(_body),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json() as Promise<T>;
  }

  // GETTERS AND SETTERS

  /**
   * getter method to access base url. It is accessed as though it is a property ✅
   *
   * @example console.log(new HTTP_CLIENT().getBaseUrl) // logs _base_url {string} url
   */
  get getBaseUrl() {
    return this._base_url;
  }

  /**
   * getter method to access base path. It is accessed as though it is a property ✅
   *
   * @example console.log(new HTTP_CLIENT().getBasePath() // logs _base_path {string} url
   */
  get getBasePath() {
    return this._base_path;
  }

  /**
   * setter method to reassign base url (origin). It is accessed as though it is a property ✅
   *
   * @example new HTTP_CLIENT().setBaseUrl = "https://example.com" // updates the _base_url (origin)
   */
  set setBaseUrl(new_base_url: string) {
    const url = new URL(new_base_url);

    if (!url.protocol) throw new Error("Will Not Assign An Invalid URL");

    this._base_url = url.toString().slice(0, -1);
  }

  // EXPOSED HANDLERS 🪖 👷🏾‍♂️

  /**
   * 🪖 👷🏾‍♂️ handles all GET queries to specified url
   *
   * @param {string} url optional, but required if no base url was provided
   * @param {Headers} headers optional
   */
  public async GET<T>(url: string = "", headers?: Headers): Promise<T> {
    return this.requestWithoutBody<T>(url, "GET", headers);
  }

  /**
   * 🪖👷🏾‍♂️ handles all POST mutations to specified url
   *
   * @param {string} url optional, but required if no base url was specified at initialization
   * @param {BodyInit} body required. Use "{}" as placeholder to bypass any error telling you to specify a body for mutations that do not need a body object
   * @param {Headers} headers optional
   */
  public async POST<T>(
    url: string = "",
    body: object,
    headers?: Headers,
  ): Promise<T> {
    return this.requestWithBody(url, body, "POST", headers);
  }

  /**
   * 🪖 👷🏾‍♂️ handles all PUT mutations to specified url
   *
   * @param {string} url optional, but required if no base url was specified at initialization
   * @param {BodyInit} body required. Use "{}" as placeholder to bypass any error telling you to specify a body for mutations that do not need a body object
   * @param {Headers} headers optional
   */
  public async PUT<T>(
    url: string = "",
    body: object,
    headers?: Headers,
  ): Promise<T> {
    return this.requestWithBody(url, body, "PUT", headers);
  }

  /**
   * 🪖 👷🏾‍♂️ handles all PATCH mutations to specified url
   *
   * @param {string} url optional, but required if no base url was specified at initialization
   * @param {BodyInit} body required. Use "{}" as placeholder to bypass any error telling you to specify a body for mutations that do not need a body object
   * @param {Headers} headers optional
   */
  public async PATCH<T>(
    url: string = "",
    body: object,
    headers?: Headers,
  ): Promise<T> {
    return this.requestWithBody(url, body, "PATCH", headers);
  }

  /**
   * 🪖 👷🏾‍♂️ handles all DELETE queries to specified url
   *
   * @param {string} url optional, but required if no base url was provided
   * @param {Headers} headers optional
   */
  public async DELETE<T>(url: string = "", headers?: Headers): Promise<T> {
    return this.requestWithoutBody(url, "DELETE", headers);
  }
}
