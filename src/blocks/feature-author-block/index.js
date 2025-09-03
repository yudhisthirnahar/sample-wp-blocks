import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { SelectControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import './common.scss';
import './index.scss';

registerBlockType( 'sample-wp-blocks/feature-author-block', {
	title: 'Feature Author Block',
	icon: 'admin-users',
	category: 'widgets',
	attributes: {
		authorId: {
			type: 'number',
			default: 0,
		}
	},
	edit: EditComponent,
	save: function() {
		return null
	},
});

function EditComponent(props) {

	const [authorPreviewHtml, setAuthorPreviewHtml] = useState('');

	useEffect(() => {
		async function fetchAuthorHtml() {
			const response = await wp.apiFetch({ 
				path: `/sample-wp-blocks/v1/feature-author-html?author_id=${props.attributes.authorId}`, 
				method: 'GET' 
			});
			setAuthorPreviewHtml(response);
		}

		fetchAuthorHtml();
	}, [props.attributes.authorId]);

	const allAuthors = useSelect( ( select ) => {
		return select( 'core' ).getUsers({ who: 'authors', per_page: -1 });
	});

	if ( null === allAuthors ) {
		return <div>Loading...</div>;
	}

	return (
		<div className="swpb-feature-author-block">
			<div className="swpb-feature-author-block-inner">
				<div className="swpb-feature-author-block-inner-select">

					{
					// traditional select control.
					/* <select 
						value={props.attributes.authorId || ''} 
						onChange={(e) => props.setAttributes({ authorId: parseInt(e.target.value) })}
					>
						{
							allAuthors.map( author => {
								return <option key={ author.id } value={ author.id }>{ author.name.toUpperCase() }</option>;
							})
						}
					</select> */}

					<SelectControl
						label="Author"
						value={props.attributes.authorId || ''}
						onChange={(value) => props.setAttributes({ authorId: parseInt(value) })}
						options={allAuthors.map(author => ({ label: author.name.toUpperCase(), value: author.id }))}
					/>

				</div>
				<div className="swpb-feature-author-block-preview-content" dangerouslySetInnerHTML={{ __html: authorPreviewHtml }} />
			</div>
		</div>
	);
}