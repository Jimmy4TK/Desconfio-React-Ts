import axios, { AxiosError } from "axios"
import { http } from "../common/http"
import { updateSessionGames } from "../store/gamesStore"
import { updateSessionGame } from "../store/gameStore"
import { User } from "../user/userService"

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

  export interface Game {
    id: number
    state: string
    player1: User
    player2: User
    turn: boolean
    suit: string
    discard_pile: number
    cards_player1: Array<Card>
    cards_player2: Array<Card>
  }
  export interface Games {
    games: Array<Game>
  }
  export interface Card{
    id: number
    number: number
    suit: string
    user_id: User["id"]
  }
  
  export async function Create_game(params:{token: string | undefined}):Promise<Game>{
    try{
      const res = (
        await axios.post(http.backendUrl + "/games", params)
      ).data as Game
      localStorage.setItem("game", JSON.stringify(res))
      updateSessionGame(res)
      return res
    } catch (err) {
      const axiosError = err as AxiosError
      throw err
    }
  }
  
  export async function Reload(id:number):Promise<Game>{
    const res = (
        await axios.get(http.backendUrl + "/games/"+ id)
    ).data as Game
    localStorage.setItem("game", JSON.stringify(res))
    updateSessionGame(res)
    return res
  }
  
  export async function List_incomplete():Promise<Games>{
    try{
      const res = (
          await axios.get(http.backendUrl + "/games/incomplete")
        ).data as Games
      updateSessionGames(res)
      return res
    } catch (err) {
      const axiosError = err as AxiosError
      throw err
    }
  }
  
  export async function Assign_player(id:number,params:{token: string | undefined}):Promise<Game>{
    try{
      const res = (
        await axios.put(http.backendUrl + "/games/"+ id+"/assign_player",params)
      ).data as Game
      localStorage.setItem("game", JSON.stringify(res))
      updateSessionGame(res)
      return res
    } catch (err) {
      const axiosError = err as AxiosError
      throw err
    }
  }
  
  export async function Drop_card(id:number,params:{card_id: number}):Promise<Game>{
    const res = (
      await axios.post(http.backendUrl + "/games/"+ id+"/drop_card",params)
    ).data as Game
    localStorage.setItem("game", JSON.stringify(res))
    updateSessionGame(res)
    return res
  }

  export async function Desconfio(id:number):Promise<Game>{
    const res = (
      await axios.get(http.backendUrl + "/games/"+ id+"/desconfio")
    ).data as Game
    localStorage.setItem("game", JSON.stringify(res))
    updateSessionGame(res)
    return res
  }