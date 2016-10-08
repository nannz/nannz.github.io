<?php
/**
 * The template used for displaying Portfolio Archive view
 *
 * @package Blask
 */
?>

<?php blask_portfolio_thumbnail( '<div class="featured-image">', '</div>' ); ?>

<header class="page-header">
	<?php blask_portfolio_title( '<h1 class="page-title">', '</h1>' ); ?>

	<?php blask_portfolio_content( '<div class="taxonomy-description">', '</div>' ); ?>
</header><!-- .page-header -->

<div class="portfolio-wrapper">
	<?php /* Start the Loop */ ?>
	<?php while ( have_posts() ) : the_post(); ?>

		<?php get_template_part( 'template-parts/content', 'portfolio' ); ?>

	<?php endwhile; ?>
</div><!-- .portfolio-wrapper -->

<?php
	the_posts_navigation( array(
		'prev_text'          => esc_html__( 'Previous', 'blask' ),
		'next_text'          => esc_html__( 'Next', 'blask' ),
		'screen_reader_text' => esc_html__( 'Portfolio navigation', 'blask' ),
	) );
?>