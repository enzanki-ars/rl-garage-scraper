import { existsSync } from 'fs';
import { rmdir, mkdir } from 'fs/promises';
import puppeteer from 'puppeteer';

import { readInput, writeOutput } from './util/io';
import printStats from './util/printStats';
import scrape from './scrape';
import downloadAssets from './scrape/downloadAssets';
import options from './util/command-line';

const removeTrailingSlash = (str: string) => str.replace(/\/$/, '');

let { clean, download, inputDir, outputDir } = options;
removeTrailingSlash(inputDir);
removeTrailingSlash(outputDir);
const assetsDir = `${outputDir}/assets`;

(async () => {
	if (clean) await rmdir(outputDir, { recursive: true });
	if (!existsSync(outputDir)) await mkdir(outputDir, { recursive: true });

	const db = await readInput(inputDir);
	if (!db) return;
	const browser = await puppeteer.launch();
	const scrapeResults = await scrape(browser, db);

	if (download) {
		if (clean) await rmdir(assetsDir, { recursive: true });
		if (!existsSync(assetsDir)) await mkdir(assetsDir, { recursive: true });
		await downloadAssets(assetsDir, scrapeResults.found);
	}

	printStats(scrapeResults);

	await Promise.all(
		Object.entries(scrapeResults).map(([fileName, jsonData]) =>
			writeOutput(outputDir, fileName, jsonData)
		)
	);
})();
