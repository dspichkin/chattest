Экран разбит на правую и левую половины.
В левой половине два поля: «текст» с кнопкой «отправить» и «фото» с кнопкой «отправить».
В правой половине – прокручиваемое по вертикали безразмерное поле вывода.
При наборе текста в поле «текст» и нажатии «отправить» - он добавляется в правую половину.
При нажатии на «фото» открывается окно выбора файла .jpg, .png, .svg, после выбора, происходит загрузка в поле «фото». При нажатии «отправить» – происходит добавление в поле вывода.
Верстка адаптивная. Браузеры современные. Не должно быть прокрутки самой страницы (дизайн one page). При закрытии информация из поля вывода не должна пропадать.

![screenshot](chat.png?raw=true "screenshot")


Django 1.11/Angular 1.6
Обмен данными через Webscokets

# Запуск бека
`
python manage.py runserver
`

# Сборка фронта
`
ng build --prod --deploy-url /static/
`