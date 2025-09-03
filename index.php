<?php
/**
 * Plugin Name: Sample WP Blocks
 * Plugin URI: https://example.com/sample-wp-blocks
 * Description: A comprehensive WordPress blocks plugin featuring MCQ, Feature Author, and WooCommerce Product blocks with React 18 support.
 * Version: 1.0.0
 * Author: Yudhisthir Nahar
 * Author URI: https://example.com
 * Text Domain: sample-wp-blocks
 * Domain Path: /languages
 * License: GPL-2.0+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package Sample_WP_Blocks
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define plugin constants.
define( 'SAMPLE_WP_BLOCKS_VERSION', '1.0.0' );
define( 'SAMPLE_WP_BLOCKS_PATH', __DIR__ );
define( 'SAMPLE_WP_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Main Sample WP Blocks class.
 *
 * This class handles the initialization and management of all custom blocks
 * including MCQ, Feature Author, and WooCommerce Product blocks.
 *
 * @since 1.0.0
 */
class Sample_WP_Blocks {

	/**
	 * The single instance of the class.
	 *
	 * @since 1.0.0
	 * @var Sample_WP_Blocks
	 */
	private static $instance;

	/**
	 * Constructor.
	 *
	 * Initializes the plugin by setting up hooks and actions.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {

		// Approach 1: Register block from JS.
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );

		// Approach 2: Register blocks from PHP.
		add_action( 'init', array( $this, 'enqueue_assets' ) );
		add_action( 'init', array( $this, 'register_blocks' ) );

		// Register REST API routes.
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
	}

	/**
	 * Enqueue block editor assets.
	 *
	 * Loads the necessary JavaScript and CSS files for the block editor.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function enqueue_block_editor_assets() {
		// Enqueue the main demo block script.
		wp_enqueue_script(
			'sample-wp-blocks-editor-script',
			SAMPLE_WP_BLOCKS_URL . 'build/demo-block/index.js',
			array( 'wp-blocks', 'wp-element' ),
			SAMPLE_WP_BLOCKS_VERSION,
			true
		);

		// // Enqueue individual block scripts if needed.
		// wp_enqueue_script(
		// 	'mcq-block-editor-script',
		// 	SAMPLE_WP_BLOCKS_URL . 'build/mcq-block/index.js',
		// 	array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-data', 'wp-i18n' ),
		// 	SAMPLE_WP_BLOCKS_VERSION,
		// 	true
		// );

		// wp_enqueue_script(
		// 	'feature-author-block-editor-script',
		// 	SAMPLE_WP_BLOCKS_URL . 'build/feature-author-block/index.js',
		// 	array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-data', 'wp-i18n' ),
		// 	SAMPLE_WP_BLOCKS_VERSION,
		// 	true
		// );
	}

	/**
	 * Register assets.
	 *
	 * Registers all JavaScript and CSS files for both editor and frontend.
	 * Uses conditional loading for WooCommerce-dependent assets.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function enqueue_assets() {
		// Enqueue the MCQ block script and style.
		wp_register_script(
			'swpb-mcq-block-editor-script',
			SAMPLE_WP_BLOCKS_URL . 'build/mcq-block/index.js',
			array( 'wp-blocks', 'wp-element', 'wp-editor' ),
			SAMPLE_WP_BLOCKS_VERSION,
			true
		);
		wp_register_style(
			'swpb-mcq-block-editor-style',
			SAMPLE_WP_BLOCKS_URL . 'build/mcq-block/index.css',
			array(),
			SAMPLE_WP_BLOCKS_VERSION
		);

		wp_register_script(
			'swpb-mcq-block-frontend-script',
			SAMPLE_WP_BLOCKS_URL . 'build/mcq-block/frontend.js',
			array( 'react-jsx-runtime', 'wp-element' ),
			SAMPLE_WP_BLOCKS_VERSION,
			true
		);

		wp_register_style(
			'swpb-mcq-block-frontend-style',
			SAMPLE_WP_BLOCKS_URL . 'build/mcq-block/frontend.css',
			array(),
			SAMPLE_WP_BLOCKS_VERSION
		);

		// Enqueue the Feature Author block script and style.
		wp_register_script(
			'swpb-feature-author-block-editor-script',
			SAMPLE_WP_BLOCKS_URL . 'build/feature-author-block/index.js',
			array( 'wp-blocks', 'wp-element' ),
			SAMPLE_WP_BLOCKS_VERSION,
			true
		);
		wp_register_style(
			'swpb-feature-author-block-common-style',
			SAMPLE_WP_BLOCKS_URL . 'build/feature-author-block/index.css',
			array(),
			SAMPLE_WP_BLOCKS_VERSION
		);

		wp_register_script(
			'swpb-feature-wc-product-block-editor-script',
			SAMPLE_WP_BLOCKS_URL . 'build/feature-wc-product-block/index.js',
			array( 'wp-blocks', 'wp-element' ),
			SAMPLE_WP_BLOCKS_VERSION,
			true
		);
		
		// Load translations for editor script.
		wp_set_script_translations( 'swpb-feature-wc-product-block-editor-script', 'sample-wp-blocks' );

		if ( class_exists( 'Woocommerce' ) ) {
			wp_register_script(
				'swpb-feature-wc-product-block-frontend-script',
				SAMPLE_WP_BLOCKS_URL . 'build/feature-wc-product-block/frontend.js',
				array( 'react-jsx-runtime', 'wp-element' ),
				SAMPLE_WP_BLOCKS_VERSION,
				true
			);

			wp_register_style(
				'swpb-feature-wc-product-block-editor-style',
				SAMPLE_WP_BLOCKS_URL . 'build/feature-wc-product-block/index.css',
				array(),
				SAMPLE_WP_BLOCKS_VERSION
			);

			wp_register_style(
				'swpb-feature-wc-product-block-frontend-style',
				SAMPLE_WP_BLOCKS_URL . 'build/feature-wc-product-block/frontend.css',
				array(),
				SAMPLE_WP_BLOCKS_VERSION
			);
		}
	}
	/**
	 * Register all custom blocks.
	 *
	 * Registers MCQ, Feature Author, and WooCommerce Product blocks
	 * with their respective editor scripts, styles, and render callbacks.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_blocks() {
		// Register MCQ Block.
		register_block_type( 'sample-wp-blocks/mcq-block', array(
			'editor_script'   => 'swpb-mcq-block-editor-script',
			'editor_style'    => 'swpb-mcq-block-editor-style',
			// 'script'          => 'swpb-mcq-block-frontend-script', // Comment this out as this approach loads the script even the block is not available. so added another approach to load the script only when the block is available from mcq_render_block function.
			'render_callback' => array(
				$this,
				'mcq_render_block',
			),
		) );

		// Register Feature Author Block.
		register_block_type( 'sample-wp-blocks/feature-author-block', array(
			'editor_script'   => 'swpb-feature-author-block-editor-script',
			'editor_style'    => 'swpb-feature-author-block-common-style',
			'render_callback' => array( $this, 'feature_author_render_block' ),
		) );

		if ( class_exists( 'Woocommerce' ) ) {
			// Register Feature WC Product Block.
			register_block_type( 'sample-wp-blocks/feature-wc-product-block', array(
				'editor_script'   => 'swpb-feature-wc-product-block-editor-script',
				'editor_style'    => 'swpb-feature-wc-product-block-editor-style',
				'render_callback' => array( $this, 'feature_wc_product_render_block' ),
			) );
		}
	}

	/**
	 * Render MCQ block on the frontend.
	 *
	 * Enqueues necessary scripts and styles, then outputs the block container
	 * with data attributes for React to mount the component.
	 *
	 * @since 1.0.0
	 * @param array $attributes Block attributes.
	 * @return string HTML output.
	 */
	public function mcq_render_block( $attributes ) {
		if ( ! is_admin() ) {
			wp_enqueue_script( 'swpb-mcq-block-frontend-script' );
			wp_enqueue_style( 'swpb-mcq-block-frontend-style' );
		}
		$attributes = wp_json_encode( $attributes );
		ob_start();
		?>
			<div class="swpb-mcq-block" data-attributes="<?php echo esc_attr( $attributes ); ?>"></div>
		<?php
		$output = ob_get_clean();
		return $output;
	}

