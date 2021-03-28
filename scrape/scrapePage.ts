import { Browser, ConsoleMessage, HTTPRequest } from 'puppeteer';
import {
	baseURL,
	requiredAttributes,
	optionalAttributes,
	excludedAttributes,
	webToGameName,
	dbPath,
} from '../config';
import scrapeItems from './scrapeItems';
import { WebData } from '../@types';

type EvalFunction = (elements: Element[], ...args: unknown[]) => any[];

export default async function scrapePage(browser: Browser, path?: string) {
	const page = await browser.newPage();
	await page.setBypassCSP(true);
	await page.setRequestInterception(true);
	page.on('request', (req: HTTPRequest) =>
		['stylesheet', 'font', 'image', 'other'].includes(req.resourceType())
			? req.abort()
			: req.continue()
	);
	page.on('console', (msg: ConsoleMessage) => {
		if (['log', 'debug'].includes(msg.type())) {
			console.debug(...msg.args());
		}
	});

	await page.goto(`${baseURL}/${dbPath}/${path}`);
	const items: WebData[] = await page.$$eval(
		'.rlg-item__container',
		scrapeItems as EvalFunction,
		baseURL,
		webToGameName,
		[...requiredAttributes, ...optionalAttributes],
		excludedAttributes
	);
	await page.close();
	return items;
}
