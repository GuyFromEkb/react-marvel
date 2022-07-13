import React, { Component } from 'react';

import { randomInteger } from '../randomChar/RandomChar';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component {

    // refChar = React.createRef();
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
        // console.log(refChar);
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
            })
            .catch((e) => {
                console.log(e)
                this.setState({
                    error: true,
                    loading: false
                })
            })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        // this.itemRefs[id].focus();
    }


    renderItems(arrChar) {

        const items = arrChar.map((item, i) => {
            const { id, img, name } = item
            const imgStyleChek = img.slice(-17, -4) === 'not_available'
            const style = imgStyleChek ? { objectFit: 'revert' } : null

            return (

                <li
                    className="char__item"
                    tabIndex={0}
                    ref={this.setRef}
                    key={id}
                    onClick={() => {
                        this.props.onGetCharId(id)
                        this.focusOnItem(i);
                        console.log(this.itemRefs);
                    }}
                >
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
