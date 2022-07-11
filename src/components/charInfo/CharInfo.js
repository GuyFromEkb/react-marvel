import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {

    state = {
        char: {},
        loading: false,
        error: false
    }
    marvelData = new MarvelService();

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.charId === this.props.charId) return

        this.showChar();

    }
    componentDidMount() {

    }

    showChar = () => {

        const { charId } = this.props

        if (!charId) {
            console.log("return");
            return;
        }

        this.setState({
            loading: true,
            error: false
        })

        this.marvelData.getCharacter(charId)
            .then(data => {
                console.log("zawel");
                this.setState({
                    char: data,
                    loading: false
                })
            })
            .catch((e) => {
                console.log(e)
                this.setState({
                    loading: false,
                    error: true
                })
            })
    }




    render() {
        const { char, loading, error } = this.state
        const { charId } = this.props

        const showSkeleton = !(charId || loading || error) ? <Skeleton /> : null
        const showLoading = loading ? <Spinner /> : null
        const showErr = error ? <ErrorMessage /> : null
        const showContent = !(loading || error || Object.keys(char).length === 0) ? this.charInfo(char) : null

        // const showContent = Object.keys(char).length > 0 ? this.charInfo(char) : null
        return (
            <div className="char__info">


                {showSkeleton}
                {showLoading}
                {showErr}
                {showContent}


            </div>
        )
    }

    charInfo(objInfo) {

        const { img, name, descr, homepage, wiki, comics } = objInfo

        const imgStyleChek = img.slice(-17, -4) === 'not_available'
        const style = imgStyleChek ? { objectFit: 'revert' } : null


        const renderComics = () => {

            if (comics == false) {
                return (
                    <p>{'В базе данных не найденно комиксов по данному персонажу :('}</p>
                )
            }

            return comics.map((item, index) => {

                return (
                    <li key={index} className="char__comics-item">
                        {item.name}
                    </li>
                )
            })
        }
        return (
            <>
                <div className="char__basics">
                    <img style={style} src={img} alt={name} />
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a target={'_blank'} href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a target={'_blank'} href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {descr}
                </div>

                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">

                    {renderComics()}

                </ul>
            </>
        )
    }
}

export default CharInfo;



// return (
//     <div className="char__info">
//         <div className="char__basics">
//             <img src={thor} alt="abyss" />
//             <div>
//                 <div className="char__info-name">thor</div>
//                 <div className="char__btns">
//                     <a href="#" className="button button__main">
//                         <div className="inner">homepage</div>
//                     </a>
//                     <a href="#" className="button button__secondary">
//                         <div className="inner">Wiki</div>
//                     </a>
//                 </div>
//             </div>
//         </div>
//         <div className="char__descr">
//             In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
//         </div>
//         <div className="char__comics">Comics:</div>
//         <ul className="char__comics-list">
//             <li className="char__comics-item">
//                 All-Winners Squad: Band of Heroes (2011) #3
//             </li>
//             <li className="char__comics-item">
//                 Alpha Flight (1983) #50
//             </li>
//             <li className="char__comics-item">
//                 Amazing Spider-Man (1999) #503
//             </li>
//             <li className="char__comics-item">
//                 Amazing Spider-Man (1999) #504
//             </li>
//             <li className="char__comics-item">
//                 AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
//             </li>
//             <li className="char__comics-item">
//                 Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
//             </li>
//             <li className="char__comics-item">
//                 Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
//             </li>
//             <li className="char__comics-item">
//                 Vengeance (2011) #4
//             </li>
//             <li className="char__comics-item">
//                 Avengers (1963) #1
//             </li>
//             <li className="char__comics-item">
//                 Avengers (1996) #1
//             </li>
//         </ul>
//     </div>
// )