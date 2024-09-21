interface Headers {
  [key: string]: string;
}

type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type {
  Headers,
  HttpMethods,
};
