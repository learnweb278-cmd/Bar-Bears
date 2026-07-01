/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, SEOMeta } from '../types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Appetizers
  {
    id: "app-01",
    category: "Appetizers",
    name: "Clucking Tenders",
    price_pkr: 890,
    is_signature: false,
    description: "Crispy golden hand-breaded chicken tenders served with our signature honey-mustard dipping sauce."
  },
  {
    id: "app-02",
    category: "Appetizers",
    name: "Plain Fries",
    price_pkr: 350,
    is_signature: false,
    description: "Classic golden-cut french fries, salted to perfection and served crisp."
  },
  {
    id: "app-03",
    category: "Appetizers",
    name: "Stacked Fries (Loaded Fries)",
    price_pkr: 999,
    is_signature: true,
    description: "Crisp fries smothered in gourmet melted cheese, chopped tenders, jalapeños, and drizzles of animal sauce."
  },
  {
    id: "app-04",
    category: "Appetizers",
    name: "Thai-Korean Wings",
    price_pkr: 770,
    is_signature: true,
    description: "Jumbo chicken wings tossed in a sweet, sticky, and mildly spicy Thai-Korean glaze topped with white sesame."
  },
  {
    id: "app-05",
    category: "Appetizers",
    name: "Volcanic Prawns",
    price_pkr: 980,
    is_signature: false,
    description: "Crispy fried prawns tossed in our sweet and fiery volcanic dynamite sauce on a bed of fresh cabbage."
  },

  // Burgers & Sandwiches
  {
    id: "brg-01",
    category: "Burgers & Sandwiches",
    name: "Bears Club Sandwich",
    price_pkr: 999,
    is_signature: false,
    description: "A triple-decker classic layered with grilled chicken breast, smoked turkey, fried egg, cheese, lettuce, and premium aioli."
  },
  {
    id: "brg-02",
    category: "Burgers & Sandwiches",
    name: "Chicken Cheese Sandwich",
    price_pkr: 1050,
    is_signature: false,
    description: "Warm shredded chicken tossed in creamy herb sauce, layered with melted cheddar and mozzarella in a toasted sourdough slice."
  },
  {
    id: "brg-03",
    category: "Burgers & Sandwiches",
    name: "Fried Chicken Burger",
    price_pkr: 950,
    is_signature: false,
    description: "Crispy buttermilk fried chicken breast, tangy pickles, fresh lettuce, and our classic burger sauce on a toasted brioche bun."
  },
  {
    id: "brg-04",
    category: "Burgers & Sandwiches",
    name: "Korean Burger",
    price_pkr: 1050,
    is_signature: false,
    description: "Crispy fried chicken drenched in sweet & spicy Gochujang glaze, topped with refreshing kimchi slaw on toasted brioche."
  },
  {
    id: "brg-05",
    category: "Burgers & Sandwiches",
    name: "Mediterranean Grill Burger",
    price_pkr: 995,
    is_signature: false,
    description: "Herbed flame-grilled chicken breast, melted feta-infused cream cheese, roasted bell peppers, and fresh rocket."
  },
  {
    id: "brg-06",
    category: "Burgers & Sandwiches",
    name: "Mushroom Beef Burger",
    price_pkr: 1199,
    is_signature: true,
    description: "Juicy smashed beef patty, rich swiss cheese, and a lavish heap of savory sautéed wild mushrooms with truffle aioli."
  },
  {
    id: "brg-07",
    category: "Burgers & Sandwiches",
    name: "Nashville Burger",
    price_pkr: 1050,
    is_signature: true,
    description: "Fierce hot-dipped Nashville crispy chicken breast, cool creamy coleslaw, and sweet pickles to balance the flame."
  },
  {
    id: "brg-08",
    category: "Burgers & Sandwiches",
    name: "O My Crunch Burger",
    price_pkr: 1049,
    is_signature: false,
    description: "Ultra-crispy double-crusted chicken fillet, double cheese, and crunch rings drenched in our signature creamy burger sauce."
  },
  {
    id: "brg-09",
    category: "Burgers & Sandwiches",
    name: "Panini Special",
    price_pkr: 1050,
    is_signature: false,
    description: "Pressed Italian panini stuffed with grilled chicken, fresh pesto, sun-dried tomatoes, and pull-apart melted mozzarella."
  },
  {
    id: "brg-10",
    category: "Burgers & Sandwiches",
    name: "Philly Masterpiece",
    price_pkr: 1199,
    is_signature: true,
    description: "Tender shaved beef steak sautéed with onions and bell peppers, smothered in melted provolone on a toasted hoagie."
  },
  {
    id: "brg-11",
    category: "Burgers & Sandwiches",
    name: "Smashed Beef Royale",
    price_pkr: 1195,
    is_signature: true,
    description: "Double smashed premium Angus beef patties, caramelized onions, double cheddar, and secret Royale sauce in toasted brioche."
  },

  // Wraps
  {
    id: "wrp-01",
    category: "Wraps",
    name: "Chipotle Fiesta",
    price_pkr: 750,
    is_signature: false,
    description: "Grilled chicken, black beans, sweetcorn, lettuce, and a smoky chipotle southwest cream rolled in a soft flour tortilla."
  },
  {
    id: "wrp-02",
    category: "Wraps",
    name: "Firecracker Wrap",
    price_pkr: 650,
    is_signature: true,
    description: "Crispy chicken tenders tossed in a spicy, exploding firecracker sauce, rolled with crunchy julienned veggies and jalapeños."
  },
  {
    id: "wrp-03",
    category: "Wraps",
    name: "Mayo Madness",
    price_pkr: 750,
    is_signature: false,
    description: "Golden chicken tenders, rich garlic mayo, shredded lettuce, and melted cheese slices in a perfectly toasted wrap."
  },
  {
    id: "wrp-04",
    category: "Wraps",
    name: "Volcanic Chicken Wrap",
    price_pkr: 650,
    is_signature: true,
    description: "Tenders tossed in spicy volcanic glaze, folded with cheddar, shredded cabbage, and dynamic house sauce."
  },

  // Chicken Main Course
  {
    id: "chk-01",
    category: "Chicken Main Course",
    name: "Honey Mustard Chicken",
    price_pkr: 1750,
    is_signature: false,
    description: "Pan-seared chicken fillets simmered in a silky sweet-savory honey mustard sauce, served with roasted veggies."
  },
  {
    id: "chk-02",
    category: "Chicken Main Course",
    name: "Jalapeño Inferno Chicken",
    price_pkr: 1850,
    is_signature: false,
    description: "Grilled chicken steaks topped with a creamy and fiery jalapeño sauce, accompanied by garlic rice or mashed potatoes."
  },
  {
    id: "chk-03",
    category: "Chicken Main Course",
    name: "Marrakech Delight",
    price_pkr: 1850,
    is_signature: false,
    description: "Exotic Moroccan spiced chicken breast grilled over flame, served with herb-scented rice and direct Mediterranean salsa."
  },
  {
    id: "chk-04",
    category: "Chicken Main Course",
    name: "Mexican Chicken",
    price_pkr: 1850,
    is_signature: false,
    description: "Sizzling grilled chicken breast topped with a vibrant spicy Mexican salsa, sweetcorn, and melted monterey jack cheese."
  },
  {
    id: "chk-05",
    category: "Chicken Main Course",
    name: "Mushroom Masterpiece",
    price_pkr: 1850,
    is_signature: false,
    description: "Two prime grilled chicken steaks bathed in an intensely rich wild forest mushroom cream sauce with mash."
  },
  {
    id: "chk-06",
    category: "Chicken Main Course",
    name: "Mushroom Roulade",
    price_pkr: 1650,
    is_signature: false,
    description: "Tender chicken breast stuffed with mushrooms and spinach, rolled and roasted, served sliced over creamy white sauce."
  },
  {
    id: "chk-07",
    category: "Chicken Main Course",
    name: "Oxford Chicken",
    price_pkr: 1649,
    is_signature: true,
    description: "Elegant pan-fried stuffed chicken with cheese and smoked turkey, drizzled with a secret Oxford style white grape cream reduction."
  },
  {
    id: "chk-08",
    category: "Chicken Main Course",
    name: "Parmesan Stuffed Chicken",
    price_pkr: 1850,
    is_signature: false,
    description: "Crispy golden breast stuffed with mozzarella and herbs, encrusted with aged parmesan, served over marinara and fettuccine."
  },

  // Beef Steaks
  {
    id: "stk-01",
    category: "Beef Steaks",
    name: "Mexican Beef Steak",
    price_pkr: 2150,
    is_signature: false,
    description: "Flame-grilled premium beef steak with a tangy and spicy Mexican herb salsa, served with sautéed vegetables."
  },
  {
    id: "stk-02",
    category: "Beef Steaks",
    name: "Mushroom Maestreo Steak",
    price_pkr: 2150,
    is_signature: false,
    description: "Juicy beef undercut grilled to your preference, topped with an exquisite, velvety wild mushroom gravy."
  },
  {
    id: "stk-03",
    category: "Beef Steaks",
    name: "Peppered Passion Steak",
    price_pkr: 1850,
    is_signature: false,
    description: "Classic tender beef steak crusted with crushed black peppercorns and bathed in a premium fiery pepper reduction."
  },
  {
    id: "stk-04",
    category: "Beef Steaks",
    name: "Rib Eye Steak",
    price_pkr: 3199,
    is_signature: true,
    description: "Exquisite heavily marbled Rib Eye cut, char-broiled to render fat perfectly. Served with gourmet herb butter and mash."
  },
  {
    id: "stk-05",
    category: "Beef Steaks",
    name: "T-Bone Steak",
    price_pkr: 3499,
    is_signature: true,
    description: "A colossal king's cut of prime beef showcasing both the tenderloin and strip on the bone, flame-seared."
  },
  {
    id: "stk-06",
    category: "Beef Steaks",
    name: "Tomahawk Steak",
    price_pkr: 3899,
    is_signature: true,
    description: "Our crowning glory: massive bone-in ribeye, flame-kissed, seasoned with coarse sea salt and served with premium sides."
  },

  // Chinese / Rice
  {
    id: "chn-01",
    category: "Chinese / Rice",
    name: "Chicken Chilli Dry",
    price_pkr: 1230,
    is_signature: false,
    description: "Wok-fried sliced chicken with green chillies, ginger, and garlic in our signature dark savory glaze. Served with egg fried rice."
  },
  {
    id: "chn-02",
    category: "Chinese / Rice",
    name: "Chilli Beef Delight",
    price_pkr: 1430,
    is_signature: false,
    description: "Tender beef strips stir-fried with hot chillies and spring onions in a caramelized soy reduction. Served with steamed rice."
  },
  {
    id: "chn-03",
    category: "Chinese / Rice",
    name: "Mongolian Maverick",
    price_pkr: 1250,
    is_signature: false,
    description: "Crispy wok-tossed chicken in a rich, sweet, and savory Mongolian hoisin sauce, sprinkled with scallions."
  },
  {
    id: "chn-04",
    category: "Chinese / Rice",
    name: "Szechwan Chicken",
    price_pkr: 1230,
    is_signature: false,
    description: "Spicy and numbing stir-fry with Szechwan peppercorns, roasted peanuts, and bell peppers in a fiery red chili paste."
  },

  // Pasta & Italian
  {
    id: "pst-01",
    category: "Pasta & Italian",
    name: "Beef Boneless Pasta",
    price_pkr: 1199,
    is_signature: false,
    description: "Succulent strips of beef medallions sautéed with penne in a rich, velvety tomato cream rosa sauce."
  },
  {
    id: "pst-02",
    category: "Pasta & Italian",
    name: "Fettuccine Alla Alfredo",
    price_pkr: 1050,
    is_signature: false,
    description: "Flat fettuccine ribbons tossed in a decadent butter, garlic, and heavy cream reduction with grilled chicken slices."
  },
  {
    id: "pst-03",
    category: "Pasta & Italian",
    name: "Lasagne",
    price_pkr: 1490,
    is_signature: true,
    description: "Classic oven-baked layers of pasta sheet, slow-simmered bolognese meat sauce, rich bechamel, and bubbled mozzarella."
  },
  {
    id: "pst-04",
    category: "Pasta & Italian",
    name: "Mac N Cheese Deluxe",
    price_pkr: 1199,
    is_signature: true,
    description: "Classic macaroni baked in an exceptionally rich five-cheese blend, topped with crispy garlic breadcrumb crust."
  },
  {
    id: "pst-05",
    category: "Pasta & Italian",
    name: "Seafood Symphony",
    price_pkr: 1730,
    is_signature: true,
    description: "A luxurious ocean melody of pan-seared prawns and fish tossed with spaghetti in a rich garlic white wine cream."
  },
  {
    id: "pst-06",
    category: "Pasta & Italian",
    name: "Tuscan Temptation Pasta",
    price_pkr: 1199,
    is_signature: false,
    description: "Penne pasta tossed in an aromatic Tuscan cream with sun-dried tomatoes, baby spinach, and grilled chicken breast."
  },

  // Fish
  {
    id: "fsh-01",
    category: "Fish",
    name: "Fish & Chips",
    price_pkr: 1730,
    is_signature: false,
    description: "Flaky British-style beer-battered sole fillet fried to a golden crunch, served with steak fries and tangy tartar sauce."
  },
  {
    id: "fsh-02",
    category: "Fish",
    name: "Red Wine Creamy Fish",
    price_pkr: 1730,
    is_signature: false,
    description: "Pan-seared fish steak bathed in a delicate, sophisticated grape and tarragon white-cream reduction."
  },

  // Noodles
  {
    id: "ndl-01",
    category: "Noodles",
    name: "Yaki Odon Frenzy / Tokyo Twirl",
    price_pkr: 1150,
    is_signature: false,
    description: "Thick udon noodles stir-fried in a rich sweet-savory dark soy reduction with fresh cabbage, shiitake, and tender chicken."
  },

  // Salads
  {
    id: "sld-01",
    category: "Salads",
    name: "Classic Green Salad",
    price_pkr: 749,
    is_signature: false,
    description: "Crispy garden lettuce, cherry tomatoes, cucumbers, and black olives tossed in a zesty, light vinaigrette."
  },

  // Soups
  {
    id: "sop-01",
    category: "Soups",
    name: "Chicken Leek Delight",
    price_pkr: 300,
    is_signature: false,
    description: "A clean, comforting broth featuring shredded chicken breast, sautéed sweet leeks, and a hint of fresh herbs."
  },
  {
    id: "sop-02",
    category: "Soups",
    name: "Creamy Mushroom Broth",
    price_pkr: 350,
    is_signature: false,
    description: "A rich, pureed cream broth packed with earth-roasted wild button mushrooms and drizzled with white truffle oil."
  },

  // Beverages
  {
    id: "bev-01",
    category: "Beverages",
    name: "Cola Tin",
    price_pkr: 210,
    is_signature: false,
    description: "Refreshing cold Coca-Cola can to cleanse your palate."
  },
  {
    id: "bev-02",
    category: "Beverages",
    name: "Diet Cola Tin",
    price_pkr: 230,
    is_signature: false,
    description: "Chilled Diet Coke can for a sugar-free refreshment."
  },
  {
    id: "bev-03",
    category: "Beverages",
    name: "Fanta / Mountain Dew Tin",
    price_pkr: 210,
    is_signature: false,
    description: "Fizzy fruit-flavored Fanta or sweet citrus Mountain Dew tin."
  },
  {
    id: "bev-04",
    category: "Beverages",
    name: "Sprite Tin",
    price_pkr: 210,
    is_signature: false,
    description: "Crisp, cold lemon-lime Sprite can."
  },
  {
    id: "bev-05",
    category: "Beverages",
    name: "Diet Sprite Tin",
    price_pkr: 250,
    is_signature: false,
    description: "Sugar-free carbonated lemon-lime Sprite Zero tin."
  },
  {
    id: "bev-06",
    category: "Beverages",
    name: "Mineral Water",
    price_pkr: 150,
    is_signature: false,
    description: "Pure, chilled natural spring water bottle."
  }
];

export const INITIAL_SEO_METAS: Record<string, SEOMeta> = {
  home: {
    seoTitle: "The Bar Bears Multan | Premium Dining, Coffee & Cafe Concept",
    metaDescription: "Experience Multan's finest food curation, steak cuts, smashed burgers, and premium cafe culture. Book your exclusive table now at The Bar Bears.",
    focusKeyword: "The Bar Bears Multan",
    keywords: "The Bar Bears, Multan cafe, Multan dining, table reservation Multan, best burgers Multan, fine dining Multan"
  },
  menu: {
    seoTitle: "Gourmet Curation Menu | The Bar Bears Multan",
    metaDescription: "Explore our rich culinary collection. From signature Rib Eye Steaks to Smashed Beef Royales, browse our curated items and reserve a table today.",
    focusKeyword: "Gourmet Curation Menu",
    keywords: "The Bar Bears menu, Multan steaks, loaded fries, pasta Multan, food curation Multan"
  }
};
