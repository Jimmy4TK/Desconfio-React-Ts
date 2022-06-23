import { Subject } from "rxjs"
import { Games } from "../gamemenu/gameService"
import { useState, useLayoutEffect } from "react"

let currentGames: Games | undefined

const gamesSubject = new Subject<Games | undefined>()

export function useSessionGames() {
  const [games, setGames] = useState(currentGames)

  useLayoutEffect(() => {
    gamesSubject.subscribe((newState) => {
      setGames(newState)
    })
  }, [])

  return games
}

export function updateSessionGames(games: Games) {
  currentGames = games
  gamesSubject.next(currentGames)
}

export function cleanupSessionGames() {
  currentGames = undefined
  gamesSubject.next(currentGames)
}

if (currentGames !== undefined) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  updateSessionGames(currentGames)
}
