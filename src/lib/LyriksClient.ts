import { EventEmitter } from "events"
import fetch from "node-fetch"
import * as NodeCache from "node-cache"
import * as cheerio from "cheerio"
import * as toXML from "jsontoxml"
import Lyriks from "./Lyriks"
import LyriksProvidersConfig from "./LyriksProvidersConfig"
import { CacheLyriks, LyriksClientOptions, LyriksProviders } from "./types"

class LyriksClient extends EventEmitter {
    options: LyriksClientOptions
    cache: NodeCache

    constructor (options: LyriksClientOptions = {}) {
        super()
        this.options = Object.assign({
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0",
            timeout: 5000,
            default: LyriksProviders.AZ_LYRICS,
            throwErrors: false,
            cache: {
                checkPeriod: 0,
                TTL: 0
            }
        }, options)

        this.cache = new NodeCache({ stdTTL: this.options.cache?.TTL, checkperiod: this.options.cache?.checkPeriod })
    }

    async getLyrics (search: string, source: LyriksProviders = this.options.default!!): Promise<Lyriks | null> {
        if (!Object.values(LyriksProviders).includes(source)) {
            source = LyriksProviders.AZ_LYRICS
        }

        if (this.cache.has(`${source}_${search}`)) {
            const { url, title, author, content, searchData, src } = this.cache.get(`${source}_${search}`) as CacheLyriks
            return new Lyriks(url, title, author, content, searchData, src)
        }
        const config = LyriksProvidersConfig[source]
        try {
            const res = await fetch(config.search.URL.replace("%s", encodeURIComponent(search)), {
                headers: {
                    "user-agent": this.options.userAgent!!
                },
                timeout: this.options.timeout
            })

            let $: cheerio.Root
            let url

            if (config.search.isJSON) {
                const jsonBody = await res.json()
                const xml = toXML(jsonBody)
                $ = cheerio.load(xml, {
                    xmlMode: true
                })
            } else {
                const body = await res.text()
                $ = cheerio.load(body)
            }

            const element: cheerio.Cheerio = $(config.search.select).first()
            if (config.search.isJSON) {
                url = element.text()
            } else {
                url = element.attr("href")
            }

            if (config.parse.useURL) {
                url = config.parse.URL + url
            }

            if (!url) return null

            const URLres = await fetch(url, {
                headers: {
                    "user-agent": this.options.userAgent!!
                },
                timeout: this.options.timeout
            }).then(r => r.text())

            $ = cheerio.load(URLres)
            const title = $(config.parse.title).first().text().trim()
            const author = $(config.parse.author).first().text().trim()
            const content = $(config.parse.content).first().text().trim()

            if (!title || !author || !content) return null

            this.cache.set(`${source}_${search}`, {
                src: source,
                searchData: search,
                url,
                title,
                author,
                content
            })

            return new Lyriks(url, title, author, content, search, source)
        } catch (error) {
            this.emit("parsingError", search, source, error)
            if (this.options.throwErrors) throw error
            return null
        }
    }
}

export default LyriksClient
