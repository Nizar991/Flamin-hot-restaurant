// Prices from client menu. PLACEHOLDER = pizza prices (client table unclear) – replace later.
const BIZ = {
  phone: "01422 340300",
  addr: "67 Parkinson Ln, Halifax HX3 0JL",
  links: {
    just: "https://www.just-eat.co.uk/restaurants-flamin-hot-halifax-hx1/menu",
  },
};
const P = (a, b) => [a, b]; // [9", 12"] PLACEHOLDER prices
const MENU = {
  Pizzas: [
    ["La Margherita", "Cheese & tomato", P(4, 5.5), "v"],
    ["Tuna Sweetcorn", "Tuna and sweetcorn", P(4.5, 6)],
    [
      "Sicilian Hot",
      "Spicy beef, onions, peppers, chilli flakes",
      P(4.5, 6),
      "h",
    ],
    [
      "The Green House",
      "Peppers, onions, sweetcorn, mushrooms, mozzarella",
      P(4.5, 6),
      "v",
    ],
    [
      "Punjabi Heat",
      "Tandoori chicken, onions, peppers, green chillies",
      P(5, 6.5),
      "h",
    ],
    [
      "Safari Spice",
      "Peri-peri chicken, onions, peppers, sweetcorn",
      P(5, 6.5),
      "h",
    ],
    ["Smoky BBQ", "BBQ chicken", P(5, 6.5)],
    ["Double Pepperoni", "Extra pepperoni", P(5, 6.5)],
    ["Doner Pizza", "Doner meat with onions", P(5, 6.5)],
    ["Meaty Craze", "Chicken tikka, spicy beef, doner meat", P(5.5, 7)],
    [
      "The Grill Thrill",
      "Chicken steak, onions, peppers, house sauce",
      P(5.5, 7),
    ],
    ["Mexican Heat", "Fresh tomatoes, onions, peppers", P(5.5, 7), "h"],
    ["Salami", "Salami", P(5.5, 7)],
    ["Turkey Ham & Pineapple", "Turkey ham and pineapple", P(5.5, 7)],
    [
      "China Town Pizza",
      "Chinese-style chicken, onions, peppers, sweetcorn",
      P(6, 7.5),
    ],
    [
      "Kashmiri Pizza",
      "Chicken tikka, tikka kebab, onions, peppers, green chillies",
      P(6, 7.5),
      "h",
    ],
    ["British Special", "Meat-topping special", P(6.5, 8)],
    [
      "Flamin Hot House Special",
      "Our special meat combination",
      P(6.5, 8),
      "h",
    ],
  ],
  Burgers: [
    [
      "Big Boy Burger",
      "Chicken fillet, beef patty, mayo, lettuce, chips + drink",
      7,
    ],
    [
      "Classic Fillet Burger",
      "Spicy or regular fillet, mayo, lettuce, chips + drink",
      4,
    ],
    [
      "Fury Burger",
      "Grilled peri-peri fillet, mayo, onions, lettuce, chips + drink",
      5.5,
      "h",
    ],
    ["Roadman Burger", "Beef steak, onions, mayo, lettuce, chips + drink", 4],
    [
      "Towered Up",
      "Chicken fillet, beef burger, mayo, lettuce, chips + drink",
      6,
    ],
    ["Lego Burger", "Chicken steak fillet, onions, mayo, chips + drink", 6.5],
    ["Veg Burger Meal", "Veg burger, lettuce, mayo + drink", 3.5, "v"],
    [
      "Fish Fillet Burger Meal",
      "Fish fillet, lettuce, cheese, ketchup, chips + drink",
      4.5,
    ],
  ],
  Doner: [
    ["Doner in Pitta", "With salad and sauce", 4],
    ["Doner with Salad", "", 3.5],
    ["Doner Meat Tray", "", 3],
    ["Doner + Chips", "", 4],
  ],
  "Box Meals": [
    ["Cheat Box", "Chicken steak burger, chicken steak, doner, fries", 9],
    ["Gym Box", "Chicken steak, beef steak, doner, steak burger, fries", 10],
    ["Boneless Box", "Fillet burger, 3 strips, popcorn chicken, fries", 6],
    ["Chicken Steak + Chips", "Steak box", 7.5],
    ["Beef Steak + Chips", "Steak box", 8.5],
    ["Mixed Steak + Chips", "Steak box", 9.5],
  ],
  "Paninis & Wraps": [
    ..."Tikka,Peri-Peri,Mexican,Tuna Melt,Tandoori,Spicy Beef,BBQ Special"
      .split(",")
      .map((n) => [n + " Panini", "With chips + drink", 4]),
    ..."Classic Chicken,Tandoori Chicken,BBQ,Chinese Chicken,Mexican,Chicken Tikka,Doner"
      .split(",")
      .map((n) => [n + " Wrap", "With chips + drink", 4]),
  ],
  Sides: [
    ["Jalapeño Bites", "6 pcs", 3],
    ["Chilli Cheese Nuggets", "6 pcs", 3],
    ["Mozzarella Sticks", "6 pcs", 3, "v"],
    ["Chicken Nuggets", "6 pcs", 2],
    ["Potato Wedges", "", 2.5, "v"],
    ["Onion Rings", "6 pcs", 2, "v"],
    ["Chicken Popcorn", "", 2],
    ["Chicken Strips", "6 pcs", 3.75],
    ["Garlic Bread with Cheese", "4 pcs", 3.5, "v"],
    ["Cheesy Chips", "", 2.5, "v"],
    ["Medium Fries", "", 1, "v"],
    ["Large Fries", "", 1.5, "v"],
  ],
  Kids: [
    ["Chicken Nuggets Meal", "6 nuggets, chips + drink", 3.5],
    ["Popcorn Chicken Meal", "Chips + drink", 3.5],
    ["Chicken Strips Meal", "3 strips, chips + drink", 3.5],
    ["Fish Fingers", "4 pcs, chips + drink", 3.5],
  ],
  "Shakes & Sweets": [
    ..."Ferrero Rocher,Oreo Cookies,Vanilla,Strawberry,Aero Mint Chocolate,Snickers,Kinder Bueno,Lotus Biscoff,Chocolate,Mango"
      .split(",")
      .map((n) => [n + " Milkshake", "", 5]),
    ["Lindor Milkshake", "", 6],
    ["Cadbury Flake Milkshake", "", 6],
    ["Nutella Milkshake", "", 6],
    ["Chocolate Fudge Cake", "With custard", 3],
    ["Chocolate Pudding", "With custard", 3.5],
    ["Sprinkle Cake", "With custard", 3.5],
    ["Jam Coconut Sponge", "With custard", 3.5],
    ["Matilda Cake", "", 5],
    ["Whippy Cone", "", 1.5],
    ["Whippy Tub", "", 1.5],
    ["Whippy Tray", "", 3],
  ],
  Drinks: [
    ..."Ice Mango,Ice Mojito,Ice Lemon,Ice Orange,Ice Cola,Fruit Shoot,Water Bottle"
      .split(",")
      .map((n) => [n, "", 0.8]),
    ["Vimto", "", 1],
    ["Irn-Bru", "", 1],
    ["Rubicon Can", "", 1],
    ["Large Bottle", "", 2],
  ],
};
const DEALS = [
  ['2 × 12" Pizzas + Fries', "Pick any two 12-inch pizzas", 11],
  ['3 × 12" Pizzas + Fries', "Feed the whole crew", 15],
  [
    "Burger Deal",
    "4 chicken fillet or beef burgers + tray of doner + drink",
    20,
  ],
];
const CRUSTS = [
  ["Plain", 0],
  ["Doner crust", 1],
  ["Seekh kebab crust", 1],
  ["Cheese crust", 1],
];
const REVIEWS = [
  ["Sample review", "Hot, fresh and the portions are huge.", "Customer name"],
  [
    "Sample review",
    "Best doner pizza in Halifax, no question.",
    "Customer name",
  ],
  [
    "Sample review",
    "Quick collection and the staff are lovely.",
    "Customer name",
  ],
];
