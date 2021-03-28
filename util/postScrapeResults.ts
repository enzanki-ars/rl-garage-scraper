import { GameData, GameDB, WebData } from '../@types';
import { categories, engineImg, psplusImg, xboxImg } from '../config';

const excludeRegex = /bot_|mystery|pack_|preview|test/i;
const psplusRegex = /_psplus$/;
const xboxRegex = /_xboxgamepass$/;

export default function postScrapeResults(
	db: GameDB,
	found: Record<number, WebData>
) {
	const excludedDb: GameData[] = [];
	const missingDb: GameData[] = [];

	for (const item of Object.values(db).flat()) {
		const { id, category, data, name } = item;
		if (psplusRegex.test(data)) {
			found[id] = {
				name,
				category,
				src: psplusImg,
			};
		} else if (xboxRegex.test(data)) {
			found[id] = {
				name,
				category,
				src: xboxImg,
			};
		}

		// Create list of genuinely "missing" RLGarage items that ought to exist there.
		if (found[id]) continue;
		if (category === 'EngineAudio') {
			found[id] = {
				name,
				category,
				src: engineImg,
			};
		} else if (categories.includes(category) && !excludeRegex.test(data)) {
			missingDb.push(item);
		} else {
			excludedDb.push(item);
		}
	}
	return { excludedDb, missingDb };
}
