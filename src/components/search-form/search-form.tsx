import {Close, SearchOutlined} from '@mui/icons-material';
import {IconButton, TextField, Typography} from '@mui/material';


type ComponentProps = {
  search: string;
  onSetSearch: (search: string) => void;
}

function SearchForm({search, onSetSearch}: ComponentProps): JSX.Element {

  return (
    <>
      <Typography variant="h5" component="h2" sx={{fontWeight: 600, mt: 3, mb: 2}}>
      Search Form
      </Typography>
      <TextField
        fullWidth
        id="standard-bare"
        variant="outlined"
        placeholder="Search..."
        value={search}
        onChange={(evt) => onSetSearch(evt.target.value)}
        InputProps={{
          startAdornment: (
            <IconButton>
              <SearchOutlined />
            </IconButton>
          ),
          endAdornment: (
            <IconButton
              onClick={() => onSetSearch('')}
            >
              <Close />
            </IconButton>
          ),
        }}
        sx={{mb: 2}}
      />
    </>
  );
}

export default SearchForm;
