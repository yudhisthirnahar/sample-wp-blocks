import { registerBlockType } from '@wordpress/blocks';
import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow, ColorPicker } from '@wordpress/components';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import './index.scss';

// Function to lock the post saving if there is no correct answer set, also answer is not empty.
(function() {
	let locked = false;
	wp.data.subscribe( () => {
		const blocks = wp.data.select( 'core/block-editor' ).getBlocks();
		const mcqBlocks = blocks.filter( block => block.name === 'sample-wp-blocks/mcq-block' );

		// Check for any MCQ block missing a correct answer (undefined or null).
		const missingCorrectAnswer = mcqBlocks.some(
			block => typeof block.attributes.correctAnswer !== 'number'
		);

		// Check: answers must be an array, not empty, and have at least 2 answers.
		const hasInvalidAnswers = mcqBlocks.some(
			block => {
				const answers = block.attributes.answers;
				if ( ! Array.isArray( answers ) || answers.length < 2 ) {
					return true;
				}
				const nonEmptyAnswers = answers.filter(
					answer => typeof answer !== 'string' || '' === answer.trim()
				);
				return nonEmptyAnswers.length > 0;
			}
		);

		const shouldLock = missingCorrectAnswer || hasInvalidAnswers;

		if ( shouldLock && ! locked ) {
			locked = true;
			wp.data.dispatch( 'core/editor' ).lockPostSaving( 'noanswer' );
		} else if ( ! shouldLock && locked ) {
			locked = false;
			wp.data.dispatch( 'core/editor' ).unlockPostSaving( 'noanswer' );
		}
	} );
})();

registerBlockType( 'sample-wp-blocks/mcq-block', {
	title: 'MCQ Block',
	icon: 'editor-help',
	category: 'widgets',
	attributes: {
		question: {
			type: 'string',
			default: ''
		},
		answers: {
			type: 'array',
			default: ['']
		},
		correctAnswer: {
			type: 'number',
			default: undefined
		},
		blockBgColor: {
			type: 'string',
			default: '#FFFFFF'
		},
		blockAlignment: {
			type: 'string',
			default: 'left'
		}
	},
	description: 'A block for creating multiple choice questions. This block is a simple MCQ block that allows you to create a multiple choice question with multiple answers.',
	example: {
		attributes: {
			question: 'What is the capital of France?',
			answers: ['Paris', 'London', 'Berlin', 'Madrid'],
			correctAnswer: 0,
			blockBgColor: '#FFFFFF',
			blockAlignment: 'left'
		}
	},
	edit: EditComponent,
	save: function() {
		return null
	},
});

function EditComponent(props) {
	const { attributes, setAttributes } = props;
	function addAnswer() {
		setAttributes({ answers: [...attributes.answers, null] });
	}

	function deleteAnswer(index) {
		setAttributes({ answers: attributes.answers.filter((v, i) => i !== index) });
	}

	function markAsCorrectAnswer(index) {
		setAttributes({ correctAnswer: index });
	}

	function updateAnswer(value, index) {
		const newAnswers = attributes.answers.concat([]);
		newAnswers[index] = value;
		setAttributes({ answers: newAnswers });
	}

	return (
		<div className="swpb-mcq-block" style={{ backgroundColor: attributes.blockBgColor }}>
			<BlockControls>
				<AlignmentToolbar
					value={attributes.blockAlignment}
					onChange={(value) => setAttributes({ blockAlignment: value })}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody title="MCQ Block Settings" initialOpen={true}>
					<PanelRow>
						<ColorPicker
							color={attributes.blockBgColor}
							onChangeComplete={(value) => setAttributes({ blockBgColor: value.hex })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<TextControl
				label="Question:"
				value={attributes.question}
				onChange={(value) => setAttributes({ question: value })}
			/>
			<hr />
			<p className='swpb-mcq-answers-title'>ANSWERS:</p>
			{
				attributes.answers.map((answer, index) => {
					return (
						<Flex key={index} className='swpb-mcq-answers-flex-item'>
							<FlexBlock>
								<TextControl className='swpb-mcq-answer-text-control'
									autoFocus={null === answer} // Set focus on the newly added empty answer.
									value={answer || ''}
									onChange={(value) => updateAnswer( value, index )}
								/>
							</FlexBlock>
							<FlexItem>
								<Button className='swpb-mcq-mark-as-correct-answer'>
									<Icon icon={ index === attributes.correctAnswer ? 'star-filled' : 'star-empty' } onClick={() => markAsCorrectAnswer(index)}/>
								</Button>
							</FlexItem>
							<FlexItem>
								<Button className='swpb-mcq-delete-answer'>
									<Icon icon="trash" onClick={() => deleteAnswer(index)}/>
								</Button>
							</FlexItem>
						</Flex>
					)
				})
			}
			<Button isPrimary className='swpb-mcq-add-answer' onClick={addAnswer}>
				Add another answer
			</Button>

		</div>
	)
}