import { LyriksProviders } from "./types"

class Lyriks {
    #url: string
    #title: string
    #author: string
    #content: string
    #search: string
    #source: LyriksProviders

    constructor (url: string, title: string, author: string, content: string, search: string, source: LyriksProviders) {
        this.#url = url
        this.#title = title
        this.#author = author
        this.#content = content
        this.#search = search
        this.#source = source
    }

    getURL (): string {
        return this.#url
    }

    getTitle (): string {
        return this.#title
    }

    getAuthor (): string {
        return this.#author
    }

    getContent (): string {
        return this.#content
    }

    getLyrics (): string {
        return this.#content
    }

    getLyriks (): string {
        return this.#content
    }

    getSearch (): string {
        return this.#search
    }

    getSource (): LyriksProviders {
        return this.#source
    }
}

export default Lyriks
