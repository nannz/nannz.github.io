<?php
/**
 * Blask functions and definitions
 *
 * @package Blask
 */

if ( ! function_exists( 'blask_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function blask_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Blask, use a find and replace
	 * to change 'blask' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'blask', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	add_editor_style( array( 'editor-style.css', blask_fonts_url() ) );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );
	add_image_size( 'blask-post-thumbnail', 880, 9999, false ); // Large Post Image

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'blask' ),
		'social'  => esc_html__( 'Social Menu', 'blask' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'blask_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif; // blask_setup
add_action( 'after_setup_theme', 'blask_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function blask_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'blask_content_width', 880 );
}
add_action( 'after_setup_theme', 'blask_content_width', 0 );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function blask_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Footer Sidebar 1', 'blask' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Footer Sidebar 2', 'blask' ),
		'id'            => 'sidebar-2',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
}
add_action( 'widgets_init', 'blask_widgets_init' );

/**
 * Register Google Fonts
 */
function blask_fonts_url() {
	$fonts_url = '';
	$fonts     = array();
	$subsets   = 'latin,latin-ext';

	/*
	 * Translators: If there are characters in your language that are not supported
	 * by Arimo, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' != _x( 'on', 'Arimo font: on or off', 'blask' ) ) {
		$fonts[] = 'Arimo:400,700,400italic,700italic';
	}

	/*
	 * Translators: If there are characters in your language that are not supported
	 * by Roboto Condensed, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' != _x( 'on', 'Roboto Condensed font: on or off', 'blask' ) ) {
		$fonts[] = 'Roboto Condensed:400,700,400italic,700italic';
	}

	/*
	 * Translators: To add an additional character subset specific to your language,
	 * translate this to 'greek', 'cyrillic', 'devanagari' or 'vietnamese'. Do not translate into your own language.
	 */
	$subset = _x( 'no-subset', 'Add new subset (greek, cyrillic, devanagari, vietnamese)', 'blask' );

	if ( 'cyrillic' == $subset ) {
		$subsets .= ',cyrillic,cyrillic-ext';
	} elseif ( 'greek' == $subset ) {
		$subsets .= ',greek,greek-ext';
	} elseif ( 'devanagari' == $subset ) {
		$subsets .= ',devanagari';
	} elseif ( 'vietnamese' == $subset ) {
		$subsets .= ',vietnamese';
	}

	if ( $fonts ) {
		$fonts_url = add_query_arg( array(
			'family' => urlencode( implode( '|', $fonts ) ),
			'subset' => urlencode( $subsets ),
		), 'https://fonts.googleapis.com/css' );
	}

	return $fonts_url;
}

/**
 * Enqueue scripts and styles.
 */
function blask_scripts() {
	wp_enqueue_style( 'blask-style', get_stylesheet_uri() );

	wp_enqueue_style( 'blask-fonts', blask_fonts_url(), array(), null );

	wp_enqueue_style( 'genericons', get_template_directory_uri() . '/fonts/genericons/genericons.css', array(), '3.3.1' );

	wp_enqueue_script( 'blask-script', get_template_directory_uri() . '/js/blask.js', array( 'jquery' ), '20150625', true );

	wp_enqueue_script( 'blask-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

	wp_enqueue_script( 'blask-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	wp_localize_script( 'blask-script', 'screenReaderText', array(
		'expand'   => '<span class="screen-reader-text">' . __( 'Expand child menu', 'blask' ) . '</span>',
		'collapse' => '<span class="screen-reader-text">' . __( 'Collapse child menu', 'blask' ) . '</span>',
	) );
}
add_action( 'wp_enqueue_scripts', 'blask_scripts' );

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';



/**
 * Load plugin enhancement file to display admin notices.
 */
require get_template_directory() . '/inc/plugin-enhancements.php';