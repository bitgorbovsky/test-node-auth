# НЕ ДЛЯ PRODUCTION ИСПОЛЬЗОВАНИЯ
Данное приложение служит примером nodejs кода для авторизации vk, оно имеет серьёзные уязвимости безопасности, используйте на свой страх и риск

## Как запустить
```
git clone luchanso
cd server-for-igor
npm i

CLIENT_ID=7631725 CLIENT_SECRET=vU5DD40ZBSCf3ZkQXEVB PORT=9090 node index
```
Где CLIENT_ID - ID пртложения CLIENT_SECRET - секрет приложения

## Как использовать
В VK нужно добавить ссылку Адрес сайта http://example.com:9090
Базовый домен: example.com
Доверенный redirect URI: http://example.com:9090/vk

Далее отправлять на
```
https://oauth.vk.com/authorize?client_id=1&display=page&redirect_uri=http://example.com/vk?&group_ids=123456&scope=messages&response_type=code&v=5.124&state=123
```
Где state=123 - некий секретный ключ, для получения доступа к access_token.
Приложение которое хочет получить ключ авторизации должно запросить его по урлу: http://example.com:9090/get-auth?state=123, где state - секретный ключ из запроса выше.
Ключ доступен в течении 30 минут.
