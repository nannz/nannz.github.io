<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Blask
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'blask' ); ?></a>

		<header id="masthead" class="site-header" role="banner">
			<?php
			if ( function_exists( 'jetpack_the_site_logo' ) && jetpack_has_site_logo() ) {
				jetpack_the_site_logo();
			} // endif function_exists( 'jetpack_the_site_logo' )
			?>

			<div class="site-branding">
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			</div><!-- .site-branding -->
			<p class="site-description"><?php bloginfo( 'description' ); ?></p>

			<nav id="site-navigation" class="main-navigation" role="navigation">
				<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Menu', 'blask' ); ?></button>
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
			</nav><!-- #site-navigation -->

			<?php
			if ( has_nav_menu( 'social' ) ) :
				wp_nav_menu( array(
								'theme_location'  => 'social',
								'container_class' => 'social-links',
								'depth' 		  => 1,
								'link_before' 	  => '<span class="screen-reader-text">',
								'link_after' 	  => '</span>',
							) );
			endif;
			?>
		</header><!-- #masthead -->

	<div id="content" class="site-content">
