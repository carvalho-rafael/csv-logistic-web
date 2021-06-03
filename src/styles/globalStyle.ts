import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
html,
    body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    line-height: 1.2;
    background: #f1f1f1;
    color: #4d4d4d;
}

a {
    color: inherit;
    text-decoration: none;
}

ul {
    list-style: none;
    padding: 0;
}

* {
    box-sizing: border-box;
}
p {
    font-size: 16px;
}
`