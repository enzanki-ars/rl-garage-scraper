import { GenericWebData, ExcludedData, WebData } from '../@types';

export default function scrapeItems(
	elements: Element[],
	baseURL: string,
	webToGameName: { [key: string]: string },
	getAttributes: (keyof WebData)[],
	excludedAttributes: ExcludedData
) {
	const posIntRegex = /^\d+$/;
	const attributeNames = getAttributes.concat(
		excludedAttributes.map((attr) => attr[0])
	);

	return elements.reduce((items, el) => {
		const attributes = attributeNames.reduce((attrList, attr) => {
			const value = el.getAttribute(`data-${attr}`);

			// Ignore undefined / invalid attributes
			if (!value || value === '') return attrList;
			// Parse boolean strings
			if (['true', 'false'].includes(value)) attrList[attr] = value === 'true';
			// Parse (positive) integer strings
			else if (posIntRegex.test(value)) attrList[attr] = parseInt(value);
			else attrList[attr] = value;

			return attrList;
		}, {} as GenericWebData) as WebData;

		// Remove temp attributes
		for (const [attr, value] of excludedAttributes) {
			if (attributes[attr] === value) return items;
			delete attributes[attr];
		}

		const itemExt = el
			.querySelector('.rlg-items-item > img')
			?.getAttribute('src');
		attributes.src = `${baseURL}${itemExt}`; // TODO: Make default src for undefined itemExt

		let { name } = attributes;

		// Transform RLGarage name into game item name
		if (name.includes('(Alpha Reward)'))
			name = `(Alpha Reward) ${name.replace(' (Alpha Reward)', '')}`;
		if (name.includes('(Beta Reward)'))
			name = `(Beta Reward) ${name.replace(' (Beta Reward)', '')}`;
		attributes.name = webToGameName[name] ?? name;

		items.push(attributes);
		return items;
	}, [] as WebData[]);
}
