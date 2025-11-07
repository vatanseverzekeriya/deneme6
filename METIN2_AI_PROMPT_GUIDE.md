# 🎮 Metin2 AI Prompt Engineering Guide

## Overview

This guide provides prompt engineering techniques for generating Metin2-style game assets using AI. Whether you're creating monsters, environments, or items, following these structured approaches will help you achieve better results.

---

## ✍️ Crafting Your AI Prompts for Game Assets

The key to good AI generation is being specific and structured. Here is a breakdown of what to include in your prompts, followed by practical examples.

### Core Elements of an Effective Prompt

1. **Main Subject:** Clearly state what the object is (e.g., "Wild Dog," "Weapon Shop").
2. **Descriptors & Modifiers:** Use strong adjectives (e.g., "low-poly," "aggressive," "weathered").
3. **Materials & Textures:** Define surface properties (e.g., "fur texture," "wooden planks," "stone path").
4. **Style & Genre:** Specify the artistic style (e.g., "stylized fantasy," "similar to classic MMORPGs like Metin2").
5. **Quality & Technical Specs:** Mention the intended use (e.g., "game-ready asset," "optimized for mobile games").

---

## 📋 Prompt Templates

Here are some prompt templates you can adapt for different asset types:

### Starter Monsters

**Template:**
```
Low-poly 3D model of an [MONSTER_TYPE], [ACTION/POSE], [TEXTURE_DETAILS],
posed for [STANCE]. Stylized fantasy style, not photorealistic,
optimized for a game asset like Metin2.
```

**Example:**
```
Low-poly 3D model of an aggressive wolf, snarling with bared teeth,
grey fur texture, posed for attack. Stylized fantasy style,
not photorealistic, optimized for a game asset like Metin2.
```

**Common Metin2 Starter Monsters:**
- Wild Dog / Wolf
- Young Boar
- Red Bandit
- Yellow Thief
- Young Bear
- Spider

---

### Environment Objects

**Template:**
```
Low-poly model of a [OBJECT_TYPE], [CONDITION/AGE], [UNIQUE_FEATURES],
[PLACEMENT_CONTEXT]. Hand-painted texture style, game-ready asset.
```

**Example:**
```
Low-poly model of a weathered wooden signpost, text written in a fantasy language,
moss on one side, stuck in the ground near a dirt path. Hand-painted texture style,
game-ready asset.
```

**Common Environment Assets:**
- Signposts
- Training Dummies
- Market Stalls
- Stone Wells
- Lamp Posts
- Village Fences

---

### Starter Village Areas

**Template:**
```
[VIEW_TYPE] of a [LOCATION_TYPE], with [BUILDING_1], [BUILDING_2],
and [PROP_DETAILS]. [COLOR_PALETTE], [ART_STYLE], similar to [REFERENCE].
```

**Example:**
```
Isometric view of a fantasy game's starter village square, with a thatched-roof inn,
a stone well, and wooden training dummies. Bright, inviting color palette,
low-poly style, similar to Metin2's first village.
```

**Village Components:**
- Town Square
- General Store
- Weapon Shop
- Armor Shop
- Village Chief's House
- Training Grounds
- Inn/Tavern

---

### Items & Equipment

**Template:**
```
[VIEW_TYPE] of [ITEM_TYPE], [MATERIAL], [CONDITION], [DISTINCTIVE_FEATURES].
[ART_STYLE], [TECHNICAL_SPECS].
```

**Example:**
```
Icon view of a basic iron sword, polished metal blade, leather-wrapped handle,
small red gem in pommel. Stylized low-poly aesthetic, 256x256 texture,
game item icon.
```

**Starter Equipment Categories:**
- Weapons (Swords, Bows, Fans, Bells)
- Armor (Cloth, Leather, Light Armor)
- Accessories (Rings, Necklaces, Earrings)
- Consumables (Potions, Food)

---

## 🎯 Advanced Prompt Engineering Tips

### 1. Focus on Single Objects
AI works best when generating one object at a time.

❌ **Bad:** "Create all starting monsters for Metin2"
✅ **Good:** "Create a low-poly wild dog model for a Metin2-style game"

### 2. Use Negative Prompts
Tell the AI what to avoid for cleaner results.

```
Negative prompts: no thin sections, no complex overhangs,
no photorealistic textures, no modern elements
```

### 3. Specify Technical Requirements

**For 3D Models:**
```
- Polygon count: 500-2000 triangles
- Texture resolution: 512x512 or 1024x1024
- Format: FBX, OBJ, or GLTF
- Rigged for animation
```

**For 2D Assets:**
```
- Resolution: 256x256, 512x512, or 1024x1024
- Format: PNG with transparency
- Color depth: 32-bit RGBA
- Style: Hand-painted or pixel art
```

### 4. Iterate and Refine
Don't expect perfection on the first try. Generate multiple versions:

1. Start with a basic prompt
2. Review the results
3. Identify what needs improvement
4. Refine your prompt with more specific details
5. Generate again

### 5. Use Reference Combinations

Combine multiple style references for unique results:
```
"In the style of Metin2 meets World of Warcraft, with a touch of
Korean MMORPG aesthetics, low-poly count suitable for mobile gaming"
```

---

## 🔍 Finding Specific Metin2 Information

To create more accurate Metin2-style assets, gather reference material:

