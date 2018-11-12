
import * as utility   from './utility.js';
const formToJSON = ( form ) => {

  let data = {};
  for ( const element of form.elements ) {
    switch ( element.type ) {

      case "text" : {

        data[ element.name ] = element.value;
        break;
      }
      case "date" : {

        //data[ element.name ] = element.value;
        data[ element.name ] = element.value
        

        break;
      }

      case "radio" : {
        if ( element.checked ) {

          data[ element.name ] = element.value;
        }
        break;
      }
      case "select-one" : {

        data[ element.name ] = element.value;
        break;
      }
    }
  }

  console.log(data);
  return data;

};


const JSONToForm = ( form, data ) => {

  for ( const key  in data ) {

    if ( form.elements[ key  ] ) {

        form.elements[ key  ].value = data[ key ];

      }
    }

};

export {
  JSONToForm,
  formToJSON,
};
