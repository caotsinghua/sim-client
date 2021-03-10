import { Container } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';

interface FormValues {
  userName: string;
  password: string;
}
const initialValues: FormValues = {
  userName: '',
  password: '',
};
const Login: React.FC = () => {
  return (
    <Container maxWidth="xs" fixed>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = {};
          if (!values.userName) {
            errors.userName = '必须填写用户名';
          }
          if (!values.password) {
            errors.password = '必须填写密码';
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 2000);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Field component={TextField} name="userName" label="用户名" />
            <Field component={TextField} name="password" label="密码" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
