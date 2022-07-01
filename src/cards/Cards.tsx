import React, { useEffect, useState } from "react";
import GlobalContent from "../common/components/GlobalContent";
import { Card } from "../gamemenu/gameService";
import { useSessionGame } from "../store/gameStore";
import { Reload } from '../gamemenu/gameService';
import { useSessionUser } from '../store/userStore';
import CardImg from "./Card";
import './Cards.css'

export default function Cards(){
    let game=useSessionGame()
    let user=useSessionUser()
    let player:string = game?.turn ? game.player1.name : game!.player2.name
    let turn:boolean
    const[count,setCount] = useState(1);

    turn =user?.id==game?.player1.id ? true : false

    useEffect(() => {
        if(count==0){
            setTimeout(()=>setCount(1),5000)
            return
        } 

        setTimeout(async ()=>{
            if(turn==game?.turn){
                setCount(0)
                return
            }

            game= await Reload(game!.id)
            setCount(count+1)
        },5000)
    });

    function renderCard(card:Card){
        return <CardImg id={card.id} number={card.number} suit={card.suit} turn={turn} />
    }

    return(
        <div>
            <div className="ms-5 mt-3 text-center">
                {game?.suit!=undefined ? <div>First Card Suit: {game?.suit}</div> : ''}
                <div>Player Turn: {player} </div>
            </div>
            <div className="cards">
                {game?.player1.id==user?.id ? game?.cards_player1.map((card) => {
                    return renderCard(card)
                }) : game?.cards_player2.map((card) => {
                    return renderCard(card)
                })}
            </div>
        </div>
    )
}