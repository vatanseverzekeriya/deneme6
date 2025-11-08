/**
 * Analytics Integration for Google Analytics & Mixpanel
 * Tracks user behavior, game events, and performance metrics
 */

class AnalyticsManager {
    constructor(config = {}) {
        this.config = {
            googleAnalyticsId: config.googleAnalyticsId || 'GA_MEASUREMENT_ID',
            mixpanelToken: config.mixpanelToken || 'MIXPANEL_TOKEN',
            debug: config.debug || false,
            ...config
        };

        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
        this.sessionStart = Date.now();
        this.eventsQueue = [];

        this.init();
    }

    // Initialize analytics platforms
    init() {
        this.initGoogleAnalytics();
        this.initMixpanel();

        // Track page view
        this.trackPageView();

        // Track session start
        this.trackEvent('session_start', {
            session_id: this.sessionId,
            user_id: this.userId
        });

        // Track session end on page unload
        window.addEventListener('beforeunload', () => {
            this.trackSessionEnd();
        });

        if (this.config.debug) {
            console.log('📊 Analytics initialized:', {
                sessionId: this.sessionId,
                userId: this.userId
            });
        }
    }

    // Initialize Google Analytics
    initGoogleAnalytics() {
        if (typeof gtag === 'undefined') {
            // Load gtag if not already loaded
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalyticsId}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
                dataLayer.push(arguments);
            };
            gtag('js', new Date());
            gtag('config', this.config.googleAnalyticsId, {
                'send_page_view': false,
                'user_id': this.userId,
                'session_id': this.sessionId
            });
        }
    }

    // Initialize Mixpanel
    initMixpanel() {
        if (typeof mixpanel === 'undefined' && this.config.mixpanelToken !== 'MIXPANEL_TOKEN') {
            // Load Mixpanel library
            (function(c,a){if(!a.__SV){var b=window;try{var d,m,j,k=b.location,f=k.hash;d=function(a,b){return(m=a.match(RegExp(b+"=([^&]*)")))?m[1]:null};f&&d(f,"state")&&(j=JSON.parse(decodeURIComponent(d(f,"state"))),"mpeditor"===j.action&&(b.sessionStorage.setItem("_mpcehash",f),history.replaceState(j.desiredHash||"",c.title,k.pathname+k.search)))}catch(n){}var l,h;window.mixpanel=a;a._i=[];a.init=function(b,d,g){function c(b,i){var a=i.split(".");2==a.length&&(b=b[a[0]],i=a[1]);b[i]=function(){b.push([i].concat(Array.prototype.slice.call(arguments,0)))}}var e=a;"undefined"!==typeof g?e=a[g]=[]:g="mixpanel";e.people=e.people||[];e.toString=function(b){var a="mixpanel";"mixpanel"!==g&&(a+="."+g);b||(a+=" (stub)");return a};e.people.toString=function(){return e.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)c(e,l[h]);var f="set set_once union unset remove delete".split(" ");e.get_group=function(){function a(c){b[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));e.push([d,call2])}}for(var b={},d=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<f.length;c++)a(f[c]);return b};a._i.push([b,d,g])};a.__SV=1.2;b=c.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===c.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";d=c.getElementsByTagName("script")[0];d.parentNode.insertBefore(b,d)}})(document,window.mixpanel||[]);

            mixpanel.init(this.config.mixpanelToken, {
                debug: this.config.debug,
                track_pageview: false,
                persistence: 'localStorage'
            });

            mixpanel.identify(this.userId);
        }
    }

    // Generate unique session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get or create user ID
    getUserId() {
        let userId = localStorage.getItem('analytics_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('analytics_user_id', userId);
        }
        return userId;
    }

    // Track page view
    trackPageView(pagePath) {
        pagePath = pagePath || window.location.pathname;

        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_path: pagePath,
                page_title: document.title
            });
        }

        // Mixpanel
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track('Page View', {
                page: pagePath,
                title: document.title
            });
        }

        if (this.config.debug) {
            console.log('📊 Page View:', pagePath);
        }
    }

    // Track custom event
    trackEvent(eventName, properties = {}) {
        const eventData = {
            ...properties,
            session_id: this.sessionId,
            user_id: this.userId,
            timestamp: Date.now(),
            page: window.location.pathname
        };

        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }

        // Mixpanel
        if (typeof mixpanel !== 'undefined') {
            mixpanel.track(eventName, eventData);
        }

        // Add to queue
        this.eventsQueue.push({ event: eventName, data: eventData });

        if (this.config.debug) {
            console.log('📊 Event:', eventName, eventData);
        }
    }

    // Track game-specific events
    trackGameEvent(category, action, label, value) {
        this.trackEvent('game_event', {
            event_category: category,
            event_action: action,
            event_label: label,
            value: value
        });
    }

    // Track character selection
    trackCharacterSelection(characterClass) {
        this.trackEvent('character_selected', {
            character_class: characterClass,
            selection_time: Date.now() - this.sessionStart
        });

        // Set user property
        if (typeof mixpanel !== 'undefined') {
            mixpanel.people.set({
                'Last Character': characterClass,
                'Character Selection Count': mixpanel.people.increment(1)
            });
        }
    }

    // Track level up
    trackLevelUp(level, characterClass) {
        this.trackEvent('level_up', {
            level: level,
            character_class: characterClass,
            time_to_level: Date.now() - this.sessionStart
        });
    }

    // Track skill usage
    trackSkillUsage(skillName, skillIndex) {
        this.trackEvent('skill_used', {
            skill_name: skillName,
            skill_index: skillIndex
        });
    }

    // Track mob kill
    trackMobKill(mobType, playerLevel) {
        this.trackEvent('mob_killed', {
            mob_type: mobType,
            player_level: playerLevel
        });
    }

    // Track item pickup
    trackItemPickup(itemName, itemType) {
        this.trackEvent('item_pickup', {
            item_name: itemName,
            item_type: itemType
        });
    }

    // Track performance metrics
    trackPerformance(metrics) {
        this.trackEvent('performance_metrics', {
            fps: metrics.fps,
            frame_time: metrics.frameTime,
            entity_count: metrics.entityCount,
            memory_usage: metrics.memoryUsage
        });
    }

    // Track errors
    trackError(error, context = {}) {
        this.trackEvent('error', {
            error_message: error.message || error.toString(),
            error_stack: error.stack,
            ...context
        });

        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: error.message || error.toString(),
                fatal: false
            });
        }
    }

    // Track session end
    trackSessionEnd() {
        const sessionDuration = Date.now() - this.sessionStart;

        this.trackEvent('session_end', {
            session_duration: sessionDuration,
            total_events: this.eventsQueue.length
        });

        // Update user properties
        if (typeof mixpanel !== 'undefined') {
            mixpanel.people.set({
                'Last Session Duration': sessionDuration,
                'Total Sessions': mixpanel.people.increment(1)
            });
        }
    }

    // Track conversion goal
    trackConversion(goalName, value = 1) {
        this.trackEvent('conversion', {
            goal_name: goalName,
            value: value
        });

        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': this.config.googleAnalyticsId,
                'value': value,
                'transaction_id': this.sessionId
            });
        }
    }

    // Track user properties
    setUserProperty(property, value) {
        if (typeof gtag !== 'undefined') {
            gtag('set', 'user_properties', {
                [property]: value
            });
        }

        if (typeof mixpanel !== 'undefined') {
            mixpanel.people.set({
                [property]: value
            });
        }
    }

    // Get analytics report
    getReport() {
        return {
            sessionId: this.sessionId,
            userId: this.userId,
            sessionDuration: Date.now() - this.sessionStart,
            totalEvents: this.eventsQueue.length,
            events: this.eventsQueue
        };
    }
}

// Create global instance
const analytics = new AnalyticsManager({
    debug: window.location.hostname === 'localhost' || window.location.search.includes('debug=true')
});

// Expose global tracking function
window.trackEvent = (eventName, properties) => {
    analytics.trackEvent(eventName, properties);
};

window.trackGameEvent = (category, action, label, value) => {
    analytics.trackGameEvent(category, action, label, value);
};

// Auto-track errors
window.addEventListener('error', (event) => {
    analytics.trackError(event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsManager;
}
