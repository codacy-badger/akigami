export default ({ body, title, css, js }) => (`
    <!DOCTYPE html>
    <html lang="ru">

    <head>
        <title>${title}</title>
        <meta name="theme-color" content="#060606">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        ${css}
    </head>

    <body>
        <div id="root">${body}</div>
        ${js}
    </body>

    </html>
`);
