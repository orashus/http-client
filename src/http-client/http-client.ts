import type { Headers, HttpMethods } from "./types/types.d";
import {
  isValidUrl,
  isEmptyObject,
  mountBothBeforeRequestHeaders
} from "./utils/utils";

/**
 * @author Orashus 🥷🏽
 * @param {Object?} options
 * @param {string?} options.api_base_url optional url to act as origin for all requests of the HTTP_CLIENT instance
 * @param {HeadersInit} options.api_base_headers optional. set's default headers
 * @param {(() => HeadersInit) | undefined} options.base_before_req_headers before each request, the header object returned by this function is set as a header, giving a more dynamic experience than that of the __base_header__ options
 * 
 * @returns HTTP_CLIENT instance
 * 
 * for a more details documentation, @see https://www.npmjs.com/package/@orashus/http-client
 */
function HttpClientProvider({
  api_base_url = "",
  api_base_headers = {},
  base_before_req_headers,
}: {
  api_base_url?: string,
  api_base_headers?: HeadersInit
  base_before_req_headers?: () => HeadersInit;
} = {}) {
  if (api_base_url && !isValidUrl(api_base_url))
    throw new Error("Invalid API Base URL Specified")

  // This closure is intentional as it avoids exposing some variables to the user
  return (() => {
    let _req_url: string = "";
    let _req_headers: HeadersInit = {};
    let _before_req_headers: (() => HeadersInit) | undefined;

    const _options = {
      api_base_url,
      api_base_headers,
      base_before_req_headers,
      base_url: "",
      base_headers: {} as HeadersInit,
      before_req_headers: undefined as (() => HeadersInit) | undefined,
    }

    async function requestWithoutBody<T>(
      _url: string,
      method: HttpMethods = "GET",
      _headers: Headers = {},
    ): Promise<T> {
      if (!_req_url && !isValidUrl(_url))
        throw new Error("Invalid request URL, no api_base_url nor base_url was provided and url is not a valid URL");

      const url = _req_url + _url.trim();

      if (!isValidUrl(url))
        throw new Error("Invalid Request URL");

      try {
        const res = await fetch(url, {
          method,
          headers: {
            ..._req_headers,
            ..._headers,
            ...mountBothBeforeRequestHeaders(base_before_req_headers, _before_req_headers),
          },
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json() as Promise<T>;
      } catch (error) {
        throw error;
      }
    }

    async function requestWithBody<T>(
      _url: string,
      _body: object,
      method: HttpMethods = "POST",
      _headers: Headers = {},
    ): Promise<T> {
      if (!_req_url && !isValidUrl(_url))
        throw new Error("Invalid request URL, no api_base_url nor base_url was provided and url is not a valid URL");

      const url = _req_url + _url.trim();

      if (!isValidUrl(url))
        throw new Error("Invalid Request URL");

      try {
        const res = await fetch(url, {
          method,
          headers: {
            ..._req_headers,
            ..._headers,
            ...mountBothBeforeRequestHeaders(base_before_req_headers, _before_req_headers),
          },
          body: JSON.stringify(_body),
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json() as Promise<T>;
      } catch (error) {
        throw error;
      }
    }

    return class HTTP_CLIENT {
      /**
       * @constructor creates an instance of HTTP_CLIENT 👷🏾‍♂️ 🛠️ 🚧
       * @param {Object} options;
       * @param {string} options.base_url optional url to act as origin for all requests of an HTTP_CLIENT instance
       * @param {HeadersInit} options.base_headers optional, set's default headers for the scope of it's instance
       * @param {(() => HeadersInit) | undefined} options.before_req_headers before each request, the header object returned by this function is set as a header, giving a more dynamic experience than that of the __base_header__ options
       * @example new HTTP_CLIENt({
       *  before_req_headers: () => ({ "Authorization": `bearer ${localStorage.get("token")}` }) })
       */
      constructor({
        base_url = "",
        base_headers = {},
        before_req_headers,
      }: {
        base_url?: string,
        base_headers?: HeadersInit
        before_req_headers?: () => HeadersInit;
      } = {}) {

        if (api_base_url && base_url && !isValidUrl(api_base_url + base_url))
          throw new Error("Invalid base URL: API URL was already specified");

        if (!api_base_url && base_url && !isValidUrl(base_url))
          throw new Error("Invalid Base URL Specified");

        const url = String(api_base_url).trim() + String(base_url).trim();

        if (url && !isValidUrl(url))
          throw new Error("Invalid request URL");

        _req_url = url;

        if (!isEmptyObject(api_base_headers)) _req_headers = { ...api_base_headers };

        if (!isEmptyObject(base_headers)) _req_headers = { ..._req_headers, ...base_headers };

        _before_req_headers = before_req_headers;

        _options.before_req_headers = before_req_headers;
        _options.base_url = base_url;
        _options.base_headers = base_headers;
      }

      /**
       * returns all options both from provider and class instantiation ✅
       *
       * @example console.log(new HTTP_CLIENT().Options) // logs _base_url {string} url
       */
      get options() {
        return { ..._options };
      }

      // EXPOSED HANDLERS 🪖 👷🏾‍♂️

      /**
       * 🪖 👷🏾‍♂️ handles all GET queries to specified url
       *
       * @param {string} url optional, but required if no base url was provided
       * @param {Headers} headers optional
       */
      public async GET<T>(url: string = "", headers?: Headers): Promise<T> {
        return requestWithoutBody<T>(url, "GET", headers);
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
        return requestWithBody(url, body, "POST", headers);
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
        return requestWithBody(url, body, "PUT", headers);
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
        return requestWithBody(url, body, "PATCH", headers);
      }

      /**
       * 🪖 👷🏾‍♂️ handles all DELETE queries to specified url
       *
       * @param {string} url optional, but required if no base url was provided
       * @param {Headers} headers optional
       */
      public async DELETE<T>(url: string = "", headers?: Headers): Promise<T> {
        return requestWithoutBody(url, "DELETE", headers);
      }
    }
  })();
}

const HttpClient = HttpClientProvider();

export {
  HttpClientProvider,
  HttpClient,
};
