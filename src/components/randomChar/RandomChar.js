import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


class RandomChar extends Component {

    // constructor() {
    //     super()
    //     // this.updateChar();
    //     // this.tst()
    // }
    componentDidMount() {
        this.updateChar();
    }

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelData = new MarvelService();


    updateChar = () => {

        const MIN_ID = 1011000
        const MAX_ID = 1011400
        const id = randomInteger(MIN_ID, MAX_ID)

        this.marvelData.getCharacter(id)
            .then(data => {
                // console.log(data)
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


        // случайное число от min до (max+1)
        // function randomInteger(min, max) {

        //     let rand = min + Math.random() * (max + 1 - min);
        //     return Math.floor(rand);
        // }
    }



    onUpdateChar = () => {
        this.setState({
            loading: true,
            error: false
        })
        this.updateChar()
    }


    render() {

        const { loading, char, error } = this.state
        const showErr = error ? <ErrorMessage /> : null
        const showLoad = loading ? <Spinner /> : null
        const showContent = !(error || loading) ? this.charInfo(char) : null



        return (

            <div className="randomchar">

                {showErr}
                {showLoad}
                {showContent}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.onUpdateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>

            </div>
        )
    }

    charInfo(objInfo) {

        const { img, name, descr, homepage, wiki } = objInfo

        const imgStyleChek = img.slice(-17, -4) === 'not_available'
        const style = imgStyleChek ? { objectFit: 'revert' } : null

        // console.log(imgStyleChek);
        return (
            <div className="randomchar__block">
                <img src={img} alt={name} style={style} className={`randomchar__img ${1}`} />
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {descr}
                    </p>
                    <div className="randomchar__btns">

                        <a
                            // onClick={this.showState}
                            href={homepage}
                            className="button button__main">
                            <div className="inner">homepage</div>
                        </a>

                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    // showState = (e) => {
    //     e.preventDefault()
    //     console.log(this.state.char);
    // }

    // tst = () => {
    //     this.marvelData.getAllCharacters()
    //         .then(data => console.log(data))
    // }

}


export function randomInteger(min, max) {

    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


export default RandomChar;


