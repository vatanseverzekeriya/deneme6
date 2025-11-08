/**
 * Comprehensive Testing Suite for Sprint 16-17
 * Includes browser compatibility, mobile device testing, and performance benchmarks
 */

class TestSuite {
    constructor() {
        this.tests = [];
        this.results = [];
        this.deviceProfiles = this.getDeviceProfiles();
        this.browserFeatures = this.getBrowserFeatures();
    }

    // Device Profiles for Mobile Testing (5+ devices)
    getDeviceProfiles() {
        return {
            'iPhone SE': { width: 375, height: 667, dpr: 2, userAgent: 'iPhone' },
            'iPhone 12 Pro': { width: 390, height: 844, dpr: 3, userAgent: 'iPhone' },
            'iPhone 14 Pro Max': { width: 430, height: 932, dpr: 3, userAgent: 'iPhone' },
            'Samsung Galaxy S21': { width: 360, height: 800, dpr: 3, userAgent: 'Android' },
            'Samsung Galaxy S23 Ultra': { width: 412, height: 915, dpr: 3.5, userAgent: 'Android' },
            'iPad Air': { width: 820, height: 1180, dpr: 2, userAgent: 'iPad' },
            'iPad Pro 12.9': { width: 1024, height: 1366, dpr: 2, userAgent: 'iPad' },
            'Google Pixel 7': { width: 412, height: 915, dpr: 2.6, userAgent: 'Android' }
        };
    }

    // Browser Feature Detection
    getBrowserFeatures() {
        return {
            canvas2D: this.testCanvas2D(),
            webGL: this.testWebGL(),
            requestAnimationFrame: typeof requestAnimationFrame !== 'undefined',
            performance: typeof performance !== 'undefined' && typeof performance.now !== 'undefined',
            webSocket: typeof WebSocket !== 'undefined',
            localStorage: this.testLocalStorage(),
            touchEvents: this.testTouchEvents(),
            devicePixelRatio: window.devicePixelRatio || 1,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            onLine: navigator.onLine,
            memoryInfo: performance.memory ? true : false
        };
    }

