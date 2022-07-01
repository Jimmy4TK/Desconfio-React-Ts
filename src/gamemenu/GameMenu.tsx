import React, { useEffect } from 'react';
import GlobalContent from "../common/components/GlobalContent"; 
import ListGames from './ListGames';
import { Create_game, List_incomplete } from "./gameService"          
import { Button } from 'react-bootstrap';
import { useSessionToken } from "../store/tokenStore"
import { useSessionGames } from '../store/gamesStore';
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { useNavigate } from 'react-router-dom';
import DangerLabel from '../common/components/DangerLabel';
import ModalPlayer from './ModalPlayer';

export default function OnlineMenu(){
    const token = useSessionToken()
    const games = useSessionGames()
    const history = useNavigate()
    const errorHandler = useErrorHandler()
    
    useEffect(() => {
        let await_list = async () => {
            try{
                const data = await List_incomplete();
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
        }
        await_list()
    }, []);

    async function CreateGame(){
        await Create_game({ token: token })
        history('/queue')
    }

    function renderListGames(value:number,player:string){
        return(<ListGames value={value} player={player} />)
    }
    
    return (
        <GlobalContent>
            <div className="d-flex flex-row">
                <div><Button className="ms-2 mt-2 btn btn-dark" onClick={CreateGame}>Create New Online Game</Button></div>
                <div className='ms-5 col-8'>
                {games?.games.map((game)=>(renderListGames(game.id,game.player1.name)))}
                <div className='mt-5 col-5 mx-auto'><DangerLabel message={errorHandler.errorMessage} /></div>
                </div>
            </div>
            {token===undefined ? <ModalPlayer /> : ''}
        </GlobalContent>   
    )
}