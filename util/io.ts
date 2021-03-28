import { blue, red, green, yellow, magenta } from 'chalk';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

import { Category, GameDB } from '../@types';

export async function readInput(inputDir: string) {
	const inputFile = `${inputDir}\\items.csv`;
	try {
		const csvData = await readFile(inputFile, 'latin1');
		return csvData.split('\r').reduce((result, item) => {
			const [id, type, data, name] = item.split(',');
			const category = type as Category;
			if (!result[category]) result[category] = [];
			const idNum = parseInt(id);
			if (isNaN(idNum)) return result;
			result[category].push({
				id: idNum,
				category,
				data,
				name,
			});
			return result;
		}, {} as GameDB);
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.log(
				red.bold('Unable to open file: ') + yellow.underline(inputFile)
			);
			console.log(green.bold('Recommended Fix'));
			if (existsSync(inputDir)) {
				console.log(blue('1. Launch Rocket League with BakkesMod'));
				console.log(
					blue('2. Press ') +
						magenta('F6 ') +
						blue('to open the BakkesMod console')
				);
				console.log(
					blue('3. Type ') +
						magenta('dumpitems ') +
						blue('and press ') +
						magenta('ENTER')
				);
			} else {
				console.log(
					green('Open ') +
						yellow.underline('config.(js|ts) ') +
						green('and set') +
						magenta.bold('inputDir')
				);
			}
		} else {
			console.error(err);
		}
	}
}

export async function writeOutput(
	outputDir: string,
	fileName: string,
	jsonData: any
) {
	// Write object to JSON
	if (!Array.isArray(jsonData)) {
		const file = `${outputDir}/${fileName}.json`;
		if (Object.keys(jsonData).length === 0) return;
		return await writeFile(file, JSON.stringify(jsonData));
	}
	// Write object to CSV
	const file = `${outputDir}/${fileName}.csv`;
	if (jsonData.length === 0) return;
	const headers = Object.keys(jsonData[0]);
	const csv = [
		headers,
		...jsonData.map((item) => headers.map((field) => item[field]).join(',')),
	].join('\r');
	await writeFile(file, csv);
}
