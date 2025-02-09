import type { NextPage } from 'next'
import Game from '../components/Game'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Tic Tac Toe with Zustand, Tailwind CSS, and TypeScript
      </h1>
      <Game />
    </div>
  )
}

export default Home;
