export default ({ criticalCss, hydrateIds, body, title, css, user, js, preload }) => (`
    <!DOCTYPE html>
    <html lang="ru">

    <head>
        <title>${title} – Акигами</title>
        <meta name="theme-color" content="#060606">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        ${css}
        <style type="text/css">
            ${criticalCss}
        </style>
    </head>

    <body data-user=${user}>
        <div id="root">${body}</div>
        ${preload}
        ${js}
        <script>
            window.hydrate = ${hydrateIds}
        </script>
    </body>

    </html>
`).trim();
