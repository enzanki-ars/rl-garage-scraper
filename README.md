# RL Garage Scraper

Scraper utility to retrieve Rocket League item image urls from 
[RL Garage](https://rocket-league.com/items)

Credit to [kaiserdj](https://github.com/kaiserdj) on the 
[rl-garage-assets](https://github.com/kaiserdj/rl-garage-assets) 
project for references in making this project.

## Install

Clone project
```bash
> git clone https://github.com/grantclark209/rl-garage-scraper.git
> cd rl-garage-scraper
```

Install dependencies
```bash
> yarn
or
> npm install
```

Create or Update `items.csv`
- Launch Rocket League with [Bakkes Mod](https://www.bakkesmod.com/)
- Press `F6` to open the Bakkes Mod console
- Execute `dumpitems`

## Configure

See `config.ts` for customization options

## Usage

```bash
> yarn start
or
> npm run start
```

## Command-Line Arguments
`-c, --clean`: Cleans / removes the output directory before scraping.

`-d, --download`: Downloads the assets from [RL Garage](https://rocket-league.com/items).

`-i, --inputDir <path>`: Specify the input directory. Default:
>C:/ Program Files (x86) / Steam / steamapps / common / rocketleague / Binaries / Win64

`-o, --outputDir <path>`: Specify the output directory. Default:
>{ Project Directory } / output

## Contributing

For bugs, questions, and discussions please use the [Github Issues](https://github.com/grantclark209/rl-garage-scraper/issues)

This project is open-source and open to pull requests.

## Disclaimer

I am not associated with [Psyonix, Inc.](https://www.psyonix.com/) or [RL Garage](https://rocket-league.com/items) in any way.

All scraped assets belong to their respective owners.