import './styles.css'
function ImputText (props) {
    return (
        <div className="containerComponent">
            <h3 className='titleInput'>{props.title}</h3>
            <div className="containerImputText">    
                
                <input 
                    type="text" 
                    placeholder={props.mensage}
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        </div>
    )

}

export default ImputText;