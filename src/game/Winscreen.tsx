import React, { useEffect } from 'react';
import GlobalContent from "../common/components/GlobalContent";
import { useNavigate } from 'react-router-dom';
import './Winscreen.css'

export default function WinScreen(props:any){
    let value:string;
    const history = useNavigate()


    useEffect(()=>{
        if(props.value!='in_game'){
            setTimeout(()=>history('/menu'),8000)
        }
    });

    switch(props.value){
        case 'win_player1':
            return(
                <GlobalContent>
                    <div className="background"><div className="winscreen">Player 1 Won</div></div>
                </GlobalContent>
            )
        case 'win_player2':
            return(
                <GlobalContent>
                    <div className="background"><div className="winscreen">Player 2 Won</div></div>
                </GlobalContent>
            )
        default:
            return(
                <div></div>
            )
    }

}