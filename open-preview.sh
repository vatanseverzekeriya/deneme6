#!/bin/bash

# Autonomous Game Preview Launcher
# This script automatically opens the game in the default browser

echo "🎮 Metin2-Style RPG Oyunu Açılıyor..."
echo ""
echo "✅ Sunucu Durumu: Kontrol ediliyor..."

# Check if server is running
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/metin2-style.html)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Sunucu çalışıyor (HTTP $HTTP_CODE)"
    echo ""
    echo "🚀 Tarayıcıda oyun açılıyor..."
    echo "   URL: http://localhost:3000/metin2-style.html"
    echo ""

    # Open in browser
    sensible-browser "http://localhost:3000/metin2-style.html" 2>/dev/null &

    # Wait a moment
    sleep 2

    echo "✨ Oyun tarayıcınızda açıldı!"
    echo ""
    echo "🎮 Oyun Özellikleri:"
    echo "   • 4 Karakter Sınıfı (Savaşçı, Ninja, Şaman, Sura)"
    echo "   • 6 Farklı Harita (1.Köy → Şeytan Kulesi)"
    echo "   • Seviye bazlı harita kilitleme sistemi"
    echo "   • Mobil joystick kontrol"
    echo ""
    echo "📍 Harita değiştirmek için sağ üstteki 🗺️ butonuna basın!"

else
    echo "❌ Sunucu çalışmıyor veya ulaşılamıyor (HTTP $HTTP_CODE)"
    echo ""
    echo "Sunucuyu başlatmak için:"
    echo "  node server.js"
    exit 1
fi
