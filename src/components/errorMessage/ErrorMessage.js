import img from './error.gif'

const ErrorMessage = () => {

    const styleImg = {
        margin: `0 auto`,
        height: `100%`,
        objectFit: 'cover',
        // maxHeight: '260px'
    }
    const styleWrap = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '260px'
    }

    return (

        <div  style={styleWrap} className="error__wrap">
            <img src={img} style={styleImg} alt="error-animate" />
        </div>


    )

}
export default ErrorMessage