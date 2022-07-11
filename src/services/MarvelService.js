class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    // _apiKey = 'apikey=6327bd2d0793a5aef6b1528c6249095a';
    _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62';


    getResource = async (url) => {

        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }


    getAllCharacters = async () => {

        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=205&${this._apiKey}`);

        return (
            res.data.results
                .map(item => {
                    return this._transformCharacter(item)
                })
        )

    }


    getCharacter = async (id) => {

        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

        return this._transformCharacter(res.data.results[0])
    }


    _transformCharacter = (dataChar) => {
        return {
            img: dataChar.thumbnail.path + "." + dataChar.thumbnail.extension,
            name: dataChar.name,
            descr: dataChar.description ? `${dataChar.description.slice(0, 250)}...` : "В базе данных нету описания для этого персонажа",
            homepage: dataChar.urls[0].url,
            wiki: dataChar.urls[1].url
        }
    }

    // _transformCharacter = (char) => {
    //     return {
    //         name: char.name,
    //         description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
    //         thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
    //         homepage: char.urls[0].url,
    //         wiki: char.urls[1].url
    //     }
    // }
}

export default MarvelService;