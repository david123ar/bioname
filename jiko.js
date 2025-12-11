// poste/jiko.js 

const express = require('express');
const app = express();
const port = 3000;

// =========================================================
// !!! CRITICAL VERCEL FIX: EXPORT AND STATIC FILE SETUP !!!
// =========================================================
app.use(express.static(__dirname)); 


// =========================================================
// 1. DATA AND THEME DEFINITIONS 
// =========================================================

const themeStyles = {
    red: {
        avatarBorder: "#ff2c2c", avatarShadow: "0 0 12px #ff2c2c",
        usernameBg: "rgba(255, 0, 0, 0.5)", usernameColor: "#fff", usernameShadow: "0 1px 4px rgba(255, 0, 0, 0.2)",
        descriptionBg: "rgba(255, 0, 0, 0.3)", descriptionColor: "#ccc", descriptionShadow: "0 1px 3px rgba(255, 0, 0, 0.1)",
        linkBg: "linear-gradient(to right, #ff1e1e, #9c0b0b)", linkHoverBg: "linear-gradient(to right, #ff4c4c, #b81a1a)",
        linkColor: "#fff", linkShadow: "0 2px 10px rgba(255, 0, 0, 0.5)", linkHoverShadow: "0 4px 15px rgba(255, 0, 0, 0.6)",
        scrollbarThumb: "rgba(255, 0, 0, 0.3)", adBg: "#1a0000", adShadow: "0 4px 10px rgba(255, 0, 0, 0.3)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
    blue: {
        avatarBorder: "#00b4ff", avatarShadow: "0 0 12px #00b4ff",
        usernameBg: "rgba(0, 120, 255, 0.5)", usernameColor: "#fff", usernameShadow: "0 1px 4px rgba(0, 120, 255, 0.3)",
        descriptionBg: "rgba(0, 120, 255, 0.3)", descriptionColor: "#cceeff", descriptionShadow: "0 1px 3px rgba(0, 120, 255, 0.2)",
        linkBg: "linear-gradient(to right, #007bff, #0052cc)", linkHoverBg: "linear-gradient(to right, #3399ff, #0066cc)",
        linkColor: "#fff", linkShadow: "0 2px 10px rgba(0, 120, 255, 0.5)", linkHoverShadow: "0 4px 15px rgba(0, 120, 255, 0.6)",
        scrollbarThumb: "rgba(0, 120, 255, 0.3)", adBg: "#001b2e", adShadow: "0 4px 10px rgba(0, 120, 255, 0.3)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
    white: {
        avatarBorder: "#ccc", avatarShadow: "0 0 10px rgba(0,0,0,0.1)",
        usernameBg: "#f2f2f2", usernameColor: "#111", usernameShadow: "none",
        descriptionBg: "#f9f9f9", descriptionColor: "#333", descriptionShadow: "none",
        linkBg: "linear-gradient(to right, #ffffff, #e6e6e6)", linkHoverBg: "linear-gradient(to right, #f2f2f2, #dcdcdc)",
        linkColor: "#000", linkShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", linkHoverShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
        scrollbarThumb: "rgba(0, 0, 0, 0.2)", adBg: "#eeeeee", adShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
        titleShadow: "0 0 3px #fff, 0 0 5px #fff",
    },
    skyblue: {
        avatarBorder: "#87ceeb", avatarShadow: "0 0 12px #87ceeb",
        usernameBg: "rgba(135, 206, 235, 0.3)", usernameColor: "#003344", usernameShadow: "0 1px 4px rgba(135, 206, 235, 0.4)",
        descriptionBg: "rgba(135, 206, 235, 0.2)", descriptionColor: "#002222", descriptionShadow: "0 1px 3px rgba(135, 206, 235, 0.3)",
        linkBg: "linear-gradient(to right, #87cefa, #00bfff)", linkHoverBg: "linear-gradient(to right, #add8e6, #009acd)",
        linkColor: "#002244", linkShadow: "0 2px 8px rgba(135, 206, 235, 0.4)", linkHoverShadow: "0 4px 12px rgba(135, 206, 235, 0.5)",
        scrollbarThumb: "rgba(135, 206, 235, 0.4)", adBg: "#e0f7ff", adShadow: "0 4px 10px rgba(135, 206, 235, 0.3)",
        titleShadow: "0 0 3px #fff, 0 0 5px #fff",
    },
    cyan: {
        avatarBorder: "#00ffff", avatarShadow: "0 0 12px #00ffff",
        usernameBg: "rgba(0, 255, 255, 0.3)", usernameColor: "#ffffff", usernameShadow: "0 1px 4px rgba(0, 255, 255, 0.4)",
        descriptionBg: "rgba(0, 255, 255, 0.2)", descriptionColor: "#e0ffff", descriptionShadow: "0 1px 3px rgba(0, 255, 255, 0.3)",
        linkBg: "linear-gradient(to right, #00ffff, #003333)", linkHoverBg: "linear-gradient(to right, #1affff, #005555)",
        linkColor: "#ffffff", linkShadow: "0 2px 10px rgba(0, 255, 255, 0.4)", linkHoverShadow: "0 4px 15px rgba(0, 255, 255, 0.6)",
        scrollbarThumb: "rgba(0, 255, 255, 0.4)", adBg: "#000000", adShadow: "0 4px 10px rgba(0, 255, 255, 0.2)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
    purple: {
        avatarBorder: "#a020f0", avatarShadow: "0 0 12px #a020f0",
        usernameBg: "rgba(160, 32, 240, 0.2)", usernameColor: "#ffffff", usernameShadow: "0 1px 4px rgba(160, 32, 240, 0.3)",
        descriptionBg: "rgba(160, 32, 240, 0.15)", descriptionColor: "#ddd", descriptionShadow: "0 1px 3px rgba(160, 32, 240, 0.2)",
        linkBg: "linear-gradient(to right, #a020f0, #3d0066)", linkHoverBg: "linear-gradient(to right, #b84dff, #5e00a3)",
        linkColor: "#fff", linkShadow: "0 2px 10px rgba(160, 32, 240, 0.4)", linkHoverShadow: "0 4px 15px rgba(160, 32, 240, 0.6)",
        scrollbarThumb: "rgba(160, 32, 240, 0.3)", adBg: "#1a001f", adShadow: "0 4px 10px rgba(160, 32, 240, 0.3)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
    greenblack: {
        avatarBorder: "#00cc66", avatarShadow: "0 0 12px #00cc66",
        usernameBg: "rgba(0, 204, 102, 0.2)", usernameColor: "#ffffff", usernameShadow: "0 1px 4px rgba(0, 204, 102, 0.3)",
        descriptionBg: "rgba(0, 204, 102, 0.15)", descriptionColor: "#ccffdd", descriptionShadow: "0 1px 3px rgba(0, 204, 102, 0.2)",
        linkBg: "linear-gradient(to right, #00cc66, #003300)", linkHoverBg: "linear-gradient(to right, #33ff99, #004d00)",
        linkColor: "#fff", linkShadow: "0 2px 10px rgba(0, 204, 102, 0.4)", linkHoverShadow: "0 4px 15px rgba(0, 204, 102, 0.6)",
        scrollbarThumb: "rgba(0, 204, 102, 0.3)", adBg: "#001a0d", adShadow: "0 4px 10px rgba(0, 204, 102, 0.3)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
    yellowredblackskin: {
        avatarBorder: "#ffc107", avatarShadow: "0 0 12px #ffc107",
        usernameBg: "rgba(255, 193, 7, 0.3)", usernameColor: "#5c0000", usernameShadow: "0 1px 4px rgba(255, 0, 0, 0.3)",
        descriptionBg: "rgba(255, 224, 178, 0.2)", descriptionColor: "#402000", descriptionShadow: "0 1px 3px rgba(255, 193, 7, 0.2)",
        linkBg: "linear-gradient(to right, #ffc107, #dc3545, #000000)", linkHoverBg: "linear-gradient(to right, #ffdd57, #f44336, #111)",
        linkColor: "#fff3e0", linkShadow: "0 2px 10px rgba(255, 193, 7, 0.4)", linkHoverShadow: "0 4px 15px rgba(255, 0, 0, 0.6)",
        scrollbarThumb: "rgba(255, 0, 0, 0.3)", adBg: "#2b0000", adShadow: "0 4px 10px rgba(255, 193, 7, 0.3)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
    burntSkin: {
        avatarBorder: "#B03722", avatarShadow: "0 0 12px #B03722",
        usernameBg: "rgba(255, 247, 221, 0.9)", usernameColor: "#1a1a1a", usernameShadow: "0 1px 4px rgba(176, 55, 34, 0.15)",
        descriptionBg: "rgba(255, 247, 221, 0.8)", descriptionColor: "#2d1a0d", descriptionShadow: "0 1px 3px rgba(176, 55, 34, 0.15)",
        linkBg: "linear-gradient(to right, #B03722, #FEF7DD, #000000)", linkHoverBg: "linear-gradient(to right, #C7482D, #FFF8DC, #1a1a1a)",
        linkColor: "#1a1a1a", linkShadow: "0 2px 10px rgba(176, 55, 34, 0.3)", linkHoverShadow: "0 4px 15px rgba(176, 55, 34, 0.4)",
        scrollbarThumb: "rgba(176, 55, 34, 0.3)", adBg: "#1a0900", adShadow: "0 4px 10px rgba(176, 55, 34, 0.3)",
        titleShadow: "0 0 3px #fff, 0 0 5px #fff",
    },
    yellowwhiteblack: {
        avatarBorder: "#FFD700", avatarShadow: "0 0 12px #FFD700",
        usernameBg: "rgba(255, 215, 0, 0.4)", usernameColor: "#ffffff", usernameShadow: "0 1px 4px rgba(255, 255, 255, 0.3)",
        descriptionBg: "rgba(255, 255, 255, 0.2)", descriptionColor: "#dddddd", descriptionShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        linkBg: "linear-gradient(to right, #FFD700, #ffffff, #000000)", linkHoverBg: "linear-gradient(to right, #fff176, #eeeeee, #222222)",
        linkColor: "#000", linkShadow: "0 2px 10px rgba(255, 215, 0, 0.3)", linkHoverShadow: "0 4px 15px rgba(255, 255, 255, 0.4)",
        scrollbarThumb: "rgba(255, 255, 0, 0.3)", adBg: "#0f0f0f", adShadow: "0 4px 10px rgba(255, 215, 0, 0.2)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
    purpleblack: {
        avatarBorder: "#a020f0", avatarShadow: "0 0 12px #a020f0",
        usernameBg: "rgba(160, 32, 240, 0.2)", usernameColor: "#f0e6ff", usernameShadow: "0 1px 4px rgba(160, 32, 240, 0.25)",
        descriptionBg: "rgba(160, 32, 240, 0.1)", descriptionColor: "#d4bfff", descriptionShadow: "0 1px 3px rgba(160, 32, 240, 0.15)",
        linkBg: "linear-gradient(to right, #a020f0, #000)", linkHoverBg: "linear-gradient(to right, #b84dff, #111)",
        linkColor: "#fff", linkShadow: "0 2px 10px rgba(160, 32, 240, 0.3)", linkHoverShadow: "0 4px 15px rgba(160, 32, 240, 0.5)",
        scrollbarThumb: "rgba(160, 32, 240, 0.2)", adBg: "#120012", adShadow: "0 4px 10px rgba(160, 32, 240, 0.2)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
    shinyOrangeGrey: {
        avatarBorder: "#FFA500", avatarShadow: "0 0 12px #FFA500",
        usernameBg: "rgba(255, 165, 0, 0.3)", usernameColor: "#ffffff", usernameShadow: "0 1px 4px rgba(255, 165, 0, 0.4)",
        descriptionBg: "rgba(255, 255, 255, 0.1)", descriptionColor: "#dddddd", descriptionShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
        linkBg: "linear-gradient(to right, #FFA500, #ffffff, #000000)", linkHoverBg: "linear-gradient(to right, #ffcc66, #f5f5f5, #222222)",
        linkColor: "#000000", linkShadow: "0 2px 10px rgba(255, 165, 0, 0.3)", linkHoverShadow: "0 4px 15px rgba(255, 165, 0, 0.5)",
        scrollbarThumb: "rgba(255, 165, 0, 0.4)", adBg: "#1a1a1a", adShadow: "0 4px 10px rgba(255, 165, 0, 0.3)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
    blackGrey: {
        avatarBorder: "#d0d0d0", avatarShadow: "0 0 10px rgba(255, 255, 255, 0.15)",
        usernameBg: "rgba(255, 255, 255, 0.15)", usernameColor: "#f0f0f0", usernameShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
        descriptionBg: "rgba(255, 255, 255, 0.1)", descriptionColor: "#cccccc", descriptionShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
        linkBg: "linear-gradient(to right, #1a1a1a, #2a2a2a, #1a1a1a)", linkHoverBg: "linear-gradient(to right, #2a2a2a, #3a3a3a, #2a2a2a)",
        linkColor: "#eeeeee", linkShadow: "0 2px 6px rgba(255, 255, 255, 0.1)", linkHoverShadow: "0 4px 10px rgba(255, 255, 255, 0.15)",
        scrollbarThumb: "rgba(255, 255, 255, 0.15)", adBg: "#111111", adShadow: "0 4px 8px rgba(255, 255, 255, 0.1)",
        titleShadow: "0 0 3px #fff, 0 0 5px #fff",
    },
    redWhiteBlack: {
        avatarBorder: "#ffffff", avatarShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
        usernameBg: "rgba(0, 0, 0, 0.7)", usernameColor: "#ff4d4d", usernameShadow: "0 1px 4px rgba(255, 0, 0, 0.5)",
        descriptionBg: "rgba(0, 0, 0, 0.7)", descriptionColor: "#ffffff", descriptionShadow: "0 1px 3px rgba(255, 0, 0, 0.4)",
        linkBg: "linear-gradient(to right, #ff0000, #ffffff, #000000)", linkHoverBg: "linear-gradient(to right, #ff4d4d, #f0f0f0, #1a1a1a)",
        linkColor: "#000000", linkShadow: "0 2px 10px rgba(255, 0, 0, 0.4)", linkHoverShadow: "0 4px 15px rgba(255, 0, 0, 0.6)",
        scrollbarThumb: "rgba(255, 0, 0, 0.4)", adBg: "#1a1a1a", adShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
    default: {
        avatarBorder: "#ccc", avatarShadow: "0 0 10px rgba(0,0,0,0.2)",
        usernameBg: "rgba(50, 50, 50, 0.8)", usernameColor: "#fff", usernameShadow: "none",
        descriptionBg: "rgba(70, 70, 70, 0.7)", descriptionColor: "#ccc", descriptionShadow: "none",
        linkBg: "linear-gradient(to right, #555, #333)", linkHoverBg: "linear-gradient(to right, #777, #555)",
        linkColor: "#fff", linkShadow: "0 2px 5px rgba(0, 0, 0, 0.3)", linkHoverShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
        scrollbarThumb: "rgba(255, 255, 255, 0.2)", adBg: "#111111", adShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        titleShadow: "0 0 3px #000, 0 0 5px #000",
    },
};

const backgroundToTheme = {
    done: "redWhiteBlack", design1: "shinyOrangeGrey", design2: "blue", design3: "cyan",
    design4: "blackGrey", design5: "skyblue", design6: "blue", design8: "greenblack",
    design9: "yellowredblackskin", design10: "white", design11: "burntSkin", design12: "yellowwhiteblack",
    design13: "purpleblack", design14: "red",
};

// FULL DATA ARRAY (Structured from OLDEST (index 0) to NEWEST (index N-1))
const originalData = [
    "Gobaku: Moe Mama Tsurezure", 
    "Ano ko no kawari ni Suki na Dake", 
    "Akogare na Onna Joushi ga",
    "Hametsu no yuuwaku",
    "Akogare na Onna Joushi ga",
    "Netoraserare",
    "Succubus Yondara",
    "Eroriman: Junjou Meikko o Loveho ni Tsurekonde Yaritai Houdai",
    "Kokuhaku: Ijime Namaiki Douji Gal no Uragawa",
    "Eroriman 2",
    "Imouto to Sono Yuujin ga Ero Sugite Ore no Kokan ga Yabai",
    "Dearest Blue",
    "Wife-Swap Diaries",
    "Notto Sexaroid Eurie!",
    "Mama Katsu: Midareru Mama-tachi no Himitsu",
    "Fuuki Iin to Fuuzoku Katsudou",
    "Toriko no Kusari: Shojo-tachi wo Yogosu Midara na Kusabi",
    "Seiso de Majime na Kanojo ga, Saikyou Yaricir ni Kanyuu Saretara…? The Animation",
    "Harem in the Labyrinth",
    "First Love",
    "Issho ni H Shiyo",
    "Sex ga Suki de Suki de Daisuki na Classmate no Ano Musume",
    "Eroriman: Junjou Meikko o Loveho ni Tsurekonde Yaritai Houdai",
    "Amai Ijiwaru",
    "Kazoku: Haha to Shimai no Kyousei",
    "Kokuhaku: Ijime Namaiki Douji Gal no Uragawa",
    "MaMa 1",
    "Sex ga Suki de Suki de Daisuki na Classmate no Ano Musume",
    "Yamitsuki Pheromone The Animation",
    "Shishunki no Obenkyou",
    "Tsun M! Gyutto Shibatte Shidoushite The Animation",
    "Tsugunai",
    "Miboujin Nikki: Akogare no Ano Hito to Hitotsu Yane no Shita",
    "Korashime 2: Kyouikuteki Depaga Shidou",
    "Mama Katsu: Midareru Mama-tachi no Himitsu",
    "Aibeya The Animation",
    "Nee shiyo",
    "Kimi wa Yasashiku Netorareru The Animation",
    "Secret Mission: Sennyuu Sousakan wa Zettai ni Makenai!",
    "Yumemiru Otome",
    "Iinari! Saimin Kanojo",
    "Boku no Risou no Isekai Seikatsu",
    "Cleavage",
    "Oni Chichi 2: Revenge",
    "idol sisters",
    "Maid in Heaven SuperS",
    "First Love",
    "Bakunyuu Bomb",
    "White Blue",
    "Nee shiyo",
    "Konomi ja Nai kedo: Mukatsuku Ane to Aishou Batsugun Ecchi",
    "Midareuchi",
    "First Love",
    "Tonari no Kanojo",
    "Tonari no Kanojo",
    "White Blue",
    "Junjou Shoujo Et Cetera",
    "Kuro no Kyoushitsu",
    "Konomi ja Nai kedo: Mukatsuku Ane to Aishou Batsugun Ecchi",
    "Soshite Watashi wa Ojisan ni",
    "Reunion",
    "Gakuen de Jikan yo Tomare",
    "Hametsu no Yuuwaku",
    "Princess Burst!",
    "Gibo no Toiki: Haitoku Kokoro ni Tadayou Haha no Iroka",
    "Chiisana Tsubomi no Sono Oku ni",
    "Dekichau made Kon",
    "Oni Chichi 2: Revenge",
    "Kazoku: Haha to Shimai no Kyousei",
    "Shishunki no Obenkyou",
    "Dekichau made Kon",
    "Asa made Shirudaku Oyakodon!!",
    "Hump Bang",
    "Milk Money",
    "Aniyome",
    "Miboujin Nikki: Akogare no Ano Hito to Hitotsu Yane no Shita",
    "Ojisan de Umeru Ana The Animation",
    "Vampire",
    "Dekichau made Kon",
    "Maki-chan to Now.",
    "Hime-sama Love Life!",
    "MaMa 2",
    "Dekichau made Kon",
    "Helter Skelter: Hakudaku no Mura",
    "Succubus Yondara Haha Ga Kita!?",
    "Immoral Game Master The Animation",
    "Ane Yome Quartet",
    "Sweet Home: H na Onee-san wa Suki Desu ka?",
    "Asa made Shirudaku Oyakodon!!",
    "Immoral Game Master The Animation",
    "Taboo Charming Mother",
    "Kyou wa Yubiwa wo Hazusu kara",
    "Fuuki Iin to Fuuzoku Katsudou",
    "Kazoku: Haha to Shimai no Kyousei",
    "Imouto wa Gal Kawaii",
    "Nozoki Kanojo",
    "Furifure 2",
    "Asa made Shirudaku Oyakodon!!",
    "Soshite Watashi wa Ojisan ni",
    "MaMa 1", 
    "Cleavage",
    "Ero Ishi: Seijun Bishoujo wo Kotoba Takumi ni Hametai Houdai",
    "Iribitari Gal ni Manko Tsukawasete Morau Hanashi",
    "Oyasumi Sex",
    "Bakunyuu Bomb",
    "Taboo Charming Mother",
    "Ano Ko no Kawari ni Suki na Dake",
    "Kakushi Dere",
    "Netoraserare",
    "Issho ni H Shiyo",
    "Debt Sisters",
    "Boku no Risou no Isekai Seikatsu",
    "Kakushi Dere",
    "Bijukubo",
    "Dekichau made Kon",
    "Gakuen de Jikan yo Tomare",
    "Taboo Charming Mother",
    "Amai Ijiwaru",
    "Mama Katsu: Midareru Mama-tachi no Himitsu",
    "Gobaku: Moe Mama Tsurezure",
    "Koiito Kinenbi The Animation",
    "Hitozuma Life One Time Gal Prequel",
    "Gogo no Kouchou: Junai Mellow yori",
    "Princess Burst!",
    "Eroge! H mo Game mo Kaihatsu Zanmai",
    "Cleavage",
    "M.E.M.: Yogosareta Junketsu",
    "Ane Koi: Suki Kirai Daisuki.",
    "Kanojo ga Yatsu ni Idakareta Hi",
    "Dekichau made Kon",
    "Tropical Kiss",
    "Sister Breeder",
    "Taboo Charming Mother",
    "Netoraserare",
    "Succubus Yondara Haha Ga Kita!?",
    "Oni Chichi 2: Revenge",
    "Imouto Paradise! 2",
    "Tsuma wo Dousoukai ni Ikasetara",
    "Boku no Risou no Isekai Seikatsu",
    "Gibo no Toiki: Haitoku Kokoro ni Tadayou Haha no Iroka",
    "Chiisana Tsubomi no Sono Oku ni",
    "Vampire",
    "Milk Money",
    "Gogo no Kouchou: Junai Mellow yori",
    "Harem in the Labyrinth",
    "Sister Breeder",
    "Issho ni H Shiyo",
    "Milk Money",
    "Gibo no Toiki: Haitoku Kokoro ni Tadayou Haha no Iroka",
    "Shachiku Cinderella",
    "Choro Mesu Days",
    "Tonari no Kanojo",
    "Hitozuma Life One Time Gal Prequel",
    "Maid Ane",
    "Sister Breeder",
    "Choro Mesu Days",
    "Wife-Swap Diaries",
];

const mockUser = {
    username: "henpro-user",
    bio: "The best source for all things spicy! Search by Post # (e.g., 10) or by Title.",
    avatar: "https://cdn.noitatnemucod.net/avatar/100x100/zoro_normal/av-zz-06.jpeg",
    design: "design8.jpeg" 
};

// =========================================================
// 2. SERVER-SIDE CONTENT PREPARATION & DYNAMIC LOGIC
// =========================================================

// STEP 1: Reverse the data so it's NEWEST (Index 0) to OLDEST (Index N-1).
// This determines the visual DECENDING order.
const allPosts = [...originalData].reverse(); 

// --- DYNAMIC VISIBILITY CALCULATION ---
/**
 * Calculates how many of the OLDEST posts should be marked as revealed.
 * The total number of posts revealed is used as a boundary.
 * * @returns {number} The total count of OLDEST posts revealed.
 */
function getVisiblePostCount() {
    // Current time: Thursday, December 11, 2025 at 11:12:22 AM IST.
    // Set the conceptual start date for the cycle, with 2 posts already revealed.
    const INITIAL_REVEAL_DATE_MS = new Date('2025-12-09T23:00:00+05:30').getTime(); 
    const REVEAL_RATE = 2; // 2 posts per day
    const INITIAL_POSTS = 2; // Start with 2 posts visible.

    const now = Date.now();
    
    // Time elapsed since the initial reveal date (in milliseconds)
    const timeElapsedMs = now - INITIAL_REVEAL_DATE_MS;

    if (timeElapsedMs < 0) {
        return INITIAL_POSTS; 
    }

    const daysElapsed = Math.floor(timeElapsedMs / (1000 * 60 * 60 * 24));

    // Calculate the total posts revealed (starting from the oldest post)
    let visibleCount = INITIAL_POSTS + (daysElapsed * REVEAL_RATE);
    
    // Cap the count
    return Math.min(visibleCount, originalData.length);
}

// =========================================================
// 3. AD SCRIPT FUNCTION
// =========================================================

function getAdHtml() {
    const adScriptTop = `
        <script async="async" data-cfasync="false" src="//brownrealization.com/917495758f35e40004f3af3fe8c04eb8/invoke.js"></script>
        <div id="container-917495758f35e40004f3af3fe8c04eb8"></div>
    `;
    const adScriptBottom = `
        <script async="async" data-cfasync="false" src="//brownrealization.com/33a497c32aa8ecfffc3d4653d57e37f4/invoke.js"></script>
        <div id="container-33a497c32aa8ecfffc3d4653d57e37f4"></div>
    `;

    return { adScriptTop, adScriptBottom };
}


// =========================================================
// 4. CSS STYLES FUNCTION
// =========================================================

function getCssStyles(theme) {
    const scrollbarStyle = `
        /* Custom scrollbar for better appearance */
        .bio-links::-webkit-scrollbar { width: 8px; }
        .bio-links::-webkit-scrollbar-track { background: transparent; }
        .bio-links::-webkit-scrollbar-thumb {
            background: ${theme.scrollbarThumb};
            border-radius: 4px;
        }
        .bio-link span {
            text-shadow: ${theme.titleShadow};
        }
    `;

    const staticCss = `
        /* Reset and Base Styles */
        body { margin: 0; padding: 0; font-family: sans-serif; background-color: #000; }
        .page-wrapper {
            width: 100%; min-height: 100vh; display: flex;
            justify-content: center; align-items: flex-start;
            overflow-x: hidden; position: relative;
        }
        .bio-page {
            position: relative; width: 100%; max-width: 500px;
            min-height: 100vh; display: flex; flex-direction: column;
            align-items: center; overflow: hidden;
        }
        .bio-background {
            position: absolute; top: 0; right: 0; width: 100%; height: 100%;
            object-fit: cover; z-index: 0; pointer-events: none;
        }
        .bio-content {
            position: relative; z-index: 1; padding: 20px; width: 100%;
            min-height: 100vh; display: flex; flex-direction: column;
            align-items: center; gap: 12px; overflow-x: hidden;
        }
        .bio-avatar {
            width: 100px; height: 100px; border-radius: 50%; overflow: hidden;
            box-sizing: content-box;
        }
        .bio-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .bio-username {
            font-size: 18px; font-weight: bold; padding: 4px 10px;
            border-radius: 6px; text-align: center; word-break: break-word;
        }
        .bio-description {
            font-size: 14px; text-align: center; padding: 4px 10px;
            border-radius: 6px; max-width: 90%; word-break: break-word;
        }

        /* --- SEARCH BAR STYLES --- */
        .bio-search-container {
            width: 90%; 
            max-width: 450px; 
            margin: 5px auto 15px auto;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            border-radius: 20px;
            overflow: hidden;
        }
        .bio-search-input {
            width: 100%;
            padding: 10px 15px;
            border: none;
            font-size: 16px;
            background-color: rgba(255, 255, 255, 0.9);
            color: #333;
            outline: none;
            box-sizing: border-box;
            font-family: monospace;
        }
        
        /* Definitive Centering Fix for Links (Handling Scrollbar) */
        .bio-links {
            width: 90%; 
            max-width: 450px; 
            margin-left: auto; 
            margin-right: auto; 
            display: flex;
            flex-direction: column; 
            gap: 12px; 
            margin-top: 10px;
            height: 350px; 
            overflow-y: scroll; 
            padding-right: 15px; 
            padding-left: 15px; 
            overflow-x: hidden;
            box-sizing: border-box;
        }
        
        /* DYNAMIC HEIGHT AND CENTERING */
        .bio-link { 
            display: flex; 
            align-items: center; 
            justify-content: center;
            min-height: 55px; 
            height: auto;    
            width: 100%;
            padding: 8px 14px; 
            text-decoration: none;
            flex-shrink: 0; 
            font-size: 15px; 
            font-weight: 600; 
            border-radius: 18px;
            border: 1px solid transparent; 
            transition: all 0.25s ease;
            box-sizing: border-box; 
            cursor: pointer;
            text-align: center; 
            white-space: normal; 
        }
        
        /* HIDDEN CLASS FOR SEARCH RESULTS */
        .bio-link-hidden {
            display: none !important; 
        }

        .bio-link div {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        /* Ensure hover uses theme colors */
        .bio-link:hover { 
            background: ${theme.linkHoverBg} !important; 
            box-shadow: ${theme.linkHoverShadow} !important;
            transform: scale(1.01); 
        }
        
        /* AD Container Styles */
        .bio-ad {
            width: 90%; 
            max-width: 450px; 
            margin-left: auto; 
            margin-right: auto; 
            min-height: 90px;
            border-radius: 12px; 
            display: flex; 
            justify-content: center;
            align-items: center; 
            overflow: hidden; 
            z-index: 10;
            box-sizing: border-box;
            background-color: ${theme.adBg}; 
            box-shadow: ${theme.adShadow};
        }
        .bio-ad.ad-top { margin-bottom: 12px; }
        .bio-ad.ad-bottom { margin-top: 20px; }
        
        /* Style for the ad divs */
        .bio-ad div[id^="container-"] {
            width: 100%;
            display: flex;
            justify-content: center;
        }
    `;

    return `<style>${staticCss} ${scrollbarStyle}</style>`;
}


// =========================================================
// 5. CLIENT-SIDE JAVASCRIPT FUNCTION
// =========================================================

function getClientScript() {
    return `
<script>
    const STORAGE_KEY = 'henpro_unlocked_titles';
    
    function getUnlockedTitles() {
        const stored = localStorage.getItem(STORAGE_KEY);
        try {
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error("Error parsing localStorage:", e);
            return {};
        }
    }

    function setUnlockedTitle(title) {
        const unlocked = getUnlockedTitles();
        unlocked[title] = true;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
    }
    
    function copyToClipboard(text, container, originalBg) {
        navigator.clipboard.writeText(text).then(() => {
            const originalShadow = container.style.boxShadow;
            
            // Flash green effect for copy confirmation
            container.style.background = 'linear-gradient(to right, #00CC00, #008000)';
            container.style.boxShadow = '0 0 15px rgba(0, 204, 0, 0.7)';
            
            // Revert style after 500ms
            setTimeout(() => {
                container.style.background = originalBg;
                container.style.boxShadow = originalShadow;
            }, 500);
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy. Please copy manually: ' + text);
        });
    }

    // Slab Creation Function
    function createSauceSlab(title, index, totalPosts, theme, isVisible, isNextUpcoming) {
        // Post number must be calculated based on the position in the *original, ascending list*
        // Since the current list (allPosts) is reversed (Newest=0, Oldest=N-1):
        const postNumber = totalPosts - index; 
        
        const unlockedTitles = getUnlockedTitles();
        const isPermanentlyUnlocked = !!unlockedTitles[title];

        const container = document.createElement('div');
        container.className = 'bio-link';
        container.setAttribute('data-post-number', postNumber);
        container.setAttribute('data-title', title.toLowerCase()); 
        
        const originalBg = theme.linkBg;
        const linkColor = theme.linkColor;
        const postNumberColor = theme.avatarBorder;

        container.style.cssText = \`
            background: \${originalBg};
            color: \${linkColor};
            box-shadow: \${theme.linkShadow};
        \`;
        
        // Render UNLOCKED state (Sauce revealed and copyable)
        const renderUnlocked = () => {
             container.innerHTML = \`
                 <div style="flex: 1; text-align: center; font-weight: 700; font-size: 1.1rem; color: \${linkColor};">
                     <span style="color: \${postNumberColor}; margin-right: 5px;">#\${postNumber}:</span> \${title}
                     <span style="display: block; font-size: 0.8rem; font-weight: 400; opacity: 0.8;">(Click to Copy)</span>
                 </div>
             \`;
            
            container.onclick = () => copyToClipboard(title, container, originalBg);
        };
        
        // Render LOCKED state (Sauce is hidden, requires reveal click)
        const renderLocked = () => {
            container.innerHTML = \`
                <div style="flex: 1; text-align: center; font-weight: 600; font-size: 1.1rem; color: \${linkColor};">
                    <span style="color: \${postNumberColor}; margin-right: 5px;">#\${postNumber}</span> Sauce (Click to Reveal)
                </div>
            \`;
            
            container.onclick = () => {
                // 1. Change to revealing state
                container.style.background = theme.linkHoverBg;
                container.style.boxShadow = theme.linkHoverShadow;
                container.innerHTML = \`
                    <div style="flex: 1; text-align: center; font-weight: 700; font-size: 1.1rem; color: \${linkColor};">
                        <span style="display: block; margin-bottom: 4px;">#\${postNumber} The Sauce is:</span>
                        <span style="font-size: 1.2rem; color: \${postNumberColor};">\${title}</span>
                    </div>
                \`;

                // 2. Set permanent unlock status and render the final copy state after timer
                setTimeout(() => {
                    setUnlockedTitle(title);
                    renderUnlocked(); 
                }, 3000); // 3 second reveal time
            };
        };

        // Render BLOCKED state (Post is not yet released based on daily schedule)
        const renderBlocked = () => {
            container.style.background = 'rgba(0, 0, 0, 0.4)';
            container.style.boxShadow = 'none';
            container.style.cursor = 'default';
            container.style.opacity = '0.5';
            container.innerHTML = \`
                <div style="flex: 1; text-align: center; font-weight: 600; font-size: 1.1rem; color: \${linkColor};">
                    <span style="color: \${postNumberColor}; margin-right: 5px;">#\${postNumber}</span> Coming Soon...
                </div>
            \`;
            container.onclick = null;
        };

        if (isVisible) {
            if (isPermanentlyUnlocked) {
                renderUnlocked();
            } else {
                renderLocked();
            }
        } else if (isNextUpcoming) { // Only render if it's one of the next two posts
            renderBlocked();
        } else {
            // Do not render posts far in the future
            return null; 
        }

        return container;
    }

    // Search Function
    function handleRealtimeSearch() {
        const input = document.getElementById('bio-search-input');
        const query = input.value.trim().toLowerCase();
        const linksContainer = document.getElementById('bio-links-container');
        if (!linksContainer) return;

        const slabs = linksContainer.querySelectorAll('.bio-link');

        if (query === "") {
            slabs.forEach(slab => {
                slab.classList.remove('bio-link-hidden');
            });
            return;
        }

        const searchNumber = parseInt(query, 10);
        const isExactNumeric = !isNaN(searchNumber) && searchNumber.toString() === query;

        slabs.forEach(slab => {
            let isMatch = false;
            const postNumber = slab.getAttribute('data-post-number');
            const titleText = slab.getAttribute('data-title'); 
            
            if (isExactNumeric) {
                if (postNumber === query) {
                    isMatch = true;
                }
            } else {
                if (titleText && titleText.includes(query)) {
                    isMatch = true;
                }
            }

            if (isMatch) {
                slab.classList.remove('bio-link-hidden');
            } else {
                slab.classList.add('bio-link-hidden');
            }
        });
    }


    function renderProfile() {
        if (typeof APP_DATA === 'undefined') {
            console.error("APP_DATA was not injected by the server.");
            return;
        }
        
        const { allPosts, visibleCount, totalPosts, user, theme } = APP_DATA; 
        const avatarSrc = user.avatar;

        const appContainer = document.getElementById('app');
        if (!appContainer) return;

        // 1. Create the main structure
        const profileHtml = \`
            <div class="page-wrapper">
                <div class="bio-page">
                    <img src="/\${user.design || 'done.jpeg'}" alt="background" class="bio-background" />

                    <div class="bio-content">
                        <div class="bio-ad ad-top" id="ad-top-container"></div> 

                        <div class="bio-avatar" style="border: 3px solid \${theme.avatarBorder}; box-shadow: \${theme.avatarShadow};">
                            <img src="\${avatarSrc}" alt="avatar" />
                        </div>

                        <div class="bio-username" style="background: \${theme.usernameBg}; color: \${theme.usernameColor}; box-shadow: \${theme.usernameShadow};">
                            \${user.username}
                        </div>

                        <div class="bio-description" style="background: \${theme.descriptionBg}; color: \${theme.descriptionColor}; box-shadow: \${theme.descriptionShadow};">
                            \${user.bio}
                            <br>(\${visibleCount} of \${totalPosts} Posts Visible)
                        </div>
                        
                        <div class="bio-search-container">
                            <input type="text" id="bio-search-input" class="bio-search-input" placeholder="Search by Exact Post # (e.g., 10) or Title..." onkeyup="handleRealtimeSearch()" />
                        </div>

                        <div class="bio-links" id="bio-links-container">
                            \${totalPosts === 0 ? \`<div style="color: \${theme.descriptionColor}; text-align: center; padding: 20px; opacity: 0.7;">No posts available.</div>\` : ''}
                        </div>

                        <div class="bio-ad ad-bottom" id="ad-bottom-container"></div>
                    </div>
                </div>
            </div>
        \`;

        appContainer.innerHTML = profileHtml;

        // 2. Insert dynamic links using DOM manipulation
        const linksContainer = document.getElementById('bio-links-container');
        if (linksContainer) {
            let upcomingCount = 0; // Tracks how many 'Coming Soon' posts we have rendered
            
            // allPosts is already reversed (Newest at index 0). We iterate through all posts.
            allPosts.forEach((title, index) => { 
                // Sequential Number (1-based, OLDEST to NEWEST) = totalPosts - index
                const sequentialNumber = totalPosts - index;
                
                // A post is considered 'Visible' (released) if its sequential number is less than or equal to the total revealed posts.
                const isVisible = sequentialNumber <= visibleCount;
                
                // A post is considered 'Next Upcoming' if it is NOT visible (released) 
                // AND it is one of the next 2 posts to be released.
                const isNextUpcoming = !isVisible && (sequentialNumber > visibleCount) && (sequentialNumber <= visibleCount + 2) && (upcomingCount < 2);

                let slab = null;
                
                // If it's visible, render it normally (unlocked or locked/revealable)
                if (isVisible) {
                    slab = createSauceSlab(title, index, totalPosts, theme, true, false);
                } 
                // If it's one of the two next upcoming posts, render the 'Coming Soon' slab
                else if (isNextUpcoming) {
                    slab = createSauceSlab(title, index, totalPosts, theme, false, true);
                    upcomingCount++; // Increment the counter for limited display
                }

                if (slab) {
                    linksContainer.appendChild(slab);
                }
            });
        }
    }

    document.addEventListener('DOMContentLoaded', renderProfile);
</script>
    `;
}

// =========================================================
// 6. EXPRESS ROUTE HANDLER
// =========================================================

app.get('/', (req, res) => {
    const themeKey = backgroundToTheme[mockUser.design.split('.')[0]] || 'default';
    const currentTheme = themeStyles[themeKey];
    
    // --- DYNAMIC CONTENT LOGIC ---
    const totalVisibleCount = getVisiblePostCount();
    
    // Get Ad Scripts
    const { adScriptTop, adScriptBottom } = getAdHtml();

    // Data injected to the client:
    const clientData = {
        allPosts: allPosts, // Reversed: Newest (0) to Oldest (N-1)
        visibleCount: totalVisibleCount, // Total #1, #2, ... #N that should be accessible
        totalPosts: originalData.length,
        user: mockUser,
        theme: currentTheme,
    };
    
    const appDataScript = `<script>const APP_DATA = ${JSON.stringify(clientData)};</script>`;

    // --- HTML STRUCTURE ---
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${mockUser.username} | Bio Link</title>
    ${getCssStyles(currentTheme)}
    ${appDataScript}
</head>
<body>
    <div id="app"></div>
    ${getClientScript()}

    ${adScriptTop}
    ${adScriptBottom}
</body>
</html>
    `;

    res.send(htmlContent);
});

// =========================================================
// 7. EXPORT THE APP FOR VERCEL (CRITICAL FIX)
// =========================================================

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('--- Post Visibility Logic ---');
    console.log(`Total Posts in List: ${originalData.length}`);
    console.log(`Initial Reveal Date (Logic Anchor): 2025-12-09T23:00:00+05:30 (IST)`);
    console.log(`Current Visible Posts (#1 to #N): ${getVisiblePostCount()}`);
    console.log(`Display Order: Decending (Newest post at the top)`);
});