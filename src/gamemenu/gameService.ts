import axios, { AxiosError } from "axios"
import { http } from "../common/http"
import { updateSessionGames } from "../store/gamesStore"
import { updateSessionGame } from "../store/gameStore"

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

export interface Game {
    id: number
    player1: string
    player2: string
    state: string
  }
  export interface Games {
    games: Array<Game>
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
  
  export async function Check_player(id:number):Promise<Game>{
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
  