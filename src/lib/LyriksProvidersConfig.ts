export default {
    AZ_LYRICS: {
        search: {
            URL: "https://search.azlyrics.com/search.php?q=%s",
            isJSON: false,
            select: "a[href*='lyrics/']"
        },
        parse: {
            title: "div.ringtone ~ b",
            author: "div.lyricsh b",
            content: "div.ringtone ~ div",
            useURL: false,
            URL: ""
        }
    },

    MusixMatch: {
        search: {
            URL: "https://www.musixmatch.com/search/%s",
            isJSON: false,
            select: "a.title[href*='lyrics/']"
        },
        parse: {
            title: "h1",
            author: "h2 span a",
            content: "div.mxm-lyrics > span",
            useURL: true,
            URL: "https://www.musixmatch.com"
        }
    },

    LyricsFreak: {
        search: {
            URL: "https://www.lyricsfreak.com/search.php?q=%s",
            isJSON: false,
            select: "a.song[href*='.html']"
        },
        parse: {
            title: "div#breadcrumb span > span[itemprop=title]",
            author: "h2.lyric-song-head a",
            content: "div#content",
            useURL: true,
            URL: "https://www.lyricsfreak.com"
        }
    }

}
