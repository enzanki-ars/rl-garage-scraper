/**
 * Persistent data types
 * Live
 *	Results generated during the scrape
 * Post
 *	Results generated after the scrape
 */

export type LiveScrapeResults = {
	found: Record<number, WebData>;
	missingWeb: WebData[];
};
export type PostScrapeResults = {
	excludedDb: GameData[];
	missingDb: GameData[];
};
export type ScrapeResults = LiveScrapeResults & PostScrapeResults;

/**
 * Game (DB) data types matching items.csv
 */

export type Category =
	| 'Antenna'
	| 'Blueprint'
	| 'Body'
	| 'Boost'
	| 'Bot'
	| 'Currency'
	| 'GoalExplosion'
	| 'Hat'
	| 'EngineAudio'
	| 'MusicStingers'
	| 'PaintFinish'
	| 'PlayerAvatarBorder'
	| 'PlayerBanner'
	| 'PlayerTitle'
	| 'PremiumInventory'
	| 'ShopItem'
	| 'Skin'
	| 'SupersonicTrail'
	| 'Wheels';

export type GameData = {
	id: number;
	category: Category;
	data: string;
	name: string;
};

export type GameDB = Record<Category, GameData[]>;

/**
 * Web data types matching RLGarage items, or transformed variants of such data
 */

export type RequiredData = {
	name: string;
	category: string;
};

export type OptionalData = Partial<{
	platform: number;
	photo: string;
	desc: string;
	group: string;
	'group-owner': boolean;
	series: string;
	'series-owner': boolean;
	rarity: string;
	hasteams: boolean;
	edition: number;
	editionname: string | boolean;
	paintable: boolean;
	hascolors: boolean;
}>;

export type ExcludedData = {
	[K in keyof Required<OptionalData>]: [K, Required<OptionalData>[K]];
}[keyof OptionalData][];

export type GenericWebData = Record<string, boolean | number | string>;

export type WebData = RequiredData &
	OptionalData & {
		src: string;
	};
