=== Sample WP Blocks ===
Contributors: yudhisthirnahar
Tags: blocks, gutenberg, custom-blocks, wordpress-blocks
Requires at least: 5.0
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Sample WP Blocks is a plugin that demonstrates how to create custom blocks for your WordPress site.

== Description ==

Sample WP Blocks provides several custom blocks to refer for custom block development on your WordPress site:

* **MCQ Block**: Create multiple choice questions with correct answers
* **Feature Author Block**: Display author information with avatars and descriptions
* **Demo Block**: Simple demonstration block with qualification and percentage
* **Feature WC Product Block**: Showcase WooCommerce products with search functionality

Perfect for developers learning WordPress block development or for sites needing custom functionality.

== Frequently Asked Questions ==

= What WordPress version is required? =

This plugin requires WordPress 5.0 or higher as it uses the Gutenberg block editor.

= Do I need WooCommerce for the Feature WC Product Block? =

Yes, the Feature WC Product Block requires WooCommerce to be installed and activated.

= Can I customize the block styles? =

Yes, all blocks include SCSS files that you can modify to match your theme.

= Are these blocks translatable? =

As an example, the Feature WC Product Block supports internationalization and can be translated using .po/.mo files.

== Screenshots ==

1. MCQ Block in the editor
2. Feature Author Block with author selection
3. Demo Block with qualification fields
4. Feature WC Product Block with product search

== Development ==

This plugin is designed for developers who want to learn WordPress block development. Here's how to set up the development environment and compile the blocks.

= Prerequisites =

* Node.js (version 14.20.0 or higher - tested with v14.20.0)
* npm (version 6.14.17 or higher - tested with v6.14.17)
* WordPress development environment
* Basic knowledge of React and JavaScript

**Note:** While @wordpress/scripts officially requires Node.js 18.12.0+, this plugin has been tested and works with Node.js 14.20.0+. For best compatibility and security updates, consider upgrading to Node.js 18+ when possible.

= Setup Development Environment =

1. **Clone or download the plugin** to your WordPress plugins directory:
   ```
   /wp-content/plugins/sample-wp-blocks/
   ```

2. **Install dependencies**:
   ```bash
   cd wp-content/plugins/sample-wp-blocks
   npm install
   ```

= Building the Blocks =

The plugin uses `@wordpress/scripts` for building the JavaScript and CSS files.

**Build all blocks:**
```bash
npm run build
```

**Build individual blocks:**
```bash
npm run build:mcq
npm run build:feature-author
npm run build:demo
```

**Start development mode (with file watching):**
```bash
npm run start
```

**Start individual blocks in development mode:**
```bash
npm run start:mcq
npm run start:feature-author
npm run start:demo
```

= Development Commands =

* `npm run build` - Build all blocks for production
* `npm run start` - Start development mode for all blocks
* `npm run clean` - Clean build directory
* `npm run rebuild` - Clean and rebuild everything

= File Structure =

```
sample-wp-blocks/
├── src/
│   └── blocks/
│       ├── mcq-block/
│       │   ├── index.js          # Editor component
│       │   ├── frontend.js       # Frontend component
│       │   ├── index.scss        # Editor styles
│       │   └── frontend.scss     # Frontend styles
│       ├── feature-author-block/
│       │   ├── index.js          # Editor component
│       │   ├── index.scss        # Editor styles
│       │   └── common.scss       # Common styles
│       ├── demo-block/
│       │   └── index.js          # Editor component
│       └── feature-wc-product-block/
│           ├── index.js          # Editor component
│           ├── frontend.js       # Frontend component
│           ├── index.scss        # Editor styles
│           ├── frontend.scss     # Frontend styles
│           └── common.scss       # Common styles
├── build/                        # Compiled files (auto-generated)
├── index.php                     # Main plugin file
├── package.json                  # Dependencies and scripts
└── readme.txt                    # This file
```

= Creating New Blocks =

1. **Create block directory** in `src/blocks/your-block-name/`
2. **Add entry files**:
   - `index.js` - Editor component
   - `frontend.js` - Frontend component (optional)
   - `index.scss` - Editor styles
   - `frontend.scss` - Frontend styles (optional)
   - `common.scss` - Common styles (optional)
3. **Update package.json** scripts to include your new block
4. **Register the block** in `index.php`
5. **Build the block**: `npm run build`

= Block Development Tips =

* **Use React 18**: The plugin supports React 18 with proper batching
* **Follow WPCS**: Maintain WordPress Coding Standards
* **Test thoroughly**: Test blocks in both editor and frontend
* **Use proper escaping**: Always escape output for security
* **Handle errors gracefully**: Provide fallbacks for missing data

= Troubleshooting =

**Build errors:**
- Ensure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be 14.20.0+)
- Check npm version: `npm --version` (should be 6.14.17+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- If you encounter issues, consider upgrading to Node.js 18+ for better compatibility

**Block not appearing:**
- Check if block is registered in `index.php`
- Verify build files exist in `build/` directory
- Check browser console for JavaScript errors

**React errors:**
- Ensure React and React-DOM are installed
- Check for version conflicts in package.json
- Verify React 18 compatibility

= Contributing =

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

= Resources =

* [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
* [@wordpress/scripts Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
* [React Documentation](https://reactjs.org/docs/)
* [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)

== Changelog ==

= 1.0.0 =
* Initial release
* MCQ Block with validation
* Feature Author Block with REST API
* Demo Block with basic functionality
* Feature WC Product Block with WooCommerce integration