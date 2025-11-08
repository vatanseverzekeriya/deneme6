/**
 * A/B Testing System for Different Onboarding Flows
 * Tracks user engagement, conversion rates, and feature adoption
 */

class ABTestingSystem {
    constructor() {
        this.experiments = {};
        this.userVariant = null;
        this.events = [];
        this.sessionStart = Date.now();
    }

    // Define onboarding flow experiments
    defineExperiments() {
        this.experiments = {
            'onboarding_flow': {
                name: 'Character Selection Onboarding',
                variants: {
                    'control': {
                        name: 'Standard Flow',
                        description: 'Direct character selection screen',
                        weight: 50,
                        modifications: {
                            showTutorial: false,
                            showClassDescriptions: true,
                            animatedIntro: false
                        }
                    },
                    'tutorial_first': {
                        name: 'Tutorial First',
                        description: 'Interactive tutorial before character selection',
                        weight: 25,
                        modifications: {
                            showTutorial: true,
                            showClassDescriptions: true,
                            animatedIntro: false
                        }
                    },
                    'animated_intro': {
                        name: 'Animated Introduction',
                        description: 'Cinematic intro with class showcase',
                        weight: 25,
                        modifications: {
                            showTutorial: false,
                            showClassDescriptions: true,
                            animatedIntro: true
                        }
                    }
                },
                metrics: {
                    timeToFirstAction: [],
                    characterSelectionTime: [],
                    tutorialCompletion: [],
                    retentionDay1: [],
                    engagementScore: []
                }
            },

            'skill_ui_layout': {
                name: 'Skill Button Layout',
                variants: {
                    'control': {
                        name: 'Vertical Right',
                        description: 'Skills stacked vertically on right side',
                        weight: 50,
                        modifications: {
                            skillLayout: 'vertical-right'
                        }
                    },
                    'horizontal_bottom': {
                        name: 'Horizontal Bottom',
                        description: 'Skills in horizontal row at bottom',
                        weight: 50,
                        modifications: {
                            skillLayout: 'horizontal-bottom'
                        }
                    }
                },
                metrics: {
                    skillUsageRate: [],
                    avgSkillsPerMinute: [],
                    preferredSkillSlot: []
                }
            },

            'joystick_sensitivity': {
                name: 'Joystick Sensitivity',
                variants: {
                    'low': { name: 'Low Sensitivity', weight: 33, modifications: { sensitivity: 0.7 } },
                    'medium': { name: 'Medium Sensitivity', weight: 34, modifications: { sensitivity: 1.0 } },
                    'high': { name: 'High Sensitivity', weight: 33, modifications: { sensitivity: 1.3 } }
                },
                metrics: {
                    movementAccuracy: [],
                    playerDeaths: [],
                    avgSessionTime: []
                }
            }
        };
    }

    // Assign user to variant based on weights
    assignVariant(experimentKey) {
        const experiment = this.experiments[experimentKey];
        if (!experiment) return null;

        // Check if user already has a variant (stored in localStorage)
        const storedVariant = this.getStoredVariant(experimentKey);
        if (storedVariant && experiment.variants[storedVariant]) {
            return storedVariant;
        }

        // Assign new variant based on weights
        const variants = Object.entries(experiment.variants);
        const totalWeight = variants.reduce((sum, [_, v]) => sum + v.weight, 0);
        let random = Math.random() * totalWeight;

        for (const [key, variant] of variants) {
            random -= variant.weight;
            if (random <= 0) {
                this.storeVariant(experimentKey, key);
                return key;
            }
        }

        // Fallback to first variant
        const fallback = variants[0][0];
        this.storeVariant(experimentKey, fallback);
        return fallback;
    }

    // Store variant assignment in localStorage
    storeVariant(experimentKey, variantKey) {
        try {
            const storage = JSON.parse(localStorage.getItem('ab_tests') || '{}');
            storage[experimentKey] = {
                variant: variantKey,
                assignedAt: Date.now()
            };
            localStorage.setItem('ab_tests', JSON.stringify(storage));
        } catch (e) {
            console.error('Error storing A/B test variant:', e);
        }
    }

    // Get stored variant from localStorage
    getStoredVariant(experimentKey) {
        try {
            const storage = JSON.parse(localStorage.getItem('ab_tests') || '{}');
            return storage[experimentKey]?.variant;
        } catch (e) {
            return null;
        }
    }

    // Track event for metrics
    trackEvent(experimentKey, eventType, data = {}) {
        const event = {
            experiment: experimentKey,
            variant: this.getStoredVariant(experimentKey),
            eventType,
            data,
            timestamp: Date.now(),
            sessionDuration: Date.now() - this.sessionStart
        };

        this.events.push(event);

        // Update metrics
        if (this.experiments[experimentKey]) {
            const metricKey = this.getMetricKey(eventType);
            if (this.experiments[experimentKey].metrics[metricKey]) {
                this.experiments[experimentKey].metrics[metricKey].push(event);
            }
        }

        // Send to analytics (if integrated)
        this.sendToAnalytics(event);

        console.log('📊 A/B Event:', event);
    }

