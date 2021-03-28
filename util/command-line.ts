import { program } from 'commander';
import { defaultInputDir, defaultOutputDir } from '../config';

program.version('1.0.0');
program
	.option('-c, --clean', 'clean output directory before writing')
	.option('-d, --download', 'download scraped assets to output directory')
	.option(
		'-i, --inputDir <path>',
		'specify an input directory',
		defaultInputDir
	)
	.option(
		'-o, --outputDir <path>',
		'specify an output directory',
		defaultOutputDir
	);

program.parse(process.argv);

export default program.opts();
