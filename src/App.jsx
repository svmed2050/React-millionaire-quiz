import { useEffect, useMemo, useState } from 'react'
import { rawData } from './data.js'

import Trivia from './components/Trivia'
import Timer from './components/Timer'
import Start from './components/Start'

import useSound from 'use-sound'
import correct from './sounds/correct.mp3'
import play from './sounds/play.mp3'
import wait from './sounds/wait.mp3'
import wrong from './sounds/wrong.mp3'
import './app.css'

function App() {
	function shuffle(array) {
		let currentIndex = array.length
		let randomIndex

		while (currentIndex !== 1) {
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--
			;[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			]
		}

		return array
	}

	const [username, setUsername] = useState(null)
	const [questionNumber, setQuestionNumber] = useState(1)
	const [stop, setStop] = useState(false)
	const [earned, setEarned] = useState('$ 0')
	const [letsPlay, { stop: stopPlay }] = useSound(play, { volume: 0.03 })
	const [correctAnswer, { stop: stopCorrect }] = useSound(correct, {
		volume: 0.03,
	})
	const [wrongAnswer, { stop: stopWrong }] = useSound(wrong, { volume: 0.03 })
	const [waitForAnswer, { stop: stopWait }] = useSound(wait, { volume: 0.03 })

	const [musicEnd, setMusicEnd] = useState({
		playEnd: false,
		waitEnd: false,
		correctEnd: false,
		wrongEnd: false,
	})

	const musicObj = {
		letsPlay,
		stopPlay,
		correctAnswer,
		stopCorrect,
		wrongAnswer,
		stopWrong,
		waitForAnswer,
		stopWait,
	}

	const moneyPyramid = useMemo(() => {
		return [
			{ id: 1, amount: '$ 100' },
			{ id: 2, amount: '$ 200' },
			{ id: 3, amount: '$ 300' },
			{ id: 4, amount: '$ 500' },
			{ id: 5, amount: '$ 1000' },
			{ id: 6, amount: '$ 2000' },
			{ id: 7, amount: '$ 4000' },
			{ id: 8, amount: '$ 8000' },
			{ id: 9, amount: '$ 16000' },
			{ id: 10, amount: '$ 32000' },
			{ id: 11, amount: '$ 64000' },
			{ id: 12, amount: '$ 125000' },
			{ id: 13, amount: '$ 250000' },
			{ id: 14, amount: '$ 500000' },
			{ id: 15, amount: '$ 1000000' },
		].reverse()
	}, [])

	const [data, setData] = useState(rawData)
	useEffect(() => {
		setData(shuffle(data))
		console.log(data)
	}, [setData, data])

	useEffect(() => {
		questionNumber > 1 &&
			setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount)
	}, [questionNumber, moneyPyramid])

	return (
		<div className='app'>
			{username ? (
				<>
					{' '}
					<div className='main'>
						{stop ? (
							<>
								<div className='start'>
									<h1 className='endText'>You've earned: {earned}</h1>
									<button
										className='startButton'
										onClick={() => window.location.reload()}
									>
										Start again
									</button>
								</div>
							</>
						) : (
							<>
								<div className='top'>
									<div className='timer'>
										<Timer
											setStop={setStop}
											questionNumber={questionNumber}
											musicObj={musicObj}
											musicEnd={musicEnd}
											setMusicEnd={setMusicEnd}
										/>
									</div>
								</div>
								<div className='bottom'>
									<Trivia
										data={data}
										setStop={setStop}
										questionNumber={questionNumber}
										setQuestionNumber={setQuestionNumber}
										musicObj={musicObj}
										musicEnd={musicEnd}
										setMusicEnd={setMusicEnd}
									/>
								</div>
							</>
						)}
					</div>
					<div className='pyramid'>
						<ul className='moneyList'>
							{moneyPyramid.map((m) => (
								<li
									key={m.id}
									className={
										questionNumber === m.id
											? 'moneyListItem active'
											: 'moneyListItem'
									}
								>
									<span className='moneyListItemNumber'>{m.id}</span>
									<span className='moneyListItemAmount'>{m.amount}</span>
								</li>
							))}
						</ul>
					</div>
				</>
			) : (
				<Start setUsername={setUsername} />
			)}
		</div>
	)
}

export default App