	/**
	 * Render Feature Author block on the frontend.
	 *
	 * @since 1.0.0
	 * @param array $attributes Block attributes.
	 * @return string HTML output.
	 */
	public function feature_author_render_block( $attributes ) {
		if ( ! is_admin() ) {
			wp_enqueue_style( 'swpb-feature-author-block-common-style' );
		}
		return self::generate_feature_author_block_content( $attributes['authorId'] );
	}

	/**
	 * Render WooCommerce Product block on the frontend.
	 *
	 * @since 1.0.0
	 * @param array $attributes Block attributes.
	 * @return string HTML output.
	 */
	public function feature_wc_product_render_block( $attributes ) {
		if ( ! is_admin() ) {
			wp_enqueue_script( 'swpb-feature-wc-product-block-frontend-script' );
			wp_enqueue_style( 'swpb-feature-wc-product-block-frontend-style' );
		}
		return self::generate_feature_wc_product_block_content( $attributes['productId'] );
	}

	/**
	 * Get the singleton instance of the class.
	 *
	 * @since 1.0.0
	 * @return Sample_WP_Blocks The singleton instance.
	 */
	public static function get_instance() {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Generate Feature Author block content.
	 *
	 * Creates HTML content for displaying author information including
	 * avatar, name, description, and link to author posts.
	 *
	 * @since 1.0.0
	 * @param int $author_id The author user ID.
	 * @return string HTML content or empty string if author not found.
	 */
	public static function generate_feature_author_block_content( $author_id ) {
		$author = get_user_by( 'id', $author_id );
		if ( ! $author ) {
			return '';
		}
		$author_name = ucwords( $author->first_name . ' ' . $author->last_name );
		$author_url  = get_author_posts_url( $author_id );
		ob_start();
		?>
			<div class="swpb-feature-author-block-content">
				<div class="swpb-feature-author-block-content-author-avatar">
					<a href="<?php echo esc_url( $author_url ); ?>" target="_blank">
						<?php echo get_avatar( $author_id, 100 ); ?>
					</a>
				</div>
				<div class="swpb-feature-author-block-content-author">
					<div class="swpb-feature-author-block-content-author-name">
						<a href="<?php echo esc_url( $author_url ); ?>" target="_blank">
							<?php echo esc_html( $author_name ); ?>
						</a>
					</div>
					<div class="swpb-feature-author-block-content-author-description"><?php echo esc_html( $author->description ); ?></div>
					<div class="swpb-feature-author-block-content-author-link">
						<a href="<?php echo esc_url( $author_url ); ?>" target="_blank">
							<?php echo esc_html( 'View all posts by ' . $author_name ); ?>
						</a>
					</div>
				</div>
			</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Generate WooCommerce Product block content.
	 *
	 * Creates HTML content for displaying product information including
	 * image, title, description, and price.
	 *
	 * @since 1.0.0
	 * @param int $product_id The WooCommerce product ID.
	 * @return string HTML content or empty string if product not found.
	 */
	public static function generate_feature_wc_product_block_content( $product_id ) {
		$product = wc_get_product( $product_id );
		if ( ! $product || ! is_a( $product, 'WC_Product' ) ) {
			return '';
		}
		$product_permalink = get_permalink( $product_id );
		ob_start();
		?>
			<div class="swpb-feature-wc-product-block-content">
				<div class="swpb-feature-wc-product-block-content-product-image">
					<a href="<?php echo esc_url( $product_permalink ); ?>" target="_blank">
						<?php echo get_the_post_thumbnail( $product_id, 'thumbnail' ); ?>
					</a>
				</div>
				<div class="swpb-feature-wc-product-block-content-product-details">
					<div class="swpb-feature-wc-product-block-content-product-title">
						<a href="<?php echo esc_url( $product_permalink ); ?>" target="_blank">
							<?php echo esc_html( $product->get_title() ); ?>
						</a>
					</div>
					<div class="swpb-feature-wc-product-block-content-product-description"><?php echo wp_kses_post( $product->get_short_description() ); ?></div>
					<div class="swpb-feature-wc-product-block-content-product-price"><?php echo wp_kses_post( $product->get_price_html() ); ?></div>
				</div>
			</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Register REST API routes.
	 *
	 * Registers custom REST endpoints for dynamic content loading.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_rest_routes() {
		register_rest_route( 'sample-wp-blocks/v1', '/feature-author-html', array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => array( $this, 'get_feature_author_html' ),
			'permission_callback' => '__return_true',
			'args'                => array(
				'author_id' => array(
					'type' => 'integer',
					'required' => true,
				),
			),
		) );

		if ( class_exists( 'Woocommerce' ) ) {
			register_rest_route( 'sample-wp-blocks/v1', '/feature-wc-product-html', array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_feature_wc_product_html' ),
				'permission_callback' => '__return_true',
				'args'                => array(
					'product_id' => array(
						'type' => 'integer',
						'required' => true,
					),
				),
			) );
		}
	}

	/**
	 * Get Feature Author HTML via REST API.
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $request The REST request object.
	 * @return WP_REST_Response The REST response.
	 */
	public function get_feature_author_html( $request ) {
		$author_id = $request->get_param( 'author_id' );
		$content   = self::generate_feature_author_block_content( $author_id );
		$content   = apply_filters( 'sample_wp_blocks_feature_author_html', $content, $author_id );
		return new WP_REST_Response( $content, 200 );
	}

	/**
	 * Get WooCommerce Product HTML via REST API.
	 *
	 * @since 1.0.0
	 * @param WP_REST_Request $request The REST request object.
	 * @return WP_REST_Response The REST response.
	 */
	public function get_feature_wc_product_html( $request ) {
		$product_id = $request->get_param( 'product_id' );
		$content    = self::generate_feature_wc_product_block_content( $product_id );
		$content    = apply_filters( 'sample_wp_blocks_feature_wc_product_html', $content, $product_id );
		return new WP_REST_Response( $content, 200 );
	}
}

$sample_wp_block = Sample_WP_Blocks::get_instance();
