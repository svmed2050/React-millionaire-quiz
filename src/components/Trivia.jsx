import { useEffect, useState } from 'react'
import useSound from 'use-sound'
import correct from '../sounds/correct.mp3'
import play from '../sounds/play.mp3'
import wait from '../sounds/wait.mp3'
import wrong from '../sounds/wrong.mp3'

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
	const [question, setQuestion] = useState(null)
	const [selectedAnswer, setSelectedAnswer] = useState(null)
	const [className, setClassName] = useState('answer')
	const [letsPlay] = useSound(play, { volume: 0.03 })
	const [correctAnswer] = useSound(correct, { volume: 0.03 })
	const [wrongAnswer] = useSound(wrong, { volume: 0.03 })
	const [waitForAnswer] = useSound(wait, { volume: 0.03 })

	useEffect(() => {
		letsPlay()
	}, [letsPlay])

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
				correctAnswer()
				delay(1000, () => {
					setQuestionNumber((prev) => prev + 1)
					setSelectedAnswer(null)
				})
			} else {
				wrongAnswer()
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
