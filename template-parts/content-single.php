<?php
/**
 * Template part for displaying single posts.
 *
 * @package Blask
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php if ( '' != get_the_post_thumbnail() ) { ?>
	<div class="featured-image">
		<?php the_post_thumbnail( 'blask-post-thumbnail' ); ?>
	</div>
	<?php } ?>

	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php the_content(); ?>
	</div><!-- .entry-content -->

	<div class="entry-meta">
		<?php blask_posted_on(); ?>
		<?php blask_entry_footer(); ?>
	</div><!-- .entry-meta -->

</article><!-- #post-## -->