### In-Game Research
1. Log into Metin2
2. Visit the starter villages:
   - **Warrior Village** (Joan)
   - **Ninja Village** (Yongan)
   - **Shaman Village** (Bokjung)
3. Take screenshots of:
   - Monster designs
   - Building architecture
   - Environment layout
   - Color schemes
   - UI elements

### Community Resources
- **Metin2 Wiki**: Monster stats, spawn locations, item databases
- **Fan Sites**: Detailed maps and guides
- **Reddit & Forums**: Community discussions and asset sharing
- **YouTube**: Gameplay videos for reference

### Starter Zone Details

**Typical Starter Village Components:**
- Village size: Approximately 200x200 meters
- 5-10 buildings
- 3-5 NPC types
- 4-6 monster types
- Training area with dummies
- Quest giver NPCs

**Common Starter Monsters:**
| Monster Name | Level | Type | Appearance |
|:-------------|:------|:-----|:-----------|
| Wild Dog | 1-3 | Beast | Brown/Grey canine |
| Young Boar | 2-4 | Beast | Small pig-like creature |
| Red Bandit | 3-5 | Humanoid | Red-clothed thief |
| Yellow Thief | 4-6 | Humanoid | Yellow-robed bandit |
| Young Bear | 5-7 | Beast | Small brown bear |
| Spider | 1-3 | Insect | Large arachnid |

---

## 🛠️ Practical Workflow

### Step 1: Plan Your Asset
- Define what you need (monster, building, item)
- Determine technical specifications
- Gather reference images

### Step 2: Write Your Prompt
- Use the templates above
- Include all 5 core elements
- Add negative prompts if needed

### Step 3: Generate & Evaluate
- Generate 3-5 variations
- Compare results
- Select the best option

### Step 4: Refine
- Adjust prompt based on results
- Regenerate specific problem areas
- Iterate until satisfied

### Step 5: Post-Process
- Import into 3D software (Blender, Maya)
- Clean up geometry
- Optimize for game engine
- Test in-game

---

## 📝 Example Complete Prompts

### Wild Dog Monster
```
Create a low-poly 3D model of a hostile wild dog enemy for a fantasy MMORPG.
The dog should have:
- Aggressive stance with teeth bared
- Matted grey-brown fur texture
- Glowing red eyes indicating corruption
- Lean, hungry appearance
- 1000-1500 polygon count
- Rigged for basic attack animations
- Style similar to Metin2's early-game monsters
- Hand-painted textures, not photorealistic

Negative: no modern collar, no friendly appearance, no high-poly details
```

### Village Weapon Shop
```
Create an isometric view of a traditional Korean-fantasy weapon shop building:
- Wooden structure with curved tile roof
- Red and gold color accents
- Weapon racks visible through open front
- Hanging lanterns
- Weathered but well-maintained appearance
- Low-poly style (2000-3000 triangles)
- Suitable for top-down MMORPG like Metin2
- Hand-painted textures with clear silhouette

Negative: no modern elements, no glass windows, no photorealism
```

### Beginner Sword Item
```
Create a game item icon for a basic beginner sword:
- Simple straight blade design
- Iron/steel material with slight shine
- Leather-wrapped grip
- Small red gem in crossguard
- 256x256 pixel icon
- Transparent background
- Slight 3D effect with soft shadows
- Style matching Metin2 UI aesthetic
- Clear silhouette readable at small size

Negative: no ornate decorations, no legendary-tier effects, no modern materials
```

---

## 🎨 Color Palettes for Metin2 Style

### Village Buildings
- **Primary:** Browns, deep reds, dark wood tones
- **Accents:** Gold, jade green, crimson
- **Roofs:** Blue-grey tiles, terracotta

### Monsters (Starter Zones)
- **Wild Animals:** Natural browns, greys, earth tones
- **Bandits:** Red, yellow, brown clothing
- **Corrupted Creatures:** Dark colors with red/purple glows

### UI & Items
- **Common Items:** Grey, white, brown
- **Uncommon Items:** Green accents
- **Rare Items:** Blue accents
- **Epic Items:** Purple/violet
- **Legendary Items:** Gold/orange

---

## 📚 Additional Resources

### AI Tools for Game Assets
- **3D Models:** Meshy, Rodin, 3DFY
- **Textures:** Poly, TextureLab
- **2D Art:** Midjourney, DALL-E 3, Stable Diffusion
- **Concept Art:** Leonardo AI, Runway

### Game Asset Optimization
- **Polygon Reduction:** Blender (Decimate modifier)
- **Texture Optimization:** TexturePacker, PVRTexTool
- **Format Conversion:** Assimp, FBX Converter

---

## 💡 Quick Tips Summary

1. ✅ **Be specific** - More details = better results
2. ✅ **Single focus** - One asset at a time
3. ✅ **Include style references** - "Like Metin2" helps AI understand
4. ✅ **Specify technical needs** - Poly count, texture size, format
5. ✅ **Use negative prompts** - Exclude unwanted features
6. ✅ **Iterate** - First result rarely perfect
7. ✅ **Reference real Metin2** - Best style guide is the game itself
8. ✅ **Consider mobile optimization** - Keep poly counts reasonable
9. ✅ **Test in-game** - Always verify assets in your engine
10. ✅ **Build asset library** - Save successful prompts for reuse

---

## 🤝 Contributing

Found better prompts or techniques? Feel free to contribute to this guide!

---

**Good luck creating your Metin2-style game world! 🎮⚔️**
