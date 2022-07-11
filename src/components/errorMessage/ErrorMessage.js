import img from './error.gif'

const ErrorMessage = () => {

    const styleImg = {
        margin: `0 auto`,
        objectFit: 'cover',
        display: 'block',
        // maxHeight: '200px'
    }

    return (

        <img src={img} style={styleImg} className="error" alt="error-animate" />


    )

}
export default ErrorMessage