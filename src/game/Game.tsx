import React from 'react';
import { Button } from 'react-bootstrap';
import Cards from '../cards/Cards';
import GlobalContent from "../common/components/GlobalContent";
import { Desconfio } from '../gamemenu/gameService';
import { useSessionGame } from '../store/gameStore';
import WinScreen from './Winscreen';

export default function Game(){
    let game=useSessionGame()
    
    return(
        <GlobalContent>
            <Button onClick={()=>Desconfio(game!.id)}>Desconfio</Button>
            <Cards />
            <WinScreen value={game?.state}/>
        </GlobalContent>
    )
}