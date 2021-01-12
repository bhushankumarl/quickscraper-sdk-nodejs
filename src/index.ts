import Debug from 'debug';
import got from 'got';
import { APP } from './constants';
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
    client: 'NODEJS_CLIENT_LIB'
  }

  public constructor(accessToken?: string) {
    this.parseUrl = APP.BASE_URL.concat('parse');
    if (accessToken) {
      this.setAccessToken(accessToken);
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
    const response = await got(requestUrl, options);
    // console.log('response ', response);
    // console.log('response ', response.headers);
    debug('response.statusCode ', response.statusCode);
    // console.log(response.body);

    const metadata = {
      'quotaMax': response.headers['x-qs-quota-max']?.toString(),
      'quotaRemaining': response.headers['x-qs-quota-remaining']?.toString()
    }
    return {
      data: response.body,
      metadata: metadata
    };
  }

  private prepareRequestUrl(url: string): string {
    const requestUrl = this.parseUrl.concat('?', 'access_token=', this.accessToken,
      '&', 'URL=', url);
    // console.log('requestUrl ', requestUrl);
    return requestUrl;
  }

  private prepareHeaders() {
    const headers = {
      client: this.DEFAULT.client
    };
    return headers;
  }
}
