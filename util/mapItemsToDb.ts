import { WebData, GameData } from '../@types';

export default function mapItemsToDb(items: WebData[], db: GameData[]) {
	const found: Record<number, WebData> = {};
	const missingWeb: WebData[] = [];

	for (const attributes of items) {
		const { name, editionname } = attributes;

		const regexName = name.replace(/(?=[()\[\]])/g, '\\');
		const namePrefix = new RegExp(`^((.+:\\s)|())${regexName}`, 'i');
		const editionSuffix = new RegExp(`_(se|infinity|${editionname})$`, 'i');

		const dbData = db.filter(({ data, name }) => {
			if (!namePrefix.test(name)) return false;
			if (!editionname) return true;
			return editionSuffix.test(data);
		});

		if (dbData.length > 0) {
			for (const { id, category } of dbData) {
				found[id] = { ...attributes, category };
			}
		} else {
			missingWeb.push(attributes);
		}
	}

	return { found, missingWeb };
}
