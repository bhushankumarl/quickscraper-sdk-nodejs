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

  public async getHtml(url: string): Promise<IQuickScraperResponse> {
    const requestUrl = this.prepareRequestUrl(url);
    // console.log('requestUrl ', requestUrl);
    const headers = this.prepareHeaders();
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
      debug('error.message ', error.message);
      debug('error.statusCode ', error.statusCode);
      debug('error.type ', error.type);
      // console.log('error ', error);
      const message = error.message || 'Failed to process request';
      const type = error.type || 'UNKNOWN';
      const statusCode = error.statusCode || 530;
      throw new QsError(message, type, statusCode);
    }
  }

  public async writeHtmlToFile(url: string, filePath: string): Promise<IQuickScraperResponse> {
    const isFileExits = await fs.pathExists(filePath);
    if (isFileExits === false) {
      const message = 'File does not exits.';
      const errorCode = 'FILE_NOT_EXITS';
      const statusCode = 400;
      throw new QsError(message, errorCode, statusCode);
      // throw Error('File does not exits.');
    }
    const response: IQuickScraperResponse = await this.getHtml(url);
    fs.outputFileSync(filePath, response.data);
    return response;
  }

  private prepareRequestUrl(url: string): string {
    const requestUrl = this.parseUrl.concat('?', 'access_token=', this.accessToken,
      '&', 'URL=', url);
    // console.log('requestUrl ', requestUrl);
    return requestUrl;
  }

  private prepareHeaders() {
    const headers = {
      client: this.DEFAULT.CLIENT,
      clientVersion: this.DEFAULT.CLIENT_VERSION
    };
    return headers;
  }
}

module.exports = QuickScraper;
module.exports.QuickScraper = QuickScraper;
module.exports.default = QuickScraper;