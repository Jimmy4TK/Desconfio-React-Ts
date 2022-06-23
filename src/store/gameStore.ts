import { Subject } from "rxjs"
import { Game } from "../gamemenu/gameService"
import { useState, useLayoutEffect } from "react"

let currentGame: Game | undefined

const gameSubject = new Subject<Game | undefined>()

export function useSessionGame() {
  const [game, setGame] = useState(currentGame)

  useLayoutEffect(() => {
    gameSubject.subscribe((newState) => {
      setGame(newState)
    })
  }, [])

  return game
}

export function updateSessionGame(game: Game) {
  currentGame = game
  gameSubject.next(currentGame)
}

export function cleanupSessionGame() {
  currentGame = undefined
  gameSubject.next(currentGame)
}

if (currentGame !== undefined) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  updateSessionGame(currentGame)
}
