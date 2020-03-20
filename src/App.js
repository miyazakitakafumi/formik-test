import React from 'react'
import { Field, Form, Formik, useField } from 'formik'
import { TextField, Button } from '@material-ui/core'

const MyField = ({ disabled, ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error + '' : ''

  return (
    <div>
      <TextField
        {...field}
        error={!!errorText}
        helperText={errorText}
        disabled={disabled}
      />
      <div>{errorText}</div>
    </div>
  )
}

const validate = values => {
  const errors = {}

  if (!values.lastName) {
    errors.lastName = '必須項目です'
  } else if (values.lastName.length > 10) {
    errors.lastName = '10文字以下にしてください'
  }

  return errors
}

const App = () => {
  return (
    <div>
      <Formik
        initialValues={{ firstName: '', lastName: '' }}
        validate={validate}
        onSubmit={values => alert(JSON.stringify(values, null, 2))}
      >
        {({ values }) => (
          <Form>
            <Field name={'firstName'} />
            <MyField name={'lastName'} disabled={values.firstName === ''} />
            <Button type="submit">Submit</Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default App
