import { registerBlockType } from '@wordpress/blocks';
import { SelectControl, Spinner, TextControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import './common.scss';
import './index.scss';


registerBlockType( 'sample-wp-blocks/feature-wc-product-block', {
	title: 'Feature WC Product Block',
	icon: 'products',
	category: 'widgets',
	attributes: {
		productId: {
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

	const [productPreviewHtml, setProductPreviewHtml] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [products, setProducts] = useState([]);

	const searchProducts = async (term) => {
		if (term.length < 3) return;
		setIsLoading(true);

		try {
			// Use WordPress nonce for secure API access
			const response = await wp.apiFetch({
				path: `/wc/v3/products?search=${encodeURIComponent(term)}&per_page=10&status=publish`,
				headers: {
					'X-WP-Nonce': wpApiSettings.nonce
				}
			});
			console.log('WooCommerce API response:', response);
			setProducts(response);
		} catch (error) {
			console.error('WooCommerce API failed:', error);
			// Fallback: try to get products using WordPress core data
			try {
				const products = wp.data.select('core').getEntityRecords('postType', 'product', {
					search: term,
					per_page: 10,
					status: 'publish'
				});
				if (products) {
					setProducts(products);
				} else {
					setProducts([]);
				}
			} catch (fallbackError) {
				console.error('Fallback also failed:', fallbackError);
				setProducts([]);
			}
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (searchTerm.length >= 3) {
				searchProducts(searchTerm);
			} else {
				setProducts([]);
			}
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [searchTerm]);

	useEffect(() => {
		async function fetchProductHtml() {
			const response = await wp.apiFetch({ 
				path: `/sample-wp-blocks/v1/feature-wc-product-html?product_id=${props.attributes.productId}`, 
				method: 'GET' 
			});
			setProductPreviewHtml(response);
		}

		fetchProductHtml();
	}, [props.attributes.productId]);

	// Using other method to fetch products. Commented out because we are using the API to fetch products with search term.
	// const products = useSelect( ( select ) => {
	// 	return select( 'core' ).getEntityRecords( 'postType', 'product', { per_page: -1, post_status: 'publish' } );
	// });

	// if ( null === products ) {
	// 	return <div>Loading...</div>;
	// }

	return (
		<div className="swpb-feature-wc-product-block">
			<div className="swpb-feature-wc-product-block-inner">
				<TextControl
					label={__('Search Products', 'sample-wp-blocks')}
					value={searchTerm}
					onChange={setSearchTerm}
					placeholder={__('Type to search products...', 'sample-wp-blocks')}
				/>
				{isLoading && <Spinner />}
				{products.length > 0 && (
					<SelectControl
						label="Select Product"
						value={props.attributes.productId || ''}
						onChange={(value) => {
							props.setAttributes({ productId: parseInt(value) });
						}}
						options={[
							{ label: __('Choose a product...', 'sample-wp-blocks'), value: '' },
							...products.map(product => ({
								label: product.name?.rendered || product.name || 'Unnamed Product',
								value: product.id
							}))
						]}
					/>
				)}
				{products.length === 0 && searchTerm.length >= 3 && !isLoading && (
					<p style={{ color: '#666', fontStyle: 'italic' }}>
						{__('No products found. Make sure you have products in your WooCommerce store.', 'sample-wp-blocks')}
					</p>
				)}
				<div className="swpb-feature-wc-product-block-preview-content" dangerouslySetInnerHTML={{ __html: productPreviewHtml }} />
			</div>
		</div>
	);
}