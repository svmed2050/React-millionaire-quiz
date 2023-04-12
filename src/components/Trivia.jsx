import { useEffect, useState } from 'react'

const Trivia = ({
	data,
	setStop,
	questionNumber,
	setQuestionNumber,
	musicObj,
	setMusicEnd,
	musicEnd,
}) => {
	const [question, setQuestion] = useState(null)
	const [selectedAnswer, setSelectedAnswer] = useState(null)
	const [className, setClassName] = useState('answer')
	const [onClickCounter, setOnClickCounter] = useState(0)

	useEffect(() => {
		if (onClickCounter) return

		if (!musicEnd.playEnd) {
			musicObj.letsPlay()
			musicObj.waitForAnswer()
		}
	}, [musicObj, musicEnd, setMusicEnd, onClickCounter])

	useEffect(() => {
		setQuestion(data[questionNumber - 1])
	}, [data, questionNumber])

	const delay = (duration, callback) => {
		let timerID
		timerID = setTimeout(() => {
			callback()
			clearTimeout(timerID)
		}, duration)
	}

	const handleClick = (a) => {
		if (!onClickCounter) {
			setOnClickCounter(1)

			setSelectedAnswer(a)
			setClassName('answer active')

			musicObj.stopWait()

			delay(2500, () => {
				setClassName(a.correct ? 'answer correct' : 'answer wrong')
				console.log(className)
			})

			delay(5000, () => {
				if (a.correct) {
					setMusicEnd({ ...musicEnd, waitEnd: true, playEnd: true })
					musicObj.stopWait()
					musicObj.correctAnswer()
					setMusicEnd({ ...musicEnd, waitEnd: false, playEnd: true })
					delay(1000, () => {
						setQuestionNumber((prev) => prev + 1)
						setSelectedAnswer(null)
					})
				} else {
					musicObj.stopWait()
					musicObj.wrongAnswer()
					delay(1000, () => {
						setStop(true)
					})
				}
			})
			delay(6000, () => {
				setOnClickCounter(0)
			})
		}
	}

	return (
		<div className='trivia'>
			<div className='question'>{question?.question}</div>
			<div className='answers'>
				{question?.answers.map((a) => {
					return (
						<div
							className={selectedAnswer === a ? className : 'answer'}
							key={a.text}
							onClick={() => handleClick(a)}
						>
							{a.text}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Trivia
