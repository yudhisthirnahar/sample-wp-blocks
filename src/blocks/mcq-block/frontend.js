import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom'; Old way before React 18
import { createRoot } from 'react-dom/client';
import './frontend.scss';

const blocksToUpdate = document.querySelectorAll( '.swpb-mcq-block' );

if ( blocksToUpdate ) {
	blocksToUpdate.forEach( ( block, index ) => {
		const attributes = JSON.parse( block.dataset.attributes );
		// ReactDOM.render( <MCQBlockFrontend index={`swpb-mcq-block-${index}`} {...attributes} />, block ); Old way before React 18
		const root = createRoot( block );
		root.render( <MCQBlockFrontend index={`swpb-mcq-block-${index}`} {...attributes} /> ); // New way with React 18
	} );
}

function MCQBlockFrontend( props ) {
	const [isCorrect, setIsCorrect] = useState(null);
	const [isCorrectDelayed, setIsCorrectDelayed] = useState(false);
	const [showResult, setShowResult] = useState(false);
	useEffect(() => {
		let showResultTimer, resetTimer, delayedTimer;

		// Only run timers when isCorrect has a value (not null)
		if (isCorrect !== null) {
			// Always show result for 3 seconds when isCorrect changes
			showResultTimer = setTimeout(() => setShowResult(false), 3000);

			if (false === isCorrect) {
				// Reset isCorrect after 2 seconds
				resetTimer = setTimeout(() => setIsCorrect(null), 2000);
			}

			if (isCorrect) {
				// Set delayed state after 1 second
				delayedTimer = setTimeout(() => setIsCorrectDelayed(true), 1000);
			}
		}

		// Cleanup all timers when component unmounts or isCorrect changes.
		return () => {
			if (showResultTimer) clearTimeout(showResultTimer);
			if (resetTimer) clearTimeout(resetTimer);
			if (delayedTimer) clearTimeout(delayedTimer);
		};
	}, [isCorrect]);

	function handleAnswerClick(index) {

		// Show result immediately
		setShowResult(true);
		
		if (index === props.correctAnswer) {
			setIsCorrect(true);
		} else {
			setIsCorrect(false);
		}
	}
	return (
		<div className="swpb-mcq-block-frontend-container" style={{ backgroundColor: props.blockBgColor, textAlign: props.blockAlignment }}>
			<div className="swpb-mcq-block-question">
				<h3>{ props.question }</h3>
			</div>
			<div className="swpb-mcq-block-answers">
				{ props.answers.map( ( answer, index ) => (
					<div key={`swpb-mcq-block-answer-${index}`} className={ 'swpb-mcq-block-answer' + ( isCorrectDelayed && index === props.correctAnswer ? ' swpb-mcq-block-disable-click' : ( isCorrectDelayed && index !== props.correctAnswer ? ' swpb-mcq-block-fade' : '' ) ) } onClick={() => handleAnswerClick(index)}>
						{isCorrectDelayed && index === props.correctAnswer && (
							<span className="swpb-mcq-block-answer-icon swpb-mcq-block-answer-correct-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
									<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
									<path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
								</svg>
							</span>
						)}
						{isCorrectDelayed && index !== props.correctAnswer && (
							<span className="swpb-mcq-block-answer-icon swpb-mcq-block-answer-wrong-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
									<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
								</svg>
							</span>
						)}
						{ answer }
					</div>
				) ) }
			</div>
			<div className={`swpb-mcq-block-result ${showResult ? 'swpb-show' : ''}`}>
				{ isCorrect && (
					<div className="swpb-mcq-block-result-correct-text">
						<p>Correct answer</p>
					</div>
				)}
				{ false === isCorrect && (
					<div className="swpb-mcq-block-result-wrong-text">
						<p>Wrong answer</p>
					</div>
				)}
			</div>
		</div>
	)
}
