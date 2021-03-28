import { writeFile } from 'fs/promises';
import puppeteer, { Browser } from 'puppeteer';
import PromisePool from 'es6-promise-pool';
import { green, blue } from 'chalk';
import { SingleBar, Presets } from 'cli-progress';
import { WebData } from '../@types';

const bar = new SingleBar(
	{
		autopadding: true,
		clearOnComplete: false,
		format: `${blue.bold('Downloading Assets')} ${green(
			'{bar}'
		)} | ${'{percentage}%'.padEnd(4)} | {value}/{total} | ETA: {eta}s`,
		hideCursor: true,
		stopOnComplete: true,
	},
	Presets.shades_classic
);

async function download(
	browser: Browser,
	dir: string,
	id: number | string,
	src: string
) {
	const page = await browser.newPage();
	const source = await page.goto(src);
	await writeFile(`${dir}/${id}.png`, await source.buffer());
	bar.increment();
	await page.close();
}

export default async function downloadAssets(
	dir: string,
	found: Record<number, WebData>
) {
	const browser = await puppeteer.launch();
	const items = Object.entries(found);

	bar.start(items.length, 0);

	function promiseProducer() {
		const item = items.pop();
		return item ? download(browser, dir, item[0], item[1].src) : null;
	}

	//@ts-ignore
	const pool = new PromisePool(promiseProducer, 20);
	await pool.start();
	await browser.close();
	bar.stop();
}
