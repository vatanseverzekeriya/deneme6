/**
 * Performance Monitor for Game Optimization
 * Tracks FPS, frame time, memory usage, and other metrics
 */

class PerformanceMonitor {
    constructor(options = {}) {
        this.enabled = options.enabled !== false;
        this.displayUI = options.displayUI !== false;
        this.targetFPS = options.targetFPS || 60;
        this.maxFPS = options.maxFPS || 60;

        // Performance metrics
        this.fps = 0;
        this.frameTime = 0;
        this.frames = 0;
        this.lastTime = performance.now();
        this.lastFPSUpdate = this.lastTime;
        this.frameHistory = [];
        this.maxFrameHistory = 60;

        // Memory tracking
        this.memoryUsage = 0;
        this.peakMemory = 0;

        // Entity tracking
        this.entityCount = 0;
        this.drawCalls = 0;

        // Performance budget
        this.budgetWarning = 16.67; // 60 FPS = 16.67ms per frame
        this.budgetCritical = 33.33; // 30 FPS = 33.33ms per frame

        // UI elements
        this.uiElement = null;

        if (this.displayUI) {
            this.createUI();
        }
    }

    createUI() {
        // Create performance overlay
        this.uiElement = document.createElement('div');
        this.uiElement.id = 'performanceMonitor';
        this.uiElement.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #0f0;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 10px;
            border-radius: 5px;
            z-index: 10000;
            min-width: 200px;
            user-select: none;
            pointer-events: none;
        `;

        document.body.appendChild(this.uiElement);
    }

    startFrame() {
        if (!this.enabled) return;

        this.frameStartTime = performance.now();
        this.drawCalls = 0;
    }

    endFrame() {
        if (!this.enabled) return;

        const now = performance.now();
        this.frameTime = now - this.frameStartTime;
        this.frames++;

        // Update frame history
        this.frameHistory.push(this.frameTime);
        if (this.frameHistory.length > this.maxFrameHistory) {
            this.frameHistory.shift();
        }

        // Update FPS every second
        if (now - this.lastFPSUpdate >= 1000) {
            this.fps = Math.round(this.frames * 1000 / (now - this.lastFPSUpdate));
            this.frames = 0;
            this.lastFPSUpdate = now;

            // Update memory if available
            if (performance.memory) {
                this.memoryUsage = performance.memory.usedJSHeapSize / 1048576; // Convert to MB
                this.peakMemory = Math.max(this.peakMemory, this.memoryUsage);
            }

            if (this.displayUI) {
                this.updateUI();
            }
        }
    }

    trackDrawCall() {
        if (!this.enabled) return;
        this.drawCalls++;
    }

    setEntityCount(count) {
        if (!this.enabled) return;
        this.entityCount = count;
    }

    getAverageFrameTime() {
        if (this.frameHistory.length === 0) return 0;
        const sum = this.frameHistory.reduce((a, b) => a + b, 0);
        return sum / this.frameHistory.length;
    }

    getMinFPS() {
        if (this.frameHistory.length === 0) return 0;
        const maxFrameTime = Math.max(...this.frameHistory);
        return Math.round(1000 / maxFrameTime);
    }

    getPerformanceStatus() {
        const avgFrameTime = this.getAverageFrameTime();

        if (avgFrameTime < this.budgetWarning) {
            return { status: 'GOOD', color: '#0f0' };
        } else if (avgFrameTime < this.budgetCritical) {
            return { status: 'WARNING', color: '#ff0' };
        } else {
            return { status: 'CRITICAL', color: '#f00' };
        }
    }

    updateUI() {
        if (!this.uiElement) return;

        const avgFrameTime = this.getAverageFrameTime();
        const minFPS = this.getMinFPS();
        const perfStatus = this.getPerformanceStatus();

        let html = `
            <div style="border-bottom: 1px solid #0f0; margin-bottom: 5px; padding-bottom: 5px;">
                <strong>PERFORMANCE MONITOR</strong>
            </div>
            <div style="color: ${perfStatus.color}">
                Status: ${perfStatus.status}
            </div>
            <div>FPS: ${this.fps} / ${this.targetFPS}</div>
            <div>Min FPS: ${minFPS}</div>
            <div>Frame Time: ${this.frameTime.toFixed(2)}ms</div>
            <div>Avg Frame: ${avgFrameTime.toFixed(2)}ms</div>
            <div style="margin-top: 5px; border-top: 1px solid #0f0; padding-top: 5px;">
                Entities: ${this.entityCount}
            </div>
            <div>Draw Calls: ${this.drawCalls}</div>
        `;

        if (performance.memory) {
            html += `
                <div style="margin-top: 5px; border-top: 1px solid #0f0; padding-top: 5px;">
                    Memory: ${this.memoryUsage.toFixed(1)} MB
                </div>
                <div>Peak: ${this.peakMemory.toFixed(1)} MB</div>
            `;
        }

        // Performance graph (mini)
        html += `
            <div style="margin-top: 5px; border-top: 1px solid #0f0; padding-top: 5px;">
                Frame Graph:
            </div>
            <div style="height: 30px; position: relative;">
                ${this.renderGraph()}
            </div>
        `;

        this.uiElement.innerHTML = html;
    }

    renderGraph() {
        if (this.frameHistory.length === 0) return '';

        const max = this.budgetCritical;
        const width = 200;
        const height = 30;
        const barWidth = width / this.maxFrameHistory;

        let bars = '';
        this.frameHistory.forEach((time, i) => {
            const barHeight = Math.min((time / max) * height, height);
            const x = i * barWidth;
            const y = height - barHeight;

            let color = '#0f0';
            if (time > this.budgetCritical) color = '#f00';
            else if (time > this.budgetWarning) color = '#ff0';

            bars += `<div style="position: absolute; left: ${x}px; top: ${y}px; width: ${barWidth-1}px; height: ${barHeight}px; background: ${color};"></div>`;
        });

        return bars;
    }

    toggleDisplay() {
        if (!this.uiElement) return;
        this.uiElement.style.display = this.uiElement.style.display === 'none' ? 'block' : 'none';
    }

    getMetrics() {
        return {
            fps: this.fps,
            frameTime: this.frameTime,
            avgFrameTime: this.getAverageFrameTime(),
            minFPS: this.getMinFPS(),
            memoryUsage: this.memoryUsage,
            peakMemory: this.peakMemory,
            entityCount: this.entityCount,
            drawCalls: this.drawCalls,
            status: this.getPerformanceStatus()
        };
    }

    reset() {
        this.frames = 0;
        this.frameHistory = [];
        this.peakMemory = 0;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}
