/**
 * @RunJS Other/HttpRequest
 * Source: https://gist.github.com/seatwork/a9ff14d252291c74402f64dc65b5aea6
 */

import http from "http";
import https from "https";
import { parse } from "url";

/**
 * 默认 Content-Type 请求头
 * application/json -> 请求体为 JSON 字符串
 * application/x-www-form-urlencoded -> 请求体为键值对
 * text/plain, text/html, text/xml -> 请求体为文本
 */
const DEFAULT_CONTENT_TYPE = "application/json";

/**
 * 检测数据是否为字符串
 */
function isString(data) {
  return typeof data === "string";
}

/**
 * 检测数据是否为 ArrayBuffer
 */
function isArrayBuffer(data) {
  return Object.prototype.toString.call(data) === "[object ArrayBuffer]";
}

/**
 * 检测数据是否为 Object
 */
function isObject(data) {
  return data !== null && typeof data === "object";
}

/**
ObsidianRnDVault/System/scripts/RunJS/Ego/http.request.mjs * 检测数据是否为 Stream
 */
function isStream(data) {
  return isObject(data) && isFunction(data.pipe);
}

/**
 * 检测对象是否为函数
 */
function isFunction(obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
}

/**
 * 尝试解析 JSON 数据（失败时直接返回原数据）
 */
function tryParseJson(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

/**
 * HTTP/HTTPS 请求适配器
 * @param options { method, url, headers, data, responseType }
 *        responseType = arraybuffer, stream
 */
function request(options = {}) {
  // 必须存在 url 参数
  if (!options.url) {
    throw new Error("The request `url` in options is required");
  }
  if (!options.headers) {
    options.headers = {};
  }
  if (!options.headers["Content-Type"]) {
    options.headers["Content-Type"] = DEFAULT_CONTENT_TYPE;
  }

  // 如果存在请求数据则解析之
  let data = options.data;
  if (data && !isStream(data)) {
    if (isString(data)) {
      data = Buffer.from(data, "utf-8");
    } else if (isArrayBuffer(data)) {
      data = Buffer.from(new Uint8Array(data));
    } else if (isObject(data)) {
      data = JSON.stringify(data);
    } else if (Buffer.isBuffer(data)) {
      // Nothing to do...
    } else {
      throw new Error(
        "Request data must be String, Buffer, ArrayBuffer or Stream"
      );
    }
    // 设置请求体长度
    options.headers["Content-Length"] = Buffer.byteLength(data);
  }

  // 将 url 解析成原生请求中使用的 { host, port, path } 等参数
  const url = parse(options.url);
  Object.assign(options, url);

  return new Promise((resolve, reject) => {
    const transport = url.protocol === "https:" ? https : http;
console.log(transport);
    // 根据协议创建请求
    const req = transport.request(options, (res) => {
      const response = {
        statusCode: res.statusCode,
        headers: res.headers,
      };

      // 响应类型为 stream 时直接返回
      if (options.responseType === "stream") {
        response.data = res;
        return resolve(response);
      }

      // 其他响应类型
      const buffer = [];
      res.on("data", (chunk) => {
        buffer.push(chunk);
      });
      res.on("error", (err) => {
        reject(err);
      });
      res.on("end", () => {
        let resData = Buffer.concat(buffer);
        if (options.responseType !== "arraybuffer") {
          resData = tryParseJson(resData.toString("utf8"));
        }
        response.data = resData;
        resolve(response);
      });
    });

    // 请求错误处理
    req.on("error", (err) => reject(err));

    // 发送数据
    if (isStream(data)) {
      data.on("error", (err) => reject(err)).pipe(req);
    } else {
      req.end(data);
    }
  });
}

/**
 * 请求适配器别名
 */
function alias(method, url, data, options = {}) {
  return request(
    Object.assign(options, {
      method,
      url,
      data,
    })
  );
}

export default {
  request: request,
  get: (url, options) => alias("GET", url, null, options),
  head: (url, options) => alias("HEAD", url, null, options),
  opt: (url, options) => alias("OPTIONS", url, null, options),
  post: (url, data, options) => alias("POST", url, data, options),
  put: (url, data, options) => alias("PUT", url, data, options),
  patch: (url, data, options) => alias("PATCH", url, data, options),
  del: (url, options) => alias("DELETE", url, null, options),
};
