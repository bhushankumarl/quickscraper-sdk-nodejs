import got from 'got';
import { APP } from './constants';

export class QuickScraper {
  private parseUrl: string;
  private accessToken = '';

  public constructor(accessToken?: string) {
    this.parseUrl = APP.BASE_URL.concat('parse');
    if (accessToken) {
      this.setAccessToken(accessToken);
    }
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async getHtml(url: string): Promise<any> {
    const requestUrl = this.prepareRequestUrl(url);
    // console.log('requestUrl ', requestUrl);
    const response = await got(requestUrl);
    // console.log('response ', response);
    // console.log('response ', response.headers);
    console.log('response ', response.statusCode);
    // console.log(response.body);

    const metadata = {
      'x-qs-quota-max': response.headers['x-qs-quota-max'],
      'x-qs-quota-remaining': response.headers['x-qs-quota-remaining']
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
}
