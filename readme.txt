=== Blask ===

Contributors: automattic
Requires at least: 4.1
Tested up to: 4.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Blask Theme, Copyright 2016 Automattic
Black is distributed under the terms of the GNU GPL

== Description ==

Blask is a modern portfolio theme focused on showcasing your work in a simple, minimal way.

== Installation ==

1. In your admin panel, go to Appearance > Themes and click the Add New button.
2. Click Upload and Choose File, then select the theme's .zip file. Click Install Now.
3. Click Activate to use your new theme right away.

== Frequently Asked Questions ==

= How to setup the front page like the demo site? =

The demo site URL: http://blaskdemo.wordpress.com/?demo

When you first activate Blask, your homepage will display posts in a traditional blog format. If you'd like to use the Portfolio Page Template instead, follow these steps:

1. Create or edit a page, and then assign it the Portfolio Page Template from the Page Attributes module.
2. Go to Settings > Reading and set "Front page displays" to "A static page".
3. Select the page you just assigned the Portfolio Page template to as "Front page" and then choose another page as "Posts page" to serve your blog posts.

Now that you have set your home page, you can start customizing by navigating to Customize → Theme Options.

Full Front Page setup instructions can be found at https://theme.wordpress.com/themes/blask/

= How to set up Portfolio? =

Blask takes advantage of the Jetpack's Portfolio feature (http://jetpack.com/support/custom-content-types/), offering unique layouts and organization for your portfolio projects. To add a project, go to Portfolio → Add New in your WP Admin dashboard.

# Projects #

Make sure the images you include in your projects are at least 880px wide. Blask displays these images at full width on larger screens.

Be sure to add a featured image to your projects as well. Although it won’t be displayed in single project view, it’s used on the portfolio archives page

# Portfolio archives page #

All projects are displayed on the portfolio archive page in grid layout. This page can be added to a Custom Menu using the Links Panel.

The portfolio archive page can be found at http://mygroovysite.wordpress.com/portfolio/ — just replace http://mygroovysite.wordpress.com/ with the URL of your website.


== Quick Specs (all measurements in pixels) ==

1. The main column width is 640.
2. A widget in the Footer Widget Area is 300.
3. Featured Images for posts should be at least 880 wide.

== Credits ==

* Based on Underscores http://underscores.me/, (C) 2012-2016 Automattic, Inc., [GPLv2 or later](https://www.gnu.org/licenses/gpl-2.0.html)
* normalize.css http://necolas.github.io/normalize.css/, (C) 2012-2016 Nicolas Gallagher and Jonathan Neal, [MIT](http://opensource.org/licenses/MIT)
* Images on demo and screenshot: images by Pixabay (https://pixabay.com), licensed under [CC0](http://creativecommons.org/choose/zero/)

== Changelog ==

= 29 June 2016 =
* Update Headstart featured image URLs.

= 22 June 2016 =
* Fix Home menu position in annotation.

= 21 June 2016 =
* Correct the annotation's page template setting.

= 9 June 2016 =
* Update Portfolio Featured Image function so it has the same style as Portfolio Title and Portfolio Content functions
* Update Portfolio CPT with new theme option

= 7 June 2016 =
* Increase min WordPress version required
* Add support for Portfolio CPT new feature

= 12 May 2016 =
* Add new classic-menu tag.

= 5 May 2016 =
* Move annotations into the `inc` directory.

= 4 May 2016 =
* Move existing annotations into their respective theme directories.

= 12 April 2016 =
* Update screenshot and readme file.

= 4 February 2016 =
* Update screenshot

= 25 January 2016 =
* fix footer reference to WordPress.com themes.

= 22 December 2015 =
* Override for Jetpack Portfolio shortcode styling to prevent breaking the layout; Fixes #3607;

= 21 December 2015 =
* Declare explicit support for Jetpack portfolios;

= 29 October 2015 =
* fix SVN properties.

= 21 August 2015 =
* Adding .pot file;

= 4 August 2015 =
* Updating Theme URI in style.css; Adding images license info;

= 31 July 2015 =
* Update theme description and tags in style.css; Reset version number to 1.0.0 as this is not a live theme;
* Update readme.txt with relevant info;
* Add proper screenshot image;
* Remove .`screen-reader-text:hover` and `.screen-reader-text:active` style rules.

= 30 July 2015 =
* Migrate to Masonry V3.

= 28 July 2015 =
* Fixing escaping for 'Nothing Found' message;
* Renaming 'Brisk' to 'Blask';
