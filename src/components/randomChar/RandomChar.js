import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';


class RandomChar extends Component {

    constructor() {
        super()
        this.updateChar();
        // this.tst()
    }

    state = {
        char: {},
    }

    marvelData = new MarvelService();

    // tst = () => {
    //     this.marvelData.getAllCharacters()
    //         .then(data => console.log(data))
    // }

    updateChar = () => {

        const MIN_ID = 1011000
        const MAX_ID = 1011400
        const id = randomInteger(MIN_ID, MAX_ID)

        this.marvelData.getCharacter(id)
            .then(data => {
                this.setState({ char: data })
            })

        // случайное число от min до (max+1)
        function randomInteger(min, max) {

            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
    }

    // showState = (e) => {
    //     e.preventDefault()
    //     console.log(this.state.char);
    // }


    render() {

        const { img, name, descr, homepage, wiki } = this.state.char

        return (

            <div className="randomchar">

                <div className="randomchar__block">
                    <img src={img} alt={name} className="randomchar__img" />
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

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>

            </div>
        )


    }
}







export default RandomChar;




// return (

//     <div className="randomchar">

//         <div className="randomchar__block">
//             <img src={img} alt="Random character" className="randomchar__img" />
//             <div className="randomchar__info">
//                 <p className="randomchar__name">Thor</p>
//                 <p className="randomchar__descr">
//                     As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...
//                 </p>
//                 <div className="randomchar__btns">
//                     <a href="#" className="button button__main">
//                         <div className="inner">homepage</div>
//                     </a>
//                     <a href="#" className="button button__secondary">
//                         <div className="inner">Wiki</div>
//                     </a>
//                 </div>
//             </div>
//         </div>

//         <div className="randomchar__static">
//             <p className="randomchar__title">
//                 Random character for today!<br />
//                 Do you want to get to know him better?
//             </p>
//             <p className="randomchar__title">
//                 Or choose another one
//             </p>
//             <button className="button button__main">
//                 <div className="inner">try it</div>
//             </button>
//             <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
//         </div>

//     </div>
// )