<div align = "center">
    <img src = "https://i.imgur.com/FCO49hV.png">
    <hr>
    <br>
    <a href="https://discord.gg/hWbb4Ee">
<img src="https://img.shields.io/discord/543812119397924886?color=7289DA&label=Support&logo=discord&style=for-the-badge" alt="Discord">
</a>

<a href="https://www.npmjs.com/package/lyriks.js">
<img src="https://img.shields.io/npm/dw/lyriks.js?color=CC3534&logo=npm&style=for-the-badge" alt="Downloads">
</a>

<a href="https://www.npmjs.com/package/lyriks.js">
<img src="https://img.shields.io/npm/v/lyriks.js?color=red&label=Version&logo=npm&style=for-the-badge" alt="Npm version">
</a>

<br>

<a href="https://github.com/officialpiyush/lyriks.js">
<img src="https://img.shields.io/github/stars/officialpiyush/lyriks.js?color=333&logo=github&style=for-the-badge" alt="Github stars">
</a>

<a href="https://github.com/officialpiyush/lyriks.js/blob/master/LICENSE">
<img src="https://img.shields.io/github/license/officialpiyush/lyriks.js?color=6e5494&logo=github&style=for-the-badge" alt="License">
</a>
<hr>
</div>

## Installation

**NPM** :

```bash
npm install lyriks.js
```

**Yarn** :

```bash
yarn add lyriks.js
```

## Example usage

```js
const { LyriksClient } = require("lyriks.js")

const lyriksClient = new LyriksClient()

// Promise based
lyriksClient.getLyrics("dynamite").then(lyrik => {
    if(!lyrik) throw "No data found"
    // You can access the data using the following functions
    const author = lyrik.getAuthor()
    const title = lyrik.getAuthor()
    const source = lyrik.getSource()
    const search = lyrik.getSearch()
    const url = lyrik.getURL()
    const lyrics = lyrik.getContent() // or getLyrics() or getLyriks() also works :p

    // Do stuff with the above data
})
```

## Contributors

👤 **Piyush**

- Author
- Website: <https://piyush.codes/>
- Github: [@officialpiyush](https://github.com/officialpiyush)
