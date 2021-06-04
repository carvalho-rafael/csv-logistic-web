import  styled from 'styled-components'
import { InputLabel } from '@material-ui/core'

export const FormContainer = styled.form`
  display: flex;

  label {
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 1rem;
      cursor: pointer;

      span {
      margin-left: .5rem;
    }
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 1rem;
  }
`
