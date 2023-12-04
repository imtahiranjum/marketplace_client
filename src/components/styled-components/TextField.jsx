
import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const InputField = styled(TextField)`
  &.MuiFormControl-root {
    margin: 7px 0;
    width: 100%;
    max-width: 480px;
  }

  .MuiFormLabel-root {
    &.Mui-focused {
      color: #2986cc;
    }
  }

  .MuiOutlinedInput-root {
    &:hover {
      .MuiOutlinedInput-notchedOutline {
        border: 1px solid #2986cc;
      }
    }

    &.Mui-focused {
      color: #000;

      .MuiOutlinedInput-notchedOutline {
        border: 1px solid #2986cc;
      }
    }
  }
`;

export default InputField;
