
# Realty Summary — Frontend (Vite + React + TS + Tailwind + Effector + FSM)

Фронтенд-проект как отдельный сервис. Структура ориентирована на масштабируемость (Feature-Sliced), Effector для бизнес-логики и небольшой утилитный FSM для предсказуемых сценариев.

## Быстрый старт
```bash
npm i
npm run dev
# или pnpm i && pnpm dev
```

Настройте `.env` (см. `.env.example`):
```env
VITE_API_URL=http://localhost:8787
```

## Структура
- `src/app` — ядро приложения (роутер, layout)
- `src/pages` — страницы: landing, search, developer, complex, compare, tma/shell
- `src/entities` — доменные модули (developer/...)
- `src/features` — независимые фичи (ai-summary/...)
- `src/widgets` — крупные композиции UI (SearchBar и т.д.)
- `src/shared` — общие модули: api-клиент, fsm, типы, env

## Заметки
- Все интеграции с API централизованы в `src/shared/api/client.ts` и в entity/feature `api.ts`.
- Effector-модели расположены рядом с сущностями/фичами.
- TMA-оболочка (`/tma`) использует те же страницы с компактным variant='tma'.
- Tailwind настроен, базовые карточки и отступы добавлены.

---

## 🧩 API (Serverless Functions — Vercel)

Фронтенд проекта развёрнут с Hash-Routing (`/#/...`) и использует встроенные Serverless-функции Vercel для API-запросов.  
На данный момент доступен один эндпоинт для получения данных о застройщиках.

### 🔹 `GET /api/developers`

Возвращает список застройщиков с возможностью фильтрации по текстовому запросу.

#### Параметры запроса
| Параметр | Тип | Обязательный | Описание |
|-----------|------|--------------|-----------|
| `q` | string | ❌ | Поисковый запрос (частичное совпадение по названию, девелоперу или описанию) |

#### Пример запроса
```bash
GET https://2gis.vercel.app/api/developers?q=пик
```

#### Пример ответа
```json
[
  {
    "id": 5,
    "title": "ПИК",
    "image": "/images/developers/pik.png",
    "heading1": "Крупнейший застройщик России",
    "listPositives": [
      "Масштабность проектов",
      "Качество строительства",
      "Разнообразие планировок"
    ],
    "info": [
      {
        "heading": "Качество строительства",
        "description": "Дома от застройщика «ПИК» строятся с использованием современных технологий и материалов."
      }
    ],
    "developer": "ПИК"
  }
]
```

#### Коды ответа
| Код | Описание |
|------|-----------|
| `200 OK` | Успешный ответ с массивом данных |
| `204 No Content` | Нет совпадений по запросу |
| `400 Bad Request` | Некорректный параметр |
| `405 Method Not Allowed` | Неверный HTTP-метод |
| `500 Internal Server Error` | Ошибка на сервере |

#### Примечания
- CORS открыт (`Access-Control-Allow-Origin: *`)
- Поддерживаются методы `GET` и `OPTIONS`
- Данные кешируются на CDN (`Cache-Control: public, max-age=300, s-maxage=300`)
