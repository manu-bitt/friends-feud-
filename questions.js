const questionPool = [
    {
        question: "My energy level is usually:",
        choices: [
            "Morning person 🌞",
            "Night owl 🌙",
            "Depends on the day 🤷",
            "What's energy? ☕"
        ]
    },
    {
        question: "My texting style is:",
        choices: [
            "Fast replies ⚡",
            "Paragraphs 📝",
            "Emoji spam 😂",
            "Seen at 3 PM 👀"
        ]
    },
    {
        question: "My ideal weekend involves:",
        choices: [
            "Party with friends 🎉",
            "Solo Netflix marathon 🍿",
            "Outdoor adventure 🌲",
            "Sleeping until noon 😴"
        ]
    },
    {
        question: "My phone camera roll is mostly:",
        choices: [
            "Selfies 🤳",
            "Screenshots 📱",
            "Memes 🐸",
            "I never take photos ❌"
        ]
    },
    {
        question: "My comfort food is:",
        choices: [
            "Pasta 🍝",
            "Chocolate 🍫",
            "Ramen 🍜",
            "Anything fried 🍟"
        ]
    },
    {
        question: "My shower thoughts are usually about:",
        choices: [
            "Existential dread 😳",
            "To-do lists 📝",
            "Imaginary arguments 💢",
            "I zone out completely 🛁"
        ]
    },
    {
        question: "If I were a kitchen appliance, I'd be a:",
        choices: [
            "Blender (chaotic) 💥",
            "Microwave (impatient) ⏳",
            "Fridge (chill) ❄️",
            "Toaster (reliable) 🍞"
        ]
    },
    {
        question: "My superpower would be:",
        choices: [
            "Teleportation ✈️",
            "Mind reading 🧠",
            "Time travel ⏳",
            "Unlimited napping 😴"
        ]
    },
    {
        question: "My most-used app is:",
        choices: [
            "TikTok/Reels 🎥",
            "Messaging 💬",
            "Games 🎮",
            "I just check the weather ☀️"
        ]
    },
    {
        question: "My walk-up song would be:",
        choices: [
            "Eye of the Tiger 🐅",
            "Barbie Girl 👙",
            "Never Gonna Give You Up 🎸",
            "Silence (I'm awkward) 🤐"
        ]
    },
    {
        question: "If I won the lottery, I'd first buy:",
        choices: [
            "A house 🏠",
            "A pet tiger 🐯",
            "Pay off debts 💸",
            "Disappear forever 🌍"
        ]
    },
    {
        question: "My zombie apocalypse role is:",
        choices: [
            "Leader 🗣️",
            "Medic 💊",
            "First to die ☠️",
            "Hiding expert 🕵️"
        ]
    },
    {
        question: "My love language is:",
        choices: [
            "Gifts 🎁",
            "Words of affirmation 💌",
            "Quality time ⏳",
            "I don't believe in that ❌"
        ]
    },
    {
        question: "My temperature preference is:",
        choices: [
            "Freezing AC ❄️",
            "Sweaty sauna 🔥",
            "Open windows 🌬️",
            "I complain either way 😅"
        ]
    },
    {
        question: "My ideal supergroup would include:",
        choices: [
            "A chef 👨🍳",
            "A comedian 🎤",
            "A survivalist 🏕️",
            "Just me, thanks 🙅"
        ]
    },
    {
        question: "My spirit animal is a:",
        choices: [
            "Sloth 🦥",
            "Golden retriever 🐕",
            "Angry cat 😾",
            "Phoenix (dramatic) 🔥"
        ]
    },
    {
        question: "My Google search history would shock you with:",
        choices: [
            "Conspiracy theories 👽",
            "Can I eat this? 🍄",
            "Cringe fanfiction 📖",
            "How to adult 📚"
        ]
    },
    {
        question: "I secretly judge people who:",
        choices: [
            "Don't rewind VHS tapes 📼",
            "Put milk before cereal 🥛",
            "Say expresso ☕",
            "I don't judge (liar) 😇"
        ]
    },
    {
        question: "My brain is 50% __ , 50% __:",
        choices: [
            "Memes / Random facts 🧠",
            "Anxiety / To-do lists 📝",
            "Song lyrics / Food 🎶",
            "Air / Static 📺"
        ]
    },
    {
        question: "My autobiography title would be:",
        choices: [
            "Oops: A Cautionary Tale ⚠️",
            "I Meant to Do That 😎",
            "Why Am I Like This? 🤔",
            "404 Title Not Found ❓"
        ]
    }
];

function getRandomQuestions() {
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
} 