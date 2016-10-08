<?php
/**
 * The template for displaying the Project Tag taxonomy archive page.
 *
 * @package Blask
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php
			if ( have_posts() ) {
				get_template_part( 'template-parts/content', 'portfolio-archive' );
			} else {
				get_template_part( 'template-parts/content', 'none' );
			}
		?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