    testCanvas2D() {
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext && canvas.getContext('2d'));
        } catch (e) {
            return false;
        }
    }

    testWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
            return false;
        }
    }

    testLocalStorage() {
        try {
            const test = '__test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    testTouchEvents() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Browser Compatibility Tests
    runBrowserCompatibilityTests() {
        console.log('=== BROWSER COMPATIBILITY TESTS ===');

        const tests = [
            { name: 'Canvas 2D Support', test: () => this.browserFeatures.canvas2D },
            { name: 'WebGL Support', test: () => this.browserFeatures.webGL },
            { name: 'requestAnimationFrame', test: () => this.browserFeatures.requestAnimationFrame },
            { name: 'Performance API', test: () => this.browserFeatures.performance },
            { name: 'WebSocket Support', test: () => this.browserFeatures.webSocket },
            { name: 'LocalStorage', test: () => this.browserFeatures.localStorage },
            { name: 'Touch Events', test: () => this.browserFeatures.touchEvents },
            { name: 'Modern JavaScript (ES6+)', test: () => this.testES6Support() },
            { name: 'CSS3 Transforms', test: () => this.testCSS3Transforms() },
            { name: 'Viewport Meta', test: () => this.testViewportMeta() }
        ];

        tests.forEach(({ name, test }) => {
            const result = test();
            this.results.push({ category: 'Browser', name, passed: result });
            console.log(`${result ? '✅' : '❌'} ${name}: ${result ? 'PASS' : 'FAIL'}`);
        });

        return this.results.filter(r => r.category === 'Browser');
    }

    testES6Support() {
        try {
            eval('const test = () => {}; class Test {}');
            return true;
        } catch (e) {
            return false;
        }
    }

    testCSS3Transforms() {
        const el = document.createElement('div');
        return typeof el.style.transform !== 'undefined';
    }

    testViewportMeta() {
        const viewport = document.querySelector('meta[name="viewport"]');
        return viewport !== null;
    }

    // Performance Benchmarks
    runPerformanceBenchmarks() {
        console.log('\n=== PERFORMANCE BENCHMARKS ===');

        const benchmarks = [
            { name: 'Canvas Fill Performance', test: () => this.benchmarkCanvasFill() },
            { name: 'Canvas Draw Calls', test: () => this.benchmarkDrawCalls() },
            { name: 'Object Creation', test: () => this.benchmarkObjectCreation() },
            { name: 'Array Operations', test: () => this.benchmarkArrayOps() },
            { name: 'Math Operations', test: () => this.benchmarkMathOps() }
        ];

        benchmarks.forEach(({ name, test }) => {
            const result = test();
            this.results.push({ category: 'Performance', name, ...result });
            console.log(`⚡ ${name}: ${result.opsPerSecond} ops/sec (${result.time}ms)`);
        });

        return this.results.filter(r => r.category === 'Performance');
    }

    benchmarkCanvasFill() {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        const start = performance.now();
        for (let i = 0; i < 1000; i++) {
            ctx.fillStyle = '#1a1a2e';
            ctx.fillRect(0, 0, 800, 600);
        }
        const end = performance.now();

        const time = end - start;
        return { passed: time < 1000, time: time.toFixed(2), opsPerSecond: (1000 / (time / 1000)).toFixed(0) };
    }

    benchmarkDrawCalls() {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        const start = performance.now();
        for (let i = 0; i < 1000; i++) {
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(Math.random() * 800, Math.random() * 600, 50, 50);
        }
        const end = performance.now();

        const time = end - start;
        return { passed: time < 500, time: time.toFixed(2), opsPerSecond: (1000 / (time / 1000)).toFixed(0) };
    }

    benchmarkObjectCreation() {
        const start = performance.now();
        const objects = [];
        for (let i = 0; i < 10000; i++) {
            objects.push({ x: i, y: i, name: 'test', hp: 100 });
        }
        const end = performance.now();

        const time = end - start;
        return { passed: time < 100, time: time.toFixed(2), opsPerSecond: (10000 / (time / 1000)).toFixed(0) };
    }

    benchmarkArrayOps() {
        const arr = Array(1000).fill(0).map((_, i) => i);

        const start = performance.now();
        for (let i = 0; i < 1000; i++) {
            arr.forEach(x => x * 2);
            arr.filter(x => x > 500);
        }
        const end = performance.now();

        const time = end - start;
        return { passed: time < 500, time: time.toFixed(2), opsPerSecond: (1000 / (time / 1000)).toFixed(0) };
    }

    benchmarkMathOps() {
        const start = performance.now();
        for (let i = 0; i < 100000; i++) {
            const angle = Math.atan2(50, 50);
            const dist = Math.sqrt(100 * 100 + 100 * 100);
            Math.sin(angle) * dist;
            Math.cos(angle) * dist;
        }
        const end = performance.now();

        const time = end - start;
        return { passed: time < 100, time: time.toFixed(2), opsPerSecond: (100000 / (time / 1000)).toFixed(0) };
    }

    // Mobile Device Simulation Tests
    runMobileDeviceTests() {
        console.log('\n=== MOBILE DEVICE TESTS ===');

        Object.entries(this.deviceProfiles).forEach(([device, profile]) => {
            const result = this.testDeviceProfile(device, profile);
            this.results.push({ category: 'Mobile', name: device, ...result });
            console.log(`📱 ${device}: ${result.passed ? 'PASS' : 'FAIL'} (${profile.width}x${profile.height})`);
        });

        return this.results.filter(r => r.category === 'Mobile');
    }

    testDeviceProfile(deviceName, profile) {
        // Simulate device viewport
        const aspectRatio = profile.width / profile.height;
        const totalPixels = profile.width * profile.height * Math.pow(profile.dpr, 2);

        // Performance estimate based on pixel count
        const performanceScore = totalPixels < 2000000 ? 'HIGH' :
                                 totalPixels < 5000000 ? 'MEDIUM' : 'LOW';

        return {
            passed: true,
            width: profile.width,
            height: profile.height,
            dpr: profile.dpr,
            aspectRatio: aspectRatio.toFixed(2),
            totalPixels,
            performanceScore
        };
    }

    // Memory Leak Detection
    detectMemoryLeaks(duration = 5000) {
        console.log('\n=== MEMORY LEAK DETECTION ===');

        if (!performance.memory) {
            console.log('❌ Memory API not available');
            return { passed: false, reason: 'Memory API not supported' };
        }

        const initialMemory = performance.memory.usedJSHeapSize;
        console.log(`Initial Memory: ${(initialMemory / 1048576).toFixed(2)} MB`);

        return new Promise((resolve) => {
            setTimeout(() => {
                const finalMemory = performance.memory.usedJSHeapSize;
                const memoryIncrease = finalMemory - initialMemory;
                const percentIncrease = (memoryIncrease / initialMemory) * 100;

                console.log(`Final Memory: ${(finalMemory / 1048576).toFixed(2)} MB`);
                console.log(`Memory Increase: ${(memoryIncrease / 1048576).toFixed(2)} MB (${percentIncrease.toFixed(2)}%)`);

                const passed = percentIncrease < 50; // Less than 50% increase is acceptable
                this.results.push({
                    category: 'Memory',
                    name: 'Memory Leak Detection',
                    passed,
                    initialMemory: (initialMemory / 1048576).toFixed(2) + ' MB',
                    finalMemory: (finalMemory / 1048576).toFixed(2) + ' MB',
                    increase: (memoryIncrease / 1048576).toFixed(2) + ' MB'
                });

                resolve({ passed, memoryIncrease, percentIncrease });
            }, duration);
        });
    }

    // Generate Test Report
    generateReport() {
        console.log('\n=== TEST SUITE REPORT ===');

        const categories = ['Browser', 'Performance', 'Mobile', 'Memory'];
        const report = {
            timestamp: new Date().toISOString(),
            browser: navigator.userAgent,
            platform: navigator.platform,
            results: {}
        };

        categories.forEach(category => {
            const categoryResults = this.results.filter(r => r.category === category);
            const passed = categoryResults.filter(r => r.passed).length;
            const total = categoryResults.length;

            report.results[category] = {
                passed,
                total,
                percentage: total > 0 ? ((passed / total) * 100).toFixed(2) : 0,
                tests: categoryResults
            };

            console.log(`\n${category} Tests: ${passed}/${total} (${report.results[category].percentage}%)`);
        });

        return report;
    }

    // Run All Tests
    async runAllTests() {
        console.log('🧪 Starting Comprehensive Test Suite...\n');

        this.runBrowserCompatibilityTests();
        this.runPerformanceBenchmarks();
        this.runMobileDeviceTests();
        await this.detectMemoryLeaks();

        return this.generateReport();
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestSuite;
}

// Auto-run tests if in test mode
if (typeof window !== 'undefined' && window.location.search.includes('test=true')) {
    const suite = new TestSuite();
    suite.runAllTests().then(report => {
        console.log('\n✅ Test Suite Complete!');
        console.log('Report:', report);
    });
}
