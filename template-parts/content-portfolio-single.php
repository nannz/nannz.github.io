<?php
/**
 * Template part for displaying single projects.
 *
 * @package Blask
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
	</div><!-- .entry-content -->

	<div class="entry-meta">
		<?php blask_portfolio_meta(); ?>
		<?php blask_entry_footer(); ?>
	</div><!-- .entry-meta -->

</article><!-- #post-## -->
