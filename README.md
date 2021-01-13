# Quick Scraper NodeJS SDK

[![Version](https://img.shields.io/npm/v/quickscraper-sdk.svg)](https://www.npmjs.org/package/quickscraper-sdk)

<img src="https://app.quickscraper.co/assets/images/quick_scraper_logo_3.png" width="300" />

[Register For Free https://www.quickscraper.co](https://www.quickscraper.co)

##### It does supports EcmaScript 8, TypeScript, async-await, Promises !

##### It does also supports for AWS Lambda like serverless cloud function call.

##### Please Feel free to create Issue for any help !

## Installation

``` bash
npm install quickscraper-sdk --save
```

## Get Free Access (Free Forever)

* Register yourself here [https://app.quickscraper.co/auth/register](https://app.quickscraper.co/auth/register)

## Examples
### Typescript
``` typescript
import { QuickScraper } from 'quickscraper-sdk';
const QuickScraperClient = new QuickScraper();

try {
  const ACCESS_TOKEN = '';
  QuickScraperClient.setAccessToken(ACCESS_TOKEN)
  const requestUrl = 'https://mylocation.org';
  const response = await QuickScraperClient.getHtml(requestUrl);
  console.log('htmlResponse ', response.data);
  console.log('metadata ', response.metadata);
  // Manipulate your response here using cheerio
} catch (error) {
  console.log('error ', error);
}
```

### Javascript
``` javascript
const QuickScraper = require('quickscraper-sdk');
const QuickScraperClient = new QuickScraper();

try {
  const ACCESS_TOKEN = '';
  QuickScraperClient.setAccessToken(ACCESS_TOKEN)
  const requestUrl = 'https://mylocation.org';
  const response = await QuickScraperClient.getHtml(requestUrl);
  console.log('htmlResponse ', response.data);
  console.log('metadata ', response.metadata);
  // Manipulate your response here using cheerio
} catch (error) {
  console.log('error ', error);
}
```

## Do you need an expert?

Are you finding a developer for your world-class product? If yes, please contact here. [Submit your project request here.](https://goo.gl/forms/UofdG5GY5iHMoUWg2)
Originally by [Bhushankumar L](mailto:bhushankumar.lilapara@gmail.com).
