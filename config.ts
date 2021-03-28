import { Category, RequiredData, OptionalData, ExcludedData } from './@types';

export const defaultInputDir =
	'C:\\Program Files (x86)\\Steam\\steamapps\\common\\rocketleague\\Binaries\\Win64';
export const defaultOutputDir = './output';

export const baseURL = 'https://rocket-league.com';
export const dbPath = 'items';

export const engineImg = `${baseURL}/content/media/items/avatar/220px/engine.png`;
export const psplusImg = 'https://i.imgur.com/aS0kmAp.png';
export const xboxImg = 'https://i.imgur.com/fbzaLM1.png';

/**
 * Key (Category): Selection from second column of items.csv
 * Value (Path): Last path in url {baseURL}/{dbPath}/{path}
 */
export const categoryToPath: Partial<Record<Category, string>> = {
	Antenna: 'antennas',
	// Blueprint: 'series',
	Body: 'bodies',
	Boost: 'boosts',
	// Bot: UNSUPPORTED,
	// Currency: UNSUPPORTED,
	GoalExplosion: 'explosions',
	Hat: 'toppers',
	EngineAudio: 'engines',
	// MusicStingers: 'anthems',
	PaintFinish: 'paints',
	// PlayerAvatarBorder: 'borders',
	PlayerBanner: 'banners',
	// PlayerTitle: 'titles',
	// PremiumInventory: 'series',
	// ShopItem: UNSUPPORTED,
	Skin: 'decals',
	SupersonicTrail: 'trails',
	Wheels: 'wheels',
};
export const categories = Object.keys(categoryToPath);

/**
 * Web Scraper Attributes
 * 	Required
 *    Necessary for scraper logic and data persistence
 * 	Optional
 *    Additional attributes to store persistently
 * 	Excluded
 *    Values of attributes for items to skip over
 *    Attributes are not stored persistently for items that aren't skipped
 */
export const requiredAttributes: (keyof RequiredData)[] = ['name', 'category'];
export const optionalAttributes: (keyof OptionalData)[] = [
	'editionname',
	'rarity',
];
export const excludedAttributes: ExcludedData = [
	['group-owner', true],
	['series-owner', true],
]; // group-owner or series-owner == true skips over all folder/group icons

/**
 * Key (Web Name): Value of the "data-name" attribute on web page
 * Value (Game Name): Corresponding from last column of items.csv
 */
export const webToGameName = {
	"Samus' Gunship": "Samus's Gunship",
	'Blast Off': 'Blast-Off',
};
