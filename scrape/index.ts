import _ from 'lodash';
import { Browser } from 'puppeteer';

import { categoryToPath } from '../config';
import { Category, GameDB, LiveScrapeResults } from '../@types';

import mapItemsToDb from '../util/mapItemsToDb';
import postScrapeResults from '../util/postScrapeResults';
import scrapePage from './scrapePage';

export default async function scrape(browser: Browser, db: GameDB) {
	// Scrape each page we're interested from RLGarage.
	const scrapeResults = await Promise.all(
		Object.entries(categoryToPath).map(async ([category, path]) => {
			const items = await scrapePage(browser, path);
			return mapItemsToDb(items, db[category as Category]);
		})
	);
	await browser.close();

	const { found, missingWeb } = scrapeResults.reduce(
		(
			{ found: allFound, missingWeb: allMissingWeb },
			{ found: currFound, missingWeb: currMissingWeb }
		) => {
			const found = Object.assign(allFound, currFound);
			const missingWeb = allMissingWeb.concat(currMissingWeb);
			return { found, missingWeb };
		},
		{ found: {}, missingWeb: [] } as LiveScrapeResults
	);

	const { excludedDb, missingDb } = postScrapeResults(db, found);

	return { found, excludedDb, missingDb, missingWeb };
}
