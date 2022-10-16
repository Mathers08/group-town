import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import '../../components/News/News.scss';
import { Options } from "easymde";

const NewsEditor = () => {
  const imageUrl = '';
  const [value, setValue] = React.useState('');

  const handleChangeFile = () => {
  };

  const onClickRemoveImage = () => {
  };

  const onChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    } as Options),
    [],
  );

  return (
    <Paper sx={{ p: '30px' }}>
      <Button variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} hidden/>
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className="image" src={`http://localhost:4444${imageUrl}`} alt="Uploaded"/>
      )}
      <br/>
      <br/>
      <TextField
        classes={{ root: 'title' }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField classes={{ root: 'tags' }} variant="standard" placeholder="Тэги" fullWidth/>
      <SimpleMDE className="editor" value={value} onChange={onChange} options={options}/>
      <div className="buttons">
        <Button size="large" variant="contained">
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};

export default NewsEditor;
