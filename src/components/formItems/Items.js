import React from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../InputFields/Input';
import Button from '../Buttons/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
  } from '../util/validator';
import { useForm } from '../hooks/form-hook';
import { useHttpClient } from '../hooks/http-hook';
import './Items';
import Card from '../UIElements/Card';

const FormPage = () => {
  const { sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      age: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://fakeapi.jsonparseronline.com/posts',
        'POST',
        JSON.stringify({
            name: formState.inputs.name.value,
            age: formState.inputs.age.value,
          address: formState.inputs.address.value,
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
    <div className="container">
      <Card>

      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        
        <Input
          id="age"
          element="input"
          label="Age"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="textarea"
          label="Address"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
      </Card>
      </div>
    </React.Fragment>
  );
};

export default FormPage;
