<?php
/**
 * The header for our theme
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <?php wp_head(); ?>
    <style>
        :root {
            --gold: #FFD700;
            --dark-gold: #D4AF37;
            --black: #121212;
            --glass: rgba(18, 18, 18, 0.85);
            --glass-light: rgba(255, 255, 255, 0.1);
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            background: var(--black) url('<?php echo get_template_directory_uri(); ?>/img/bg-pattern.png');
            color: white;
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        /* Header with Banner */
        .header {
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), 
                        url('<?php echo get_template_directory_uri(); ?>/img/banner.jpg') center/cover;
            text-align: center;
            padding: 80px 20px;
            border-bottom: 4px solid var(--gold);
            height: auto;
            min-height: 350px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0) 100%);
            z-index: 0;
        }
        
        .header-content {
            position: relative;
            z-index: 1;
            max-width: 800px;
        }
        
        .header h1 {
            font-size: clamp(2rem, 8vw, 3.5rem);
            color: var(--gold);
            text-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
            margin-bottom: 15px;
            font-weight: 700;
            letter-spacing: 1px;
        }
        
        .header p {
            font-size: clamp(1rem, 3vw, 1.3rem);
            color: white;
            text-shadow: 0 0 10px rgba(0,0,0,0.5);
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* Navigation */
        .nav {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background: var(--glass);
            backdrop-filter: blur(12px);
            padding: 12px 5px;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 5px 25px rgba(0,0,0,0.5);
            border-bottom: 1px solid rgba(255,215,0,0.2);
        }
        
        .nav-btn {
            color: white;
            text-decoration: none;
            margin: 5px 8px;
            font-weight: 600;
            padding: 10px 18px;
            border-radius: 8px;
            transition: all 0.3s ease;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 0.8px;
            white-space: nowrap;
            background: var(--glass-light);
            border: 1px solid rgba(255,215,0,0.1);
        }
        
        .nav-btn:hover {
            background: linear-gradient(135deg, rgba(255,215,0,0.3), rgba(212,175,55,0.3));
            color: var(--gold);
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
            border-color: rgba(255,215,0,0.3);
        }
        
        .nav-btn.current-menu-item {
            background: linear-gradient(135deg, var(--gold), var(--dark-gold));
            color: var(--black);
            box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
        }
        
        .nav-btn i {
            margin-right: 8px;
            font-size: 0.9em;
        }
    </style>
</head>
<body <?php body_class(); ?>>
    <!-- Header with Banner -->
    <header class="header">
        <div class="header-content">
            <h1><?php bloginfo('name'); ?></h1>
            <p><?php bloginfo('description'); ?></p>
        </div>
    </header>
    
    <!-- Navigation -->
    <nav class="nav">
        <?php
        wp_nav_menu(array(
            'theme_location' => 'primary-menu',
            'container' => false,
            'items_wrap' => '%3$s',
            'walker' => new Paradise_Roleplay_Walker_Nav_Menu()
        ));
        ?>
    </nav>
