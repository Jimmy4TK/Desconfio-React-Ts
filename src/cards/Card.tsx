import React, {useState} from 'react';
import { Drop_card } from '../gamemenu/gameService';
import { useSessionGame } from '../store/gameStore';

export default function CardImg(props:any){
    let id:number
    let number:number
    let suit:string
    let turn:boolean
    let game=useSessionGame()
    
    function Turn(){
        if(props.turn==game?.turn){
            return true
        } else {
            return false
        }
    }

    async function Action(){
        game=await Drop_card(game!.id,{card_id: props.id})
    }

    return(
        <button onClick={()=> Turn() ? Action() : ''}>
            <img src={require('./Naipe '+ props.suit +' '+ props.number+'.png')} width="110" height="166" />
        </button>
    )
}