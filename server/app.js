const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const ItemTypes = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:1000",
    methods: "GET,PUT,DELETE",
    credentials: true,
  })
);

// In-memory хранилище для объявлений
let items = [
  {
    id: 1,
    name: "Квартира в центре",
    description: "Просторная квартира в центре города",
    location: "Москва",
    type: "Недвижимость",
    propertyType: "Квартира",
    area: 100,
    rooms: 3,
    price: 15000000,
  },
  {
    id: 2,
    name: "Toyota Camry",
    description: "Надежный автомобиль",
    location: "Москва",
    type: "Авто",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    mileage: 15000,
  },
  {
    id: 3,
    name: "Ремонт квартир",
    description: "Качественный ремонт квартир",
    location: "Москва",
    type: "Услуги",
    serviceType: "Ремонт",
    experience: 5,
    cost: 50000,
    workSchedule: "Пн-Пт, 9:00-18:00",
  },
  {
    id: 4,
    name: "Загородный дом",
    description: "Уютный дом за городом",
    location: "Подмосковье",
    type: "Недвижимость",
    propertyType: "Дом",
    area: 200,
    rooms: 5,
    price: 25000000,
  },
  {
    id: 5,
    name: "Honda Civic",
    description: "Экономичный и стильный автомобиль",
    location: "Санкт-Петербург",
    type: "Авто",
    brand: "Honda",
    model: "Civic",
    year: 2018,
    mileage: 30000,
  },
  {
    id: 6,
    name: "Уборка помещений",
    description: "Профессиональная уборка офисов и квартир",
    location: "Москва",
    type: "Услуги",
    serviceType: "Уборка",
    experience: 3,
    cost: 2000,
    workSchedule: "Ежедневно, 8:00-22:00",
  },
  {
    id: 7,
    name: "Офис в бизнес-центре",
    description: "Современный офис в центре города",
    location: "Москва",
    type: "Недвижимость",
    propertyType: "Офис",
    area: 150,
    rooms: 6,
    price: 30000000,
  },
  {
    id: 8,
    name: "BMW X5",
    description: "Премиальный внедорожник",
    location: "Казань",
    type: "Авто",
    brand: "BMW",
    model: "X5",
    year: 2019,
    mileage: 25000,
  },
  {
    id: 9,
    name: "Дизайн интерьера",
    description: "Создание уникального дизайна интерьера",
    location: "Москва",
    type: "Услуги",
    serviceType: "Дизайн",
    experience: 7,
    cost: 100000,
    workSchedule: "Пн-Сб, 10:00-20:00",
  },
  {
    id: 10,
    name: "Квартира в новостройке",
    description: "Современная квартира в новом жилом комплексе",
    location: "Екатеринбург",
    type: "Недвижимость",
    propertyType: "Квартира",
    area: 80,
    rooms: 2,
    price: 8000000,
  },
  {
    id: 11,
    name: "Audi A4",
    description: "Комфортный седан",
    location: "Новосибирск",
    type: "Авто",
    brand: "Audi",
    model: "A4",
    year: 2017,
    mileage: 40000,
  },
  {
    id: 12,
    name: "Установка кондиционеров",
    description: "Установка и обслуживание кондиционеров",
    location: "Москва",
    type: "Услуги",
    serviceType: "Установка",
    experience: 4,
    cost: 15000,
    workSchedule: "Пн-Вс, 9:00-21:00",
  },
  {
    id: 13,
    name: "Таунхаус",
    description: "Современный таунхаус в тихом районе",
    location: "Краснодар",
    type: "Недвижимость",
    propertyType: "Таунхаус",
    area: 120,
    rooms: 4,
    price: 18000000,
  },
  {
    id: 14,
    name: "Volkswagen Golf",
    description: "Компактный и надежный автомобиль",
    location: "Ростов-на-Дону",
    type: "Авто",
    brand: "Volkswagen",
    model: "Golf",
    year: 2016,
    mileage: 50000,
  },
  {
    id: 15,
    name: "Юридические услуги",
    description: "Консультации и сопровождение сделок",
    location: "Москва",
    type: "Услуги",
    serviceType: "Юридические",
    experience: 10,
    cost: 5000,
    workSchedule: "Пн-Пт, 10:00-19:00",
  },
  {
    id: 16,
    name: "Квартира с видом на море",
    description: "Квартира с панорамным видом на море",
    location: "Сочи",
    type: "Недвижимость",
    propertyType: "Квартира",
    area: 90,
    rooms: 2,
    price: 12000000,
  },
  {
    id: 17,
    name: "Mercedes-Benz C-Class",
    description: "Элегантный седан бизнес-класса",
    location: "Москва",
    type: "Авто",
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2021,
    mileage: 10000,
  },
  {
    id: 18,
    name: "Фотосъемка",
    description: "Профессиональная фотосъемка",
    location: "Санкт-Петербург",
    type: "Услуги",
    serviceType: "Фотосъемка",
    experience: 6,
    cost: 8000,
    workSchedule: "По записи",
  },
  {
    id: 19,
    name: "Коттедж в лесу",
    description: "Уединенный коттедж в лесу",
    location: "Ленинградская область",
    type: "Недвижимость",
    propertyType: "Дом",
    area: 250,
    rooms: 6,
    price: 35000000,
  },
  {
    id: 20,
    name: "Hyundai Solaris",
    description: "Популярный седан",
    location: "Воронеж",
    type: "Авто",
    brand: "Hyundai",
    model: "Solaris",
    year: 2015,
    mileage: 60000,
  },
  {
    id: 21,
    name: "Репетиторство",
    description: "Репетитор по математике и физике",
    location: "Москва",
    type: "Услуги",
    serviceType: "Образование",
    experience: 8,
    cost: 1000,
    workSchedule: "Пн-Вс, 14:00-20:00",
  },
  {
    id: 22,
    name: "Офис в стиле лофт",
    description: "Просторный офис в стиле лофт",
    location: "Москва",
    type: "Недвижимость",
    propertyType: "Офис",
    area: 200,
    rooms: 8,
    price: 40000000,
  },
  {
    id: 23,
    name: "Kia Rio",
    description: "Компактный и экономичный автомобиль",
    location: "Самара",
    type: "Авто",
    brand: "Kia",
    model: "Rio",
    year: 2019,
    mileage: 20000,
  },
  {
    id: 24,
    name: "Ремонт бытовой техники",
    description: "Ремонт холодильников, стиральных машин и другой техники",
    location: "Москва",
    type: "Услуги",
    serviceType: "Ремонт",
    experience: 5,
    cost: 3000,
    workSchedule: "Пн-Сб, 10:00-19:00",
  },
  {
    id: 25,
    name: "Квартира в историческом центре",
    description: "Квартира в доме с историей",
    location: "Санкт-Петербург",
    type: "Недвижимость",
    propertyType: "Квартира",
    area: 70,
    rooms: 2,
    price: 10000000,
  },
  {
    id: 26,
    name: "Ford Focus",
    description: "Надежный и практичный автомобиль",
    location: "Нижний Новгород",
    type: "Авто",
    brand: "Ford",
    model: "Focus",
    year: 2017,
    mileage: 35000,
  },
  {
    id: 27,
    name: "Клининг",
    description: "Генеральная уборка помещений",
    location: "Москва",
    type: "Услуги",
    serviceType: "Уборка",
    experience: 4,
    cost: 5000,
    workSchedule: "Ежедневно, 7:00-23:00",
  },
  {
    id: 28,
    name: "Пентхаус",
    description: "Роскошный пентхаус с панорамным видом",
    location: "Москва",
    type: "Недвижимость",
    propertyType: "Квартира",
    area: 300,
    rooms: 5,
    price: 60000000,
  },
  {
    id: 29,
    name: "Chevrolet Cruze",
    description: "Комфортный седан",
    location: "Уфа",
    type: "Авто",
    brand: "Chevrolet",
    model: "Cruze",
    year: 2016,
    mileage: 45000,
  },
  {
    id: 30,
    name: "Ландшафтный дизайн",
    description: "Создание и уход за садами",
    location: "Москва",
    type: "Услуги",
    serviceType: "Дизайн",
    experience: 6,
    cost: 20000,
    workSchedule: "Пн-Пт, 9:00-18:00",
  },
];

const makeCounter = () => {
  let count = 4;
  return () => count++;
};

const itemsIdCounter = makeCounter();

// Создание нового объявления
app.post("/items", (req, res) => {
  const { name, description, location, type, ...rest } = req.body;

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: "Missing required common fields" });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Real estate" });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Auto" });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Services" });
      }
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    ...rest,
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get("/items", (req, res) => {
  res.json(items);
});

// Получение объявления по его id
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Обновление объявления по его id
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Удаление объявления по его id
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.id, 10)
  );
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Item not found");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
