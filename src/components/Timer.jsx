import { useEffect, useState } from 'react'

const Timer = ({
	setStop,
	questionNumber,
	musicObj,
	musicEnd,
	setMusicEnd,
}) => {
	const [timer, setTimer] = useState(30)

	useEffect(() => {
		if (timer === 0) {
			musicObj.stopWait()
			musicObj.wrongAnswer()
			return setStop(true)
		}
		const interval = setInterval(() => {
			setTimer((prev) => prev - 1)
		}, 1000)
		return () => clearInterval(interval)
	}, [setStop, timer, musicObj])

	useEffect(() => {
		setTimer(30)
	}, [questionNumber])

	useEffect(() => {
		if (musicEnd.waitEnd) musicObj.stopWait()
		if (musicEnd.playEnd && !musicEnd.waitEnd) {
			musicObj.waitForAnswer()
		}
	}, [musicObj, musicEnd])

	return timer
}

export default Timer
