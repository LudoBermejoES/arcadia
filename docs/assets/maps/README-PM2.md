# Arcadia Marker Manager - PM2 Deployment Guide

## 📋 Overview

This guide covers deploying the Arcadia Map Marker Manager using PM2 (Process Manager 2) for production-ready process management with automatic restarts, logging, and monitoring.

## 🚀 Quick Start

### Start the Application with PM2
```bash
cd C:\code\ArcadiaPage\docs\assets\maps
npm run pm2:start
```

### Check Status
```bash
npm run pm2:status
```

### View Logs
```bash
npm run pm2:logs
```

## 📊 PM2 Commands Reference

### Process Management
```bash
# Start the application
npm run pm2:start

# Stop the application
npm run pm2:stop

# Restart the application (kills and starts)
npm run pm2:restart

# Reload the application (graceful restart, zero downtime)
npm run pm2:reload

# Delete the application from PM2
npm run pm2:delete
```

### Monitoring & Logs
```bash
# View real-time logs
npm run pm2:logs

# View PM2 monitoring dashboard
npm run pm2:monit

# Check application status
npm run pm2:status

# View detailed information
pm2 describe arcadia-marker-manager
```

## 📁 Log Files Structure

```
docs/assets/maps/logs/
├── app.log          # Application logs (info level and above)
├── error.log        # Error logs only
├── combined.log     # All logs combined
├── out.log          # PM2 stdout logs
└── error.log        # PM2 stderr logs
```

## ⚙️ Configuration Details

### Environment Variables
- **Development**: `NODE_ENV=development`, `LOG_LEVEL=info`
- **Production**: `NODE_ENV=production`, `LOG_LEVEL=warn`

### Process Configuration
- **Name**: `arcadia-marker-manager`
- **Instances**: 1 (single instance)
- **Memory Limit**: 1GB (auto-restart if exceeded)
- **Port**: 3000 (configurable via `PORT` env var)

### Auto-Restart Features
- ✅ Automatic restart on crashes
- ✅ Restart on memory limit exceeded
- ✅ Graceful shutdown handling
- ✅ Health checks on `http://localhost:3000`

## 🔧 Advanced Usage

### Production Deployment
```bash
# Start in production mode
pm2 start ecosystem.config.js --env production

# View production logs with lower verbosity
pm2 logs arcadia-marker-manager --lines 100
```

### Custom Log Levels
```bash
# Start with debug logging
LOG_LEVEL=debug pm2 start ecosystem.config.js

# Start with error-only logging
LOG_LEVEL=error pm2 start ecosystem.config.js
```

### Memory and CPU Monitoring
```bash
# Real-time monitoring dashboard
pm2 monit

# Memory usage
pm2 list

# Detailed resource usage
pm2 describe arcadia-marker-manager
```

## 🛠️ Troubleshooting

### Common Issues

**Application won't start:**
```bash
# Check PM2 logs
pm2 logs arcadia-marker-manager --err

# Check application logs
tail -f logs/error.log
```

**High memory usage:**
```bash
# Check memory stats
pm2 describe arcadia-marker-manager

# Restart to clear memory
npm run pm2:restart
```

**Git operations failing:**
```bash
# Check Git status in project root
cd C:\code\ArcadiaPage
git status

# Check application logs for Git errors
pm2 logs arcadia-marker-manager | grep -i git
```

### Log Rotation

PM2 automatically handles log rotation, but you can also manually rotate:
```bash
# Rotate logs
pm2 flush

# Or delete old logs
rm logs/*.log
npm run pm2:restart
```

## 🔄 Auto-Startup (Windows)

To start PM2 automatically on Windows boot:

```bash
# Install pm2-windows-startup
npm install -g pm2-windows-startup

# Setup auto-startup
pm2-startup install

# Save current PM2 configuration
pm2 save
```

## 📈 Performance Optimization

### Memory Management
- Application restarts automatically if memory exceeds 1GB
- Node.js max old space size set to 1GB
- Log file rotation prevents disk space issues

### CPU Efficiency
- Single instance (no clustering needed for this application)
- Optimized for I/O operations (file system and Git)
- Efficient Winston logging with minimal performance impact

## 🔐 Security Considerations

### Process Isolation
- Runs as single isolated process
- No elevated privileges required
- Safe file system operations within project directory

### Log Security
- Logs stored locally in `./logs/` directory
- No sensitive information logged (Git credentials, etc.)
- Structured logging for security auditing

## 📚 Integration with Development Workflow

### Git Integration
- Every marker change automatically commits to Git
- Proper commit messages with Claude Code attribution
- Automatic push to remote repository

### File Management
- GeoJSON files stored in map subdirectories
- Automatic file creation and management
- Winston logs track all file operations

## 🎯 Next Steps

1. **Start the service**: `npm run pm2:start`
2. **Check status**: `npm run pm2:status`
3. **Open browser**: Navigate to `http://localhost:3000`
4. **Monitor logs**: `npm run pm2:logs` in separate terminal
5. **Use the application**: Create, edit, and delete markers

The PM2 setup ensures your Arcadia Marker Manager runs reliably with proper logging, automatic restarts, and production-ready process management!