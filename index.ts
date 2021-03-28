import { rmdir, mkdir } from 'fs/promises';
import puppeteer from 'puppeteer';

import { readInput, writeOutput } from './util/io';
import printStats from './util/printStats';
import scrape from './scrape';
import { outputDir } from './config';

(async () => {
	await rmdir(outputDir, { recursive: true });
	await mkdir(outputDir, { recursive: true });

	const db = await readInput();
	if (!db) return;
	const browser = await puppeteer.launch();
	const scrapeResults = await scrape(browser, db);

	printStats(scrapeResults);

	await Promise.all(
		Object.entries(scrapeResults).map(([fileName, jsonData]) =>
			writeOutput(fileName, jsonData)
		)
	);
})();
