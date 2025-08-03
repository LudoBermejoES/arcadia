module.exports = {
  apps: [
    {
      name: 'arcadia-marker-manager',
      script: 'marker-manager.js',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3002,
        LOG_LEVEL: 'info'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002,
        LOG_LEVEL: 'warn'
      },
      // Logging configuration
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      
      // Process management
      kill_timeout: 3000,
      listen_timeout: 3000,
      
      // Advanced features
      exec_mode: 'fork',
      merge_logs: true,
      
      // Restart strategies
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Health monitoring
      health_check_http: 'http://localhost:3002',
      health_check_grace_period: 3000,
      
      // Environment-specific overrides
      instance_var: 'INSTANCE_ID',
      
      // Git integration - track deployment info
      post_update: ['npm install'],
      
      // Custom startup script metadata
      vizion: true,
      
      // CPU and memory limits (optional)
      node_args: '--max-old-space-size=1024',
      
      // Ignore certain files for watch (if watch is enabled)
      ignore_watch: [
        'node_modules',
        'logs',
        '*.log',
        '.git',
        'tiles'
      ],
      
      // Custom environment variables for the application
      env_vars: {
        'ARCADIA_APP_NAME': 'Marker Manager',
        'ARCADIA_VERSION': '1.0.0'
      }
    }
  ],
  
  // Deployment configuration (optional)
  deploy: {
    production: {
      user: 'node',
      host: 'localhost',
      ref: 'origin/main',
      repo: 'git@github.com:username/ArcadiaPage.git',
      path: '/var/www/arcadia',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};