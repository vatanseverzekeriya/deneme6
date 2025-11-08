/**
 * Load Testing Infrastructure for 100+ Concurrent Players
 * Tests server capacity, WebSocket connections, and performance under load
 */

class LoadTester {
    constructor(options = {}) {
        this.serverUrl = options.serverUrl || `ws://${window.location.host}`;
        this.maxClients = options.maxClients || 100;
        this.spawnRate = options.spawnRate || 10; // clients per second
        this.testDuration = options.testDuration || 60000; // 1 minute

        this.clients = [];
        this.metrics = {
            totalConnections: 0,
            activeConnections: 0,
            failedConnections: 0,
            messagesReceived: 0,
            messagesSent: 0,
            avgLatency: 0,
            minLatency: Infinity,
            maxLatency: 0,
            errors: []
        };

        this.startTime = null;
        this.running = false;
    }

    // Simulate a single game client
    createClient(clientId) {
        return new Promise((resolve, reject) => {
            const client = {
                id: clientId,
                ws: null,
                connected: false,
                latencies: [],
                messagesSent: 0,
                messagesReceived: 0,
                errors: []
            };

            try {
                client.ws = new WebSocket(this.serverUrl);

                client.ws.onopen = () => {
                    client.connected = true;
                    this.metrics.activeConnections++;
                    this.metrics.totalConnections++;

                    // Simulate game activity
                    this.simulateGameActivity(client);

                    resolve(client);
                };

                client.ws.onmessage = (event) => {
                    client.messagesReceived++;
                    this.metrics.messagesReceived++;

                    // Calculate latency if message includes timestamp
                    if (event.data && typeof event.data === 'string') {
                        try {
                            const data = JSON.parse(event.data);
                            if (data.timestamp) {
                                const latency = Date.now() - data.timestamp;
                                client.latencies.push(latency);
                                this.updateLatencyMetrics(latency);
                            }
                        } catch (e) {
                            // Not JSON, ignore
                        }
                    }
                };

                client.ws.onerror = (error) => {
                    client.errors.push(error);
                    this.metrics.errors.push({ clientId, error: error.toString(), time: Date.now() });
                };

                client.ws.onclose = () => {
                    if (client.connected) {
                        this.metrics.activeConnections--;
                    } else {
                        this.metrics.failedConnections++;
                    }
                    client.connected = false;
                };

            } catch (error) {
                this.metrics.failedConnections++;
                reject(error);
            }
        });
    }

    // Simulate game activity (movement, actions, etc.)
    simulateGameActivity(client) {
        if (!client.connected) return;

        const actions = [
            { type: 'move', x: Math.random() * 800, y: Math.random() * 600 },
            { type: 'attack', target: Math.floor(Math.random() * 100) },
            { type: 'skill', skillId: Math.floor(Math.random() * 3) },
            { type: 'pickup', itemId: Math.floor(Math.random() * 50) }
        ];

        // Send random action every 100-500ms
        const sendAction = () => {
            if (!client.connected || !this.running) return;

            const action = actions[Math.floor(Math.random() * actions.length)];
            const message = JSON.stringify({
                ...action,
                timestamp: Date.now(),
                clientId: client.id
            });

            try {
                client.ws.send(message);
                client.messagesSent++;
                this.metrics.messagesSent++;
            } catch (e) {
                client.errors.push(e);
            }

            // Schedule next action
            const delay = 100 + Math.random() * 400;
            setTimeout(sendAction, delay);
        };

        // Start sending actions after a small delay
        setTimeout(sendAction, Math.random() * 1000);
    }

    updateLatencyMetrics(latency) {
        this.metrics.minLatency = Math.min(this.metrics.minLatency, latency);
        this.metrics.maxLatency = Math.max(this.metrics.maxLatency, latency);

        // Calculate running average
        const totalLatencies = this.clients.reduce((sum, client) =>
            sum + client.latencies.reduce((a, b) => a + b, 0), 0
        );
        const latencyCount = this.clients.reduce((sum, client) =>
            sum + client.latencies.length, 0
        );

        this.metrics.avgLatency = latencyCount > 0 ? totalLatencies / latencyCount : 0;
    }

