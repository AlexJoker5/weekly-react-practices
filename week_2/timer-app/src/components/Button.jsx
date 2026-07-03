function Button({ buttonName, buttonStyle, clickHandler}) {

    return (
        <button className={`${buttonStyle}`} onClick={clickHandler} >{buttonName}</button>
    )

}

export default Button;