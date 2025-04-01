<?php
/**
 * Theme functions and definitions
 */

if (!defined('ABSPATH')) {
    exit;
}

// Theme setup
function paradise_roleplay_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    register_nav_menus(array(
        'primary-menu' => __('Primary Menu', 'paradise-roleplay'),
    ));
}
add_action('after_setup_theme', 'paradise_roleplay_setup');

// Enqueue scripts and styles
function paradise_roleplay_scripts() {
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
    wp_enqueue_style('paradise-roleplay-style', get_stylesheet_uri());
    
    wp_enqueue_script('paradise-roleplay-script', get_template_directory_uri() . '/js/main.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'paradise_roleplay_scripts');

// Custom nav walker
class Paradise_Roleplay_Walker_Nav_Menu extends Walker_Nav_Menu {
    public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args);
        
        $output .= '<a href="' . esc_url($item->url) . '" class="nav-btn ' . esc_attr($class_names) . '">';
        
        if ($item->icon) {
            $output .= '<i class="' . esc_attr($item->icon) . '"></i>';
        }
        
        $output .= esc_html($item->title) . '</a>';
    }
}

// Add menu icons
function paradise_roleplay_add_menu_icons($items, $args) {
    foreach ($items as &$item) {
        $icon = '';
        
        switch ($item->title) {
            case 'Home': $icon = 'fas fa-home'; break;
            case 'About': $icon = 'fas fa-info-circle'; break;
            case 'Rules': $icon = 'fas fa-book'; break;
            case 'Staff': $icon = 'fas fa-users'; break;
            case 'Gangs': $icon = 'fas fa-mask'; break;
            case 'Faction': $icon = 'fas fa-shield-alt'; break;
            case 'Wall of Fame': $icon = 'fas fa-trophy'; break;
            case 'Events': $icon = 'fas fa-clock'; break;
        }
        
        if ($icon) {
            $item->icon = $icon;
        }
    }
    return $items;
}
add_filter('wp_nav_menu_objects', 'paradise_roleplay_add_menu_icons', 10, 2);
