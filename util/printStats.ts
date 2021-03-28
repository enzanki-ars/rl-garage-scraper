import { green, yellow, red, magenta } from 'chalk';
import { MultiBar, Presets, GenericFormatter } from 'cli-progress';

import { ScrapeResults } from '../@types';

const header = `${magenta.bold('Source'.padEnd(50))}\t${green.bold(
	'Found'
)} ${yellow.bold('Excluded')} ${red.bold('Missing')}`;

const formatter: GenericFormatter = (options, params, payload) => {
	const { barCompleteString: bar, barsize } = options;
	const { total } = params;
	const { type, found, excluded, missing } = payload;

	const foundBar = Math.round((found / total) * (barsize ?? 40));
	const excludedBar = Math.round((excluded / total) * (barsize ?? 40));
	const missingBar = (barsize ?? 40) - foundBar - excludedBar;

	if (!bar) return '';

	return (
		magenta(type.padEnd(10)) +
		green(bar.substr(0, foundBar)) +
		yellow(bar.substr(0, excludedBar) + red(bar.substr(0, missingBar))) +
		'\t' +
		green(found.toString().padEnd(6)) +
		yellow(excluded.toString().padEnd(9)) +
		red(missing.toString())
	);
};

const multibar = new MultiBar(
	{
		autopadding: true,
		clearOnComplete: false,
		format: formatter,
		hideCursor: true,
		stopOnComplete: true,
	},
	Presets.shades_classic
);

export default function printStats(scrapeResults: ScrapeResults) {
	const foundsize = Object.keys(scrapeResults.found).length;
	const stats = [
		{
			type: 'Game',
			found: foundsize,
			excluded: scrapeResults.excludedDb.length,
			missing: scrapeResults.missingDb.length,
		},
		{
			type: 'Web',
			found: foundsize,
			excluded: 0,
			missing: scrapeResults.missingWeb.length,
		},
	];

	console.log(header);
	for (const payload of stats) {
		const total = Object.values(payload).reduce(
			(total: number, curr) =>
				typeof curr === 'number' ? total + curr : total,
			0
		);
		multibar.create(total, total, payload).stop();
	}
}
