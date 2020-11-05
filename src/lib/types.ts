/* eslint-disable no-unused-vars */
export enum LyriksProviders {
    AZ_LYRICS = "AZ_LYRICS",
    MusixMatch= "MusixMatch",
    LyricsFreak= "LyricsFreak",
}

export interface CacheOptions {
    checkPeriod?: number,
    TTL?: number
}

export interface LyriksClientOptions {
    default?: LyriksProviders,
    userAgent?: string,
    timeout?: number,
    cache?: CacheOptions,
    throwErrors?: boolean
}

export interface CacheLyriks {
    url: string,
    title: string,
    author: string,
    content: string,
    searchData: string,
    src: LyriksProviders
}
