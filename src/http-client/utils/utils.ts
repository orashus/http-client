const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isEmptyObject = <T extends object>(obj: T) => {
  if (!obj || typeof obj !== "object") {
    return true;
  }

  if (Object.keys(obj).length) return false;

  return true;
};

const mountBothBeforeRequestHeaders = <T = () => HeadersInit>(base_before_req_headers?: T, before_req_headers?: T) => {
  let results: HeadersInit = {};

  for (const req_header_fn of [base_before_req_headers, before_req_headers]) {
    if (req_header_fn && typeof req_header_fn === "function") {
      const headers = req_header_fn();

      if (!isEmptyObject(headers)) results = { ...results, ...headers };
    }
  }

  return results;
};

const buildUrl = (url: string | string[], prependWithSlash: boolean = true) => {
  if (!url.length) return "";

  if (typeof url === "string") return url.trim();

  const res = url.map((str, i) => {
    let val = str.trim();

    if (str.startsWith("/")) {
      val = str.slice(1, str.length);
    }

    if (str.endsWith("/") && i !== url.length - 1) {
      val = val.slice(0, -1);
    }

    return val;
  }).join("/");

  return prependWithSlash ? "/" + res : res;
}

export {
  isValidUrl,
  isEmptyObject,
  mountBothBeforeRequestHeaders,
  buildUrl
};
