import { registerBlockType } from '@wordpress/blocks';
// Option 1: With multiple output versions within JS (requires editing the page and resaving the page).
const attr = {
	qualification: {
		type: 'string',
		default: 'Secondary'
	},
	percentage: {
		type: 'number',
	},
}
registerBlockType( 'sample-wp-blocks/demo-block', {
	title: 'Demo Block',
	icon: 'admin-comments',
	category: 'widgets',
	attributes: attr,
	edit: function( props ) {
		const { attributes, setAttributes } = props;

		// As a update callback function.
		function saveQualification( e ) {
			setAttributes({ qualification: e.target.value });
		}

		return (
			<div className="swpb-demo-block" style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
				<h2>Qualification</h2>
				<p>Please add your qualification and percentage in the fields below.</p>
				<hr />
				<div className="swpb-demo-block-inner" style={{ paddingLeft: '10rem', paddingRight: '10rem' }}>
					<div className="swpb-demo-block-inner-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<p>Qualification</p>
						<input id="qualification" name="qualification" type="text" value={attributes.qualification} placeholder="Qualification" onChange={saveQualification} />
					</div>
					<div className="swpb-demo-block-inner-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<p>Percentage(% rounded)</p>
						{/* As a update inline callback function. */}
						<input id="percentage" name="percentage" type="number" value={attributes.percentage} placeholder="90" onChange={(e) => setAttributes({ percentage: parseInt(e.target.value) })} />
					</div>
				</div>
			</div>
		)
	},
	save: function( props ) {
		const { attributes } = props;
		return (
			<div className="swpb-demo-block" style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px', textAlign: 'center', color: 'black' }}>
				<h2>Qualification</h2>
				<p><strong>Qualification:</strong> {attributes.qualification} and <strong>Percentage:</strong> {attributes.percentage}</p>
			</div>
		)
	},
	deprecated: [
		{
			attributes: attr,
			save: function( props ) {
				const { attributes } = props;
				return (
					<div className="swpb-demo-block" style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px', margin: '20px', textAlign: 'center', color: 'black' }}>
						<h3>Qualification</h3>
						<p><strong>Qualification:</strong> {attributes.qualification}, <strong>Percentage:</strong> {attributes.percentage}</p>
					</div>
				)
			}
		}
	],
});
