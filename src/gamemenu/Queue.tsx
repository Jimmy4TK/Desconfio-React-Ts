import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Container, Table } from 'react-bootstrap';
import GlobalContent from '../common/components/GlobalContent';
import { useSessionGame } from '../store/gameStore';
import { Reload } from './gameService';
import ModalGame from './ModalGame';

export default function Queue(props:any){
    const[count,setCount] = useState(1);
    const history = useNavigate()
    let game = useSessionGame()

    useEffect(() => {        
        if(count!=0){
            setTimeout(actionHandler,5000)
        }
    });

    function actionHandler(){
        if(game!=undefined){
            if(game.state=='waiting_player'){
                updatingGame()
                setCount(count+1)
            } else if(game.state=='in_game'){
                history('/game')
            }
        }else{
            setTimeout(()=>setCount(0),3000)
        }
    }
    
    async function updatingGame(){
        game= await Reload(game!.id);
    }

    function switchState(){
        switch (game?.state) {
            case 'waiting_player':
                return 'Waiting player'
            case 'in_game':
                return 'In Game'
            default:
                break;
        }
    }

    const state=switchState();
    const modal= count===0 ? <ModalGame /> : <div></div>


    return(
        <GlobalContent>
            <Container className="mt-5">
                <Table striped bordered hover variant="secondary">
                    <thead>
                        <tr>
                            <th>Game id: {game?.id}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>State: {state}</td>
                        </tr>
                        <tr>
                            <td>First player: {game?.player1.name}</td>
                        </tr>
                        <tr>
                            <td>Second player: {game?.player2 == undefined ? '' : game?.player2.name}</td>
                        </tr>
                    </tbody>
                </Table>
                
            </Container>
            {modal}
        </GlobalContent>
    )
}