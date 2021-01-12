import got from 'got/dist/source';
import { APP } from './constants';

export class QuickScraper {
    private parseUrl: string;
    private accessToken = '';

    constructor(accessToken?: string) {
        this.parseUrl = APP.BASE_URL.concat('parse');
        if (accessToken) {
            this.setAccessToken(accessToken);
        }
    }

    public setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    private prepareRequestUrl(url: string): string {
        const requestUrl = this.parseUrl.concat
            ('?', 'access_token=', this.accessToken,
                '&', 'URL=', url);
        // console.log('requestUrl ', requestUrl);
        return requestUrl;
    }

    public async getHtml(url: string): Promise<string> {
        const requestUrl = this.prepareRequestUrl(url);
        // console.log('requestUrl ', requestUrl);
        const response = await got(requestUrl);
        // console.log('response');
        // console.log(response.body);
        return response.body;
    }
}
