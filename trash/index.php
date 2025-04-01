<?php
/**
 * The main template file
 *
 * @package Paradise_Roleplay
 */

get_header();
?>

    <!-- Header with Banner -->
    <header class="header">
        <div class="header-content">
            <h1>PARADISE ROLEPLAY PAKISTAN</h1>
            <p>Pakistan Biggest Roleplay Server With Over 27000+ Discord Members</p>
        </div>
    </header>
    
    <!-- Navigation -->
    <nav class="nav">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-btn active"><i class="fas fa-home"></i> Home</a>
        <a href="<?php echo esc_url(home_url('/about')); ?>" class="nav-btn"><i class="fas fa-info-circle"></i> About</a>
        <a href="<?php echo esc_url(home_url('/rules')); ?>" class="nav-btn"><i class="fas fa-book"></i> Rules</a>
        <a href="<?php echo esc_url(home_url('/staff')); ?>" class="nav-btn"><i class="fas fa-users"></i> Staff</a>
        <a href="<?php echo esc_url(home_url('/gangs')); ?>" class="nav-btn"><i class="fas fa-mask"></i> Gangs</a>
        <a href="<?php echo esc_url(home_url('/faction')); ?>" class="nav-btn"><i class="fas fa-shield-alt"></i> Faction</a>
        <a href="<?php echo esc_url(home_url('/wall-of-fame')); ?>" class="nav-btn"><i class="fas fa-trophy"></i> Wall of Fame</a>
        <a href="<?php echo esc_url(home_url('/events')); ?>" class="nav-btn"><i class="fas fa-clock"></i> Events</a>
    </nav>
    
    <!-- Main Content -->
    <main class="main-content">
        <h2>Welcome to Paradise Roleplay</h2>
        <p>Immerse yourself in Pakistan's most advanced GTA RP server featuring custom scripts, realistic economy, and authentic roleplay scenarios for all player types.</p>
        
        <div class="btn-container">
            <a href="<?php echo esc_url(home_url('/join')); ?>" class="btn"><i class="fas fa-gamepad"></i> Join Now</a>
            <a href="https://discord.gg/prpk" class="btn btn-discord"><i class="fab fa-discord"></i> Join Discord</a>
        </div>
    </main>
    
    <!-- Footer -->
    <footer class="footer">
        <p>&copy; <?php echo date('Y'); ?> Paradise Roleplay Pakistan. All rights reserved.</p>
        <div class="social-links">
            <a href="https://discord.gg/prpk" target="_blank"><i class="fab fa-discord"></i></a>
            <a href="https://www.youtube.com/@paradiseroleplaypk" target="_blank"><i class="fab fa-youtube"></i></a>
            <a href="https://www.instagram.com/theparadisehug/" target="_blank"><i class="fab fa-instagram"></i></a>
        </div>
    </footer>

<?php
get_footer();
