import React,{useState} from "react";

const Player = ({name, symbol, isActive, onChangeName}) => {
    const [changeName, setChangeName] = useState(name)
    const [valid, setValid] = useState(false);

    const editHandler =() => {
        setValid((valid) => !valid);

        if(valid){
            onChangeName(symbol, changeName);
        }
    }

    const changeHandler = (event) => {
        setChangeName(event.target.value)
    }

    let playerName = <span className="player-name">{changeName}</span>

    if(valid){
        playerName = <input type="text" required value={changeName} onChange={changeHandler}/>
    }

    return(
        <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {playerName}
          <span className="player-symbol">{symbol}</span>
          <button onClick={editHandler}>{valid ? 'save' : 'edit' }</button>
        </span>
        </li>
    )
}

export default Player;