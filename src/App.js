import React from 'react'
import { Form, Formik, useField } from 'formik'
import { TextField, Button } from '@material-ui/core'

// このコンポーネントでonChange時の動作を実行時に変更したい
// convertTargetValue で e.target.value の値を変更する
// changeCb でonChange後の後処理を追加(いらないかもしれない。やるとしたら他でやる)
const MyTextField = ({
  disabled,
  convertTargetValue = undefined,
  changeCb = undefined,
  ...props
}) => {
  const [field, meta, helper] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error + '' : ''

  return (
    <div>
      <TextField
        {...field}
        error={!!errorText}
        helperText={errorText}
        disabled={disabled}
        onChange={e => {
          if (convertTargetValue !== undefined) {
            helper.setValue(convertTargetValue(e.target.value))
          } else {
            helper.setValue(e.target.value)
          }

          if (changeCb) changeCb(e.target.value)
        }}
      />
    </div>
  )
}

// Formikのfield,metaと、disabled, onCustomChangeを受け取る
const TxtField = ({ field, meta, disabled, onCustomChange }) => {
  const errorText = meta.error && meta.touched ? meta.error + '' : ''

  return (
    <div>
      <TextField
        {...field}
        error={!!errorText}
        helperText={errorText}
        disabled={disabled}
        onChange={onCustomChange || field.onChange}
      />
    </div>
  )
}

const AddButton = ({ increment, ...props }) => {
  const [helpers] = useField(props)

  return (
    <Button onClick={() => helpers.setValue(increment)}>ADD {increment}</Button>
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
        initialValues={{ firstName: '', lastName: '', count: 0 }}
        validate={validate}
        onSubmit={values => alert(JSON.stringify(values, null, 2))}
      >
        {({ values }) => (
          <Form>
            <MyTextField
              name={'firstName'}
              changeCb={result => console.log(result)}
            />
            <MyTextField
              name={'lastName'}
              disabled={values.firstName === ''}
              convertTargetValue={str => (str === 'a' ? '100' : str)}
            />
            <AddButton name="count" increment={5} />
            <AddButton name="count" increment={10} />
            <AddButton name="count" increment={15} />
            <Button type="submit">Submit</Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default App
