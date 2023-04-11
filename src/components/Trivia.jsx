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

	useEffect(() => {
		if (!musicEnd.playEnd) {
			musicObj.letsPlay()
			setTimeout(() => {
				musicObj.stopPlay()
				setMusicEnd({ ...musicEnd, playEnd: true })
			}, 4500)
		}
	}, [musicObj, musicEnd, setMusicEnd])

	useEffect(() => {
		setQuestion(data[questionNumber - 1])
	}, [data, questionNumber])

	const delay = (duration, callback) => {
		setTimeout(() => {
			callback()
		}, duration)
	}

	const handleClick = (a) => {
		setSelectedAnswer(a)
		setClassName('answer active')

		delay(2500, () =>
			setClassName(a.correct ? 'answer correct' : 'answer wrong')
		)
		delay(5000, () => {
			if (a.correct) {
				setMusicEnd({ ...musicEnd, waitEnd: true })
				musicObj.stopWait()
				musicObj.correctAnswer()
				setMusicEnd({ ...musicEnd, waitEnd: false })
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
