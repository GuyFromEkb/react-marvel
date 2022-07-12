import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { randomInteger } from '../randomChar/RandomChar';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        offset: randomInteger(0, 1498),
        loadingMoreChar: false
    }
    marvelData = new MarvelService()

    componentDidMount() {

        this.onUpdateList()
        // console.log();
    }

    onLoadingMoreChar = () => {

        this.setState({
            loadingMoreChar: true,
            offset: randomInteger(0, 1498)
        })

        this.marvelData.getAllCharacters(this.state.offset)
            .then(data => {
                this.setState(({ charList }) => ({
                    charList: [...charList, ...data],
                    loadingMoreChar: false
                }))
                // console.log(this.state);
            })


    }


    onUpdateList = () => {

        this.setState({
            loading: true,
            offset: randomInteger(0, 1498)
        })

        this.marvelData.getAllCharacters(this.state.offset)
            .then(data => {
                this.setState({
                    charList: data,
                    loading: false,
                    error: false,
                })
                // console.log(this.state);
            })
            .catch((e) => {
                console.log(e)
                this.setState({
                    error: true,
                    loading: false
                })
            })
    }

    renderItems(arrChar) {

        const items = arrChar.map(item => {
            const { id, img, name } = item
            const imgStyleChek = img.slice(-17, -4) === 'not_available'
            const style = imgStyleChek ? { objectFit: 'revert' } : null

            return (
                <li onClick={() => { this.props.onGetCharId(id) }} key={id} className="char__item">
                    <img style={style} src={img} alt="abyss" />
                    <div className="char__name">{name}</div>
                </li>
            )

        })

        return items
    }


    render() {
        const { charList, loading, error, loadingMoreChar } = this.state

        const showErr = error ? <ErrorMessage /> : null
        const showLoad = loading ? <Spinner /> : null
        const showContent = !(error || loading) ? this.renderItems(charList) : null

        return (
            (
                <div className="char__list">
                    <ul className="char__grid">

                        {showErr}
                        {showLoad}
                        {showContent}

                    </ul>
                    <button
                        disabled={loadingMoreChar}
                        onClick={this.onLoadingMoreChar}
                        className="button button__main button__long"
                    >
                        <div className="inner">load more</div>
                    </button>
                </div>
            )
        )
    }

}

export default CharList;
