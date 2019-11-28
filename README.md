# react-bootstrap-input

This package provides a simple yet powerful input component with the following features:

-   pattern-based validation
-   form-group validation
-   data-binding
-   input-masks and formatting

[GitHub code](https://carlosaccone.github.io/react-bootstrap-input/)
[Working demo on GitHub Pages](https://carlosaccone.github.io/react-bootstrap-input/)

## basics

Install and include:

```
npm install react-bootstrap-input

import { SimpleInput } from 'react-bootstrap-input';
```

Create a host component representing your form (a filter form in this example), then place in the render function a few input fields:

```
<SimpleInput
    formObj={filter}
    name="email"
    placeholder="Your email"
    onChange={filterChange}
    required
    validated
    pattern={'^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'}
    errorMessage="Please provide a valid email address"
/>
```

Provide the data-variable representing your form and the change function:

```
const [filter, setfilter] = useState({});
const filterChange = updatedItem => {
    setfilter(updatedItem);
};
```

add the required styles (jss version will be published soon!)

```
<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossOrigin="anonymous"
/>

```

Enjoy!
![demo](./public/react-bootstrap-input.gif)
