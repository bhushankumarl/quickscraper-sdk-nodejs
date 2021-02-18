import Debug from 'debug';
import * as fs from 'fs-extra';
import got from 'got';
import { version } from '../package.json';
import { APP } from './constants';
import { QsError } from './error';
const debug = Debug('QS:index.ts');

export interface IQuickScraperMetadata {
  quotaMax: string | undefined,
  quotaRemaining: string | undefined
}

export interface IQuickScraperResponse {
  data: string,
  metadata: IQuickScraperMetadata
}

export interface IParseOptions {
  render?: boolean
  keep_headers?: boolean
  country_code?: string
  session_number?: string
  headers?: { [key: string]: string }
}

export class QuickScraper {
  private parseUrl: string;
  private accessToken = '';
  private DEFAULT = {
    CLIENT: 'NODEJS_CLIENT_LIB',
    HOST: APP.BASE_URL,
    CLIENT_VERSION: version
  }

  public constructor(accessToken?: string) {
    this.parseUrl = this.DEFAULT.HOST.concat('parse');
    if (accessToken) {
      this.setAccessToken(accessToken);
    }
  }

  public setHost(host: string) {
    if (host) {
      this.parseUrl = host.concat('parse');
    }
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async getHtml(url: string, parseOptions: IParseOptions = {}): Promise<IQuickScraperResponse> {
    const requestUrl = this.prepareRequestUrl(url);
    debug('requestUrl ', requestUrl);
    const customHeaders = parseOptions.headers;
    const headers = this.prepareHeaders(customHeaders);
    const options = {
      headers: headers
    };
    try {
      const response = await got(requestUrl, options);
      // console.log('response ', response);
      // console.log('response ', response.headers);
      // debug('response.statusCode ', response.statusCode);
      // console.log(response.body);
      // debug('response.error ', response.error);
      const metadata = {
        'quotaMax': response.headers['x-qs-quota-max']?.toString(),
        'quotaRemaining': response.headers['x-qs-quota-remaining']?.toString()
      }
      return {
        data: response.body,
        metadata: metadata
      };
    } catch (error) {
      debug('error ', error);
      // console.log('error ', error);
      const message = error.message || 'Failed to process request';
      const type = error.type || 'UNKNOWN';
      const statusCode = error.statusCode || 530;
      debug('error message ', message);
      debug('error statusCode ', statusCode);
      debug('error type ', type);
      throw new QsError(message, type, statusCode);
    }
  }

  public async writeHtmlToFile(url: string, filePath: string, parseOptions?: IParseOptions): Promise<IQuickScraperResponse> {
    const isFileExits = await fs.pathExists(filePath);
    if (isFileExits === false) {
      const message = 'File does not exits.';
      const errorCode = 'FILE_NOT_EXITS';
      const statusCode = 400;
      throw new QsError(message, errorCode, statusCode);
      // throw Error('File does not exits.');
    }
    const response: IQuickScraperResponse = await this.getHtml(url, parseOptions);
    fs.outputFileSync(filePath, response.data);
    return response;
  }

  private prepareRequestUrl(url: string): string {
    const requestUrl = this.parseUrl.concat('?', 'access_token=', this.accessToken,
      '&', 'URL=', url);
    // console.log('requestUrl ', requestUrl);
    return requestUrl;
  }

  private prepareHeaders(customHeaders?: { [key: string]: string }) {
    const headers = {
      client: this.DEFAULT.CLIENT,
      clientVersion: this.DEFAULT.CLIENT_VERSION,
    };
    const mergedHeaders = {
      ...headers,
      ...customHeaders
    };
    return mergedHeaders;
  }
}

module.exports = QuickScraper;
module.exports.QuickScraper = QuickScraper;
module.exports.default = QuickScraper;