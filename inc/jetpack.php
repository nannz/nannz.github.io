<?php
/**
 * Jetpack Compatibility File
 * See: https://jetpack.me/
 *
 * @package Blask
 */

/**
 * Jetpack setup.
 */
function blask_jetpack_setup() {
	// Add theme support for Infinite Scroll.
	add_theme_support( 'infinite-scroll', array(
		'container' 	 => 'main',
		'render'    	 => 'blask_infinite_scroll_render',
		'footer'    	 => 'main',
		'footer_widgets' => array( 'sidebar-1', 'sidebar-2' ),
	) );

	// Add support for Site Logo.
	add_image_size( 'blask-site-logo', '220', '9999', false );
	add_theme_support( 'site-logo', array(
		'size' => 'blask-site-logo'
	) );

	// Add support for Responsive Videos.
	add_theme_support( 'jetpack-responsive-videos' );

	// Add support for Portfolio Custom Post Type.
	add_theme_support( 'jetpack-portfolio', array(
		'title'          => true,
		'content'        => true,
		'featured-image' => true,
	) );

} // end function blask_jetpack_setup
add_action( 'after_setup_theme', 'blask_jetpack_setup' );

/**
 * Define the code that is used to render the posts added by Infinite Scroll.
 *
 * Includes the whole loop. Used to include the correct template part for the Portfolio CPT.
 */
function blask_infinite_scroll_render() {
	while ( have_posts() ) {
		the_post();

		if ( is_post_type_archive( 'jetpack-portfolio' ) || is_tax( 'jetpack-portfolio-type' ) || is_tax( 'jetpack-portfolio-tag' ) ) {
			get_template_part( 'template-parts/content', 'portfolio' );
		} else {
			get_template_part( 'template-parts/content', get_post_format() );
		}
	}
}

/**
 * Portfolio Title.
 */
function blask_portfolio_title( $before = '', $after = '' ) {
	$jetpack_portfolio_title = get_option( 'jetpack_portfolio_title' );
	$title = '';

	if ( is_post_type_archive( 'jetpack-portfolio' ) ) {
		if ( isset( $jetpack_portfolio_title ) && '' != $jetpack_portfolio_title ) {
			$title = esc_html( $jetpack_portfolio_title );
		} else {
			$title = post_type_archive_title( '', false );
		}
	} elseif ( is_tax( 'jetpack-portfolio-type' ) || is_tax( 'jetpack-portfolio-tag' ) ) {
		$title = single_term_title( '', false );
	}

	echo $before . $title . $after;
}

/**
 * Portfolio Content.
 */
function blask_portfolio_content( $before = '', $after = '' ) {
	$jetpack_portfolio_content = get_option( 'jetpack_portfolio_content' );

	if ( is_tax() && get_the_archive_description() ) {
		echo $before . get_the_archive_description() . $after;
	} else if ( isset( $jetpack_portfolio_content ) && '' != $jetpack_portfolio_content ) {
		$content = convert_chars( convert_smilies( wptexturize( stripslashes( wp_filter_post_kses( addslashes( $jetpack_portfolio_content ) ) ) ) ) );
		echo $before . $content . $after;
	}
}

/**
 * Portfolio Featured Image.
 */
function blask_portfolio_thumbnail( $before = '', $after = '' ) {
	$jetpack_portfolio_featured_image = get_option( 'jetpack_portfolio_featured_image' );

	if ( isset( $jetpack_portfolio_featured_image ) && '' != $jetpack_portfolio_featured_image ) {
		$featured_image = wp_get_attachment_image( (int) $jetpack_portfolio_featured_image, 'blask-post-thumbnail' );
		echo $before . $featured_image . $after;
	}
}

/**
 * Filter Infinite Scroll text handle.
 */
function blask_portfolio_infinite_scroll_navigation( $js_settings ) {
	if ( is_post_type_archive( 'jetpack-portfolio' ) || is_tax( 'jetpack-portfolio-type' ) || is_tax( 'jetpack-portfolio-tag' ) ) {
		$js_settings[ 'text' ] = esc_js( esc_html__( 'Older projects', 'blask' ) );
	}

	return $js_settings;
}
add_filter( 'infinite_scroll_js_settings', 'blask_portfolio_infinite_scroll_navigation' );

/**
 * Load Jetpack scripts.
 */
function blask_jetpack_scripts() {
	if ( is_post_type_archive( 'jetpack-portfolio' ) || is_tax( 'jetpack-portfolio-type' ) || is_tax( 'jetpack-portfolio-tag' ) || is_page_template( 'portfolio-page.php' ) ) {
		wp_enqueue_script( 'blask-portfolio', get_template_directory_uri() . '/js/portfolio.js', array( 'jquery', 'masonry' ), '20150624', true );
	}
	if ( is_page_template( 'page-templates/portfolio-page.php' ) ) {
		wp_enqueue_script( 'blask-portfolio-page', get_template_directory_uri() . '/js/portfolio-page.js', array( 'jquery' ), '20140402', true );
	}
}
add_action( 'wp_enqueue_scripts', 'blask_jetpack_scripts' );