    getMetricKey(eventType) {
        const mapping = {
            'first_action': 'timeToFirstAction',
            'character_selected': 'characterSelectionTime',
            'tutorial_completed': 'tutorialCompletion',
            'skill_used': 'skillUsageRate',
            'player_death': 'playerDeaths',
            'session_end': 'avgSessionTime'
        };
        return mapping[eventType] || eventType;
    }

    // Apply experiment modifications
    applyExperiment(experimentKey) {
        const variant = this.assignVariant(experimentKey);
        const experiment = this.experiments[experimentKey];

        if (!experiment || !variant) return null;

        const modifications = experiment.variants[variant].modifications;

        console.log(`🧪 A/B Test Active: ${experiment.name}`);
        console.log(`   Variant: ${experiment.variants[variant].name}`);
        console.log(`   Modifications:`, modifications);

        return modifications;
    }

    // Calculate experiment results
    calculateResults(experimentKey) {
        const experiment = this.experiments[experimentKey];
        if (!experiment) return null;

        const results = {
            experimentName: experiment.name,
            variants: {},
            winner: null,
            confidence: 0
        };

        // Group events by variant
        const eventsByVariant = {};
        this.events
            .filter(e => e.experiment === experimentKey)
            .forEach(event => {
                if (!eventsByVariant[event.variant]) {
                    eventsByVariant[event.variant] = [];
                }
                eventsByVariant[event.variant].push(event);
            });

        // Calculate metrics for each variant
        Object.entries(experiment.variants).forEach(([variantKey, variant]) => {
            const variantEvents = eventsByVariant[variantKey] || [];

            results.variants[variantKey] = {
                name: variant.name,
                sampleSize: variantEvents.length,
                metrics: this.calculateVariantMetrics(variantEvents),
                engagementScore: this.calculateEngagementScore(variantEvents)
            };
        });

        // Determine winner (highest engagement score)
        let maxScore = 0;
        Object.entries(results.variants).forEach(([key, data]) => {
            if (data.engagementScore > maxScore) {
                maxScore = data.engagementScore;
                results.winner = key;
            }
        });

        // Calculate confidence (simplified)
        const winnerSample = results.variants[results.winner]?.sampleSize || 0;
        const totalSamples = Object.values(results.variants).reduce((sum, v) => sum + v.sampleSize, 0);
        results.confidence = totalSamples > 0 ? (winnerSample / totalSamples * 100).toFixed(2) : 0;

        return results;
    }

    calculateVariantMetrics(events) {
        const metrics = {
            avgTimeToFirstAction: 0,
            completionRate: 0,
            avgSessionDuration: 0,
            totalEvents: events.length
        };

        if (events.length === 0) return metrics;

        // Time to first action
        const firstActions = events.filter(e => e.eventType === 'first_action');
        if (firstActions.length > 0) {
            metrics.avgTimeToFirstAction = (
                firstActions.reduce((sum, e) => sum + e.sessionDuration, 0) / firstActions.length
            ).toFixed(0);
        }

        // Completion rate
        const completions = events.filter(e => e.eventType === 'tutorial_completed' || e.eventType === 'character_selected');
        metrics.completionRate = ((completions.length / events.length) * 100).toFixed(2);

        // Session duration
        const sessions = events.filter(e => e.eventType === 'session_end');
        if (sessions.length > 0) {
            metrics.avgSessionDuration = (
                sessions.reduce((sum, e) => sum + e.sessionDuration, 0) / sessions.length / 1000
            ).toFixed(0) + 's';
        }

        return metrics;
    }

    calculateEngagementScore(events) {
        // Simple engagement scoring algorithm
        let score = 0;

        events.forEach(event => {
            switch (event.eventType) {
                case 'first_action':
                    score += 5;
                    break;
                case 'character_selected':
                    score += 10;
                    break;
                case 'tutorial_completed':
                    score += 15;
                    break;
                case 'skill_used':
                    score += 2;
                    break;
                case 'session_end':
                    score += (event.sessionDuration / 1000) * 0.1; // 0.1 points per second
                    break;
            }
        });

        return score;
    }

    // Send event to analytics platform
    sendToAnalytics(event) {
        // Integration with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', event.eventType, {
                experiment_id: event.experiment,
                variant_id: event.variant,
                ...event.data
            });
        }

        // Integration with Mixpanel
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track(event.eventType, {
                experiment: event.experiment,
                variant: event.variant,
                ...event.data
            });
        }
    }

    // Generate A/B test report
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalEvents: this.events.length,
            experiments: {}
        };

        Object.keys(this.experiments).forEach(key => {
            report.experiments[key] = this.calculateResults(key);
        });

        console.log('\n=== A/B TESTING REPORT ===');
        console.log(JSON.stringify(report, null, 2));

        return report;
    }

    // Initialize experiments
    init() {
        this.defineExperiments();

        // Apply all active experiments
        Object.keys(this.experiments).forEach(key => {
            this.applyExperiment(key);
        });

        console.log('🧪 A/B Testing System Initialized');
        console.log(`   Active Experiments: ${Object.keys(this.experiments).length}`);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ABTestingSystem;
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
    window.ABTestingSystem = ABTestingSystem;
}