    // Spawn clients gradually
    async spawnClients() {
        const spawnInterval = 1000 / this.spawnRate; // ms between spawns

        for (let i = 0; i < this.maxClients; i++) {
            if (!this.running) break;

            try {
                const client = await this.createClient(i);
                this.clients.push(client);
                console.log(`✅ Client ${i + 1}/${this.maxClients} connected`);
            } catch (error) {
                console.error(`❌ Client ${i + 1} failed to connect:`, error);
            }

            // Wait before spawning next client
            await this.sleep(spawnInterval);
        }

        console.log(`\n🎉 Spawned ${this.metrics.activeConnections}/${this.maxClients} clients`);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Monitor and log metrics
    startMonitoring() {
        const monitorInterval = setInterval(() => {
            if (!this.running) {
                clearInterval(monitorInterval);
                return;
            }

            this.logMetrics();
        }, 5000); // Log every 5 seconds
    }

    logMetrics() {
        const elapsed = Date.now() - this.startTime;
        const elapsedSec = (elapsed / 1000).toFixed(1);

        console.log('\n=== LOAD TEST METRICS ===');
        console.log(`Time Elapsed: ${elapsedSec}s`);
        console.log(`Active Connections: ${this.metrics.activeConnections}/${this.maxClients}`);
        console.log(`Failed Connections: ${this.metrics.failedConnections}`);
        console.log(`Messages Sent: ${this.metrics.messagesSent}`);
        console.log(`Messages Received: ${this.metrics.messagesReceived}`);
        console.log(`Avg Latency: ${this.metrics.avgLatency.toFixed(2)}ms`);
        console.log(`Min/Max Latency: ${this.metrics.minLatency}ms / ${this.metrics.maxLatency}ms`);
        console.log(`Errors: ${this.metrics.errors.length}`);

        // Performance indicators
        const successRate = (this.metrics.activeConnections / this.metrics.totalConnections * 100).toFixed(2);
        console.log(`\n📊 Success Rate: ${successRate}%`);

        if (this.metrics.avgLatency < 100) {
            console.log('🟢 Performance: EXCELLENT');
        } else if (this.metrics.avgLatency < 250) {
            console.log('🟡 Performance: GOOD');
        } else if (this.metrics.avgLatency < 500) {
            console.log('🟠 Performance: FAIR');
        } else {
            console.log('🔴 Performance: POOR');
        }
    }

    // Disconnect all clients
    disconnectAll() {
        console.log('\n🛑 Disconnecting all clients...');

        this.clients.forEach(client => {
            if (client.ws && client.connected) {
                try {
                    client.ws.close();
                } catch (e) {
                    console.error('Error closing client:', e);
                }
            }
        });

        this.running = false;
    }

    // Generate final report
    generateReport() {
        const duration = Date.now() - this.startTime;

        const report = {
            testDuration: duration,
            maxClients: this.maxClients,
            metrics: {
                ...this.metrics,
                avgLatency: this.metrics.avgLatency.toFixed(2) + 'ms',
                minLatency: this.metrics.minLatency + 'ms',
                maxLatency: this.metrics.maxLatency + 'ms',
                successRate: (this.metrics.activeConnections / this.metrics.totalConnections * 100).toFixed(2) + '%',
                messagesPerSecond: (this.metrics.messagesSent / (duration / 1000)).toFixed(2)
            },
            clientStats: this.clients.map(c => ({
                id: c.id,
                messagesSent: c.messagesSent,
                messagesReceived: c.messagesReceived,
                avgLatency: c.latencies.length > 0 ?
                    (c.latencies.reduce((a, b) => a + b, 0) / c.latencies.length).toFixed(2) + 'ms' : 'N/A',
                errors: c.errors.length
            })),
            timestamp: new Date().toISOString()
        };

        return report;
    }

    // Run the load test
    async run() {
        console.log('🚀 Starting Load Test...');
        console.log(`Target: ${this.maxClients} concurrent clients`);
        console.log(`Spawn Rate: ${this.spawnRate} clients/second`);
        console.log(`Duration: ${this.testDuration / 1000} seconds\n`);

        this.running = true;
        this.startTime = Date.now();

        // Start monitoring
        this.startMonitoring();

        // Spawn clients
        await this.spawnClients();

        // Wait for test duration
        console.log(`\n⏱️  Running test for ${this.testDuration / 1000} seconds...`);
        await this.sleep(this.testDuration);

        // Cleanup
        this.disconnectAll();

        // Generate and display report
        const report = this.generateReport();
        console.log('\n=== FINAL REPORT ===');
        console.log(JSON.stringify(report, null, 2));

        return report;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoadTester;
}

// CLI usage example
if (typeof window !== 'undefined' && window.location.search.includes('loadtest=true')) {
    const params = new URLSearchParams(window.location.search);
    const maxClients = parseInt(params.get('clients')) || 100;
    const duration = parseInt(params.get('duration')) || 60000;

    const tester = new LoadTester({
        maxClients,
        testDuration: duration
    });

    tester.run().then(report => {
        console.log('\n✅ Load Test Complete!');
        console.log('Download report as JSON:');
        console.log(JSON.stringify(report, null, 2));
    });
}
