import { useEffect, useState } from "react";
import saladImage from "./../assets/menu/salad.webp";
import appetizersImage from "./../assets/menu/appetizers.webp";
import mainCoursesImage from "./../assets/menu/mainCourse.webp";
import dessertsImage from "./../assets/menu/dessert.webp";
import beveragesImage from "./../assets/menu/beverages.webp";
import bruschetta from "./../assets/menu/appetizers/bruschetta.jpg";
import garlic from "./../assets/menu/appetizers/garlic.jpg";
import mashrooms from "./../assets/menu/appetizers/mashrooms.jpg";
import mozzarella from "./../assets/menu/appetizers/mozzarella.jpg";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description?: string;
  img: string;
}

interface MenuCategory {
  id: number;
  name: string;
  items: MenuItem[];
}

const menuChoices: MenuCategory[] = [
  {
    id: 1,
    name: "Appetizers",
    items: [
      { id: 101, name: "Bruschetta", price: 8, description: "Grilled bread topped with fresh tomatoes, garlic, and basil.", img: bruschetta, },
      { id: 102, name: "Stuffed Mushrooms", price: 10, description: "Grilled bread topped with fresh tomatoes, garlic, and basil.", img: mashrooms, },
      { id: 103, name: "Mozzarella Sticks", price: 7, description: "Grilled bread topped with fresh tomatoes, garlic, and basil.", img: mozzarella, },
      { id: 104, name: "Garlic Bread", price: 5, description: "Grilled bread topped with fresh tomatoes, garlic, and basil.", img: garlic, },
    ],
  },
  {
    id: 2,
    name: "Main Courses",
    items: [
      { id: 201, name: "Grilled Salmon", price: 18, description: "Freshly grilled salmon served with a side of vegetables.", img: mainCoursesImage, },
      { id: 202, name: "Ribeye Steak", price: 25, description: "Juicy ribeye steak cooked to perfection.", img: mainCoursesImage, },
      { id: 203, name: "Chicken Alfredo", price: 15, description: "Creamy Alfredo sauce over tender chicken and pasta.", img: mainCoursesImage, },
      { id: 204, name: "Vegetable Stir Fry", price: 12, description: "A mix of fresh vegetables stir-fried in a savory sauce.", img: mainCoursesImage, },
    ],
  },
  // {
  //   id: 3,
  //   name: "Sides",
  //   items: [
  //     { id: 301, name: "Garlic Mashed Potatoes", price: 5 },
  //     { id: 302, name: "Steamed Asparagus", price: 6 },
  //     { id: 303, name: "Roasted Brussels Sprouts", price: 7 },
  //     { id: 304, name: "Mac and Cheese", price: 8 },
  //     { id: 305, name: "Coleslaw", price: 4 },
  //   ],
  //   img: sidesImage,
  // },
  {
    id: 4,
    name: "Salads",
    items: [
      { id: 401, name: "Caesar Salad", price: 9, description: "Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.",  img: saladImage, },
      { id: 402, name: "Greek Salad", price: 10, description: "A mix of fresh vegetables, feta cheese, and olives.", img: saladImage, },
      { id: 403, name: "Caprese Salad", price: 11, description: "Fresh tomatoes, mozzarella, and basil drizzled with balsamic glaze.", img: saladImage, },
      { id: 404, name: "Garden Salad", price: 8, description: "A variety of fresh garden vegetables with your choice of dressing.", img: saladImage, },
    ],
  },
  {
    id: 5,
    name: "Desserts",
    items: [
      { id: 501, name: "Cheesecake", price: 7, description: "Rich and creamy cheesecake with a graham cracker crust.", img: dessertsImage, },
      { id: 502, name: "Chocolate Lava Cake", price: 8, description: "Warm chocolate cake with a gooey molten center.", img: dessertsImage, },
    ],
  },
  {
    id: 6,
    name: "Beverages",
    items: [
      { id: 601, name: "Coffee", price: 3, description: "Freshly brewed coffee.", img: beveragesImage, },
      { id: 602, name: "Tea", price: 2, description: "A selection of fine teas.", img: beveragesImage, },
      { id: 603, name: "Soda", price: 2, description: "Refreshing carbonated beverages.", img: beveragesImage, },
      { id: 604, name: "Wine", price: 10, description: "A selection of fine wines.", img: beveragesImage, },
      { id: 605, name: "Beer", price: 5, description: "A variety of craft and domestic beers.", img: beveragesImage, },
      { id: 606, name: "Cocktail", price: 12, description: "Expertly crafted cocktails.", img: beveragesImage, },
    ],
  },
];

const Menu = () => {
  const [selected, setSelected] = useState<MenuCategory>(menuChoices[0]);

  return (
    <div className="py-14 sm:py-20 lg:py-28 bg-black/20 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 text-white">
        Menu
      </h1>

      <p className="text-center text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
        Take a look at our freshly prepared dishes. Everything is made daily
        with quality ingredients to satisfy any craving.
      </p>

      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {menuChoices.map((category) => (
          <button
            type="button"
            key={category.id}
            onClick={() => setSelected(category)}
            className={`px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full font-semibold cursor-pointer transition-colors duration-200 ${
              selected.id === category.id
                ? "text-white bg-[#fe6200]"
                : "text-[#fe6200] bg-black/60 hover:bg-[#fe6200]/20"
            } mb-0`}
            aria-pressed={selected.id === category.id}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-10 w-full">
        {selected.items.map((item) => (
            <div
                key={item.id}
                className="w-full sm:w-[calc(100%-20px)] lg:w-[calc(50%-40px)] max-w-150 bg-black/60 rounded-xl flex p-3 items-start justify-center gap-4 sm:h-36"
            >   
                <img
                    src={item.img}
                    alt={item.name}
                    className="w-18 sm:w-30 h-18 sm:h-30 aspect-square object-cover rounded-xl"
                />
                
                <div className="flex items-start justify-between w-full sm:mt-2">
                    <div className="flex flex-col gap-3">
                        <p className="text-white text-base sm:text-lg font-semibold">
                            {item.name}
                        </p>
                        {item.description && (
                            <p className="text-xs sm:text-sm text-white/60">
                                {item.description}
                            </p>
                        )}
                    </div>

                    <span className="text-[#fe6200] text-base sm:text-xl font-bold shrink-0">
                        ${item.price}
                    </span>
                </div>
            </div>
            ))}
      </div>
    </div>
  );
};

export default Menu;
