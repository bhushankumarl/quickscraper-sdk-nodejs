# Quick Scraper NodeJS SDK

[![Version](https://img.shields.io/npm/v/quickscraper-sdk.svg)](https://www.npmjs.org/package/amazon-mws)
[![Build Status](https://travis-ci.org/bhushankumarl/quickscraper-sdk.svg?branch=master)](https://travis-ci.org/bhushankumarl/quickscraper-sdk)

##### It does supports EcmaScript 8, TypeScript, async-await, Promises, Callback !
##### It does also supports for AWS Lambda like serverless cloud function call.
##### It supports pure JSON response.
##### All methods support Promise and Callback both.
##### Please Feel free to create Issue for any help !

## Installation
```bash
npm install quickscraper-sdk --save
```

## Do you need an expert?
Are you finding a developer for your world-class product? If yes, please contact here. [Submit your project request here.](https://goo.gl/forms/UofdG5GY5iHMoUWg2)
Originally by [Bhushankumar L](mailto:bhushankumar.lilapara@gmail.com).

## Examples
```
import { QuickScraper } from 'quickscraper-sdk';
const QuickScraperClient = new QuickScraper();

try {
    const requestUrl = 'https://mylocation.org';
    const response = await QuickScraperClient.getHtml(requestUrl);
    console.log('response');
    // Manipulate your response here using cheerio
  } catch (error) {
    console.log('error ', error);
  }
```
