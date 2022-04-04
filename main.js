const print = console.log
const gid = (id) => document.getElementById(id)
const log = (text, color)=>print(`%c${text}`, `color: black; background-color: ${color}`)

var selected_day = 0

function setup() {
    let items = Object.entries(menu)[selected_day][1]
    print(items)
    for (let [category, list] of Object.entries(items)) {
        document.getElementById(category).lastElementChild.innerHTML = list.map(ele => `<div class="item">${ele}</div>`).join("")
    }
}

window.onload = () => {
    if("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js").then(reg => log("Service Worker Registered", "yellow"))
    }
    // new Date().getDay() returns 1 for Monday, 0/7 for Sunday
    selected_day = (new Date().getDay() + 6) % 7
    // Set the current day and select it
    document.querySelector(".day-picker").children[selected_day].classList.add("day-choice--today", "day-choice--selected")
    setup()
    document.querySelectorAll(".day-choice").forEach((day_choice, index) => {
        day_choice.onclick = event => {
            if("vibrate" in navigator) navigator.vibrate(50)

            document.querySelector(".day-choice--selected").classList.remove("day-choice--selected")
            day_choice.classList.add("day-choice--selected")
            selected_day = index
            setup()
        }
    })
}

var menu = {
    "Monday": {
        "B": "Onion Poha",
        "L": "Besan Gatta Gravy, Veg Diwani Handi, Dal Tadka, Rice, Pickle, Chapati, Sweet Lassi, Papad",
        "S": "Vada Pav",
        "D": "Aloo Gobi, Black Chana, Dal, Jeera Rice, Chapati, Rassam, Salad"
    },
    "Tuesday": {
        "B": "Idli Sambar",
        "L": "Punjabi Chole, Aloo Jeera, Lasuni Dal, Rice, Pickle, Puri, Lime Juice, Kheer, Fryums",
        "S": "Bhelpuri",
        "D": "Beans & Carrot, Chawali Masala, Dal Kholapuri, Rice, Chapati, Rassam, Papad"
    },
    "Wednesday": {
        "B": "Aloo Paratha",
        "L": "Soya Masala Gravy, Dal Masala, Cabbage, Rice, Chapati, Pickle, Salad",
        "S": "Masala Sandwich",
        "D": "Chicken Biryani, Paneer Biryani, Kaddu Masala, Dal Lasuni, Rice, Chapati, Pickle, Papad"
    },
    "Thursday": {
        "B": "Upma / Pav Bhaji",
        "L": "Dum Aloo, Methi Malai Matar, Dal Makhani, Jeera Rice, Pickle, Chapati, Butter Milk, Jalebi, Salad",
        "S": "Veg Maggi",
        "D": "Corn Palak, Aloo Matar, Dal Adraki, Veg Pulao, Chapati, Rassam, Green Salad"
    },
    "Friday": {
        "B": "Uttappa / Medhu Wada",
        "L": "Veg Kholapuri Gravy, Rajma Masala, Kaali Masoori Dal, Rice, Pickle, Chapati, Salad",
        "S": "Samosa",
        "D": "Egg / Chicken Masala, Paneer Masala, Dudhi Channa Dry, Dal Tadka, Rice, Pickle, Chapati, Papad"
    },
    "Saturday": {
        "B": "Masala Dosa",
        "L": "White Watana Usal, Aloo Capsicum, Mix Dal, Rice, Pickle, Chapati, Tang, Gulab Jamun, Papad",
        "S": "Dabeli",
        "D": "Veg Jalfrizi, Soya Dry, Rassam, Lemon Rice, Chapati, Dal Fry, Salad"
    },
    "Sunday": {
        "B": "Chole Bhature",
        "L": "Veg Kuram Gravy, Veg Biryani, Dal Fry, Rice, Pickle, Chapati, Veg Raita, Green Salad",
        "S": "Veg Sandwich",
        "D": "Veg Manchurian, Green Peas Gravy, Dal, Veg Fried Rice / Noodles, Pickle, Chapati, Papad"
    }
}

var everyday = {
    "B": "Tea + Coffee, Boiled Egg / Omelette, Bread + Jam, Hot + Cold Milk",
    "L": "",
    "S": "Tea + Coffee",
    "D": ""
}

for(let [day, list] of Object.entries(menu)) {
    for(let [category, items] of Object.entries(menu[day])) {
        items = items.split(", ")
        if(everyday[category] != '') items.push(...everyday[category].split(", "))
        menu[day][category] = items
    }
}