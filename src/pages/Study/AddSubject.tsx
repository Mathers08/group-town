import React, { ChangeEvent, FormEvent, useState } from "react";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useAppDispatch } from "../../hooks";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import './AddSubject.scss';
import { addDiscipline } from "../../redux/performance/slice";
import { IDiscipline } from "../../redux/performance/types";

const AddSubject = () => {
  const dispatch = useAppDispatch();
  const marks = ['2', '3', '4', '5'];
  const types = ['Экзамен', 'Зачет', 'Дифференцированный зачет'];
  const [selectedMarkOption, setSelectedMarkOption] = useState(marks[0]);
  const [selectedTypeOption, setSelectedTypeOption] = useState(types[0]);
  const [subjectInputs, setSubjectInputs] = useState({
    name: '',
    lecturer: '',
    date: '',
  });

  const onSubjectInputsChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setSubjectInputs(form => ({
      ...form,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem: IDiscipline = {
      ...subjectInputs,
      mark: selectedMarkOption,
      type: selectedTypeOption
    };
    if (subjectInputs.name.trim() && subjectInputs.lecturer.trim() && subjectInputs.date.trim()) {
      dispatch(addDiscipline(newItem));
    } else {
      e.preventDefault();
      toast.error('Пожалуйста, заполните все поля!');
    }
  };

  return (
    <div className="addSubject">
      <ToastContainer/>
      <div className="addSubject__title">
        <TextSnippetIcon/>
        <h2 className="addSubject__title-text">Напишите информацию о предмете</h2>
      </div>
      <form onSubmit={handleSubmit} className="addSubject__inputs">
        <input
          value={subjectInputs.name}
          onChange={(e) => onSubjectInputsChange(e, 'name')}
          className="subject-input"
          type="text"
          placeholder="Укажите название предмета"
        />
        <input
          value={subjectInputs.lecturer}
          onChange={(e) => onSubjectInputsChange(e, 'lecturer')}
          className="subject-input"
          type="text"
          placeholder="Укажите имя преподавателя"
        />
        <input
          value={subjectInputs.date}
          onChange={(e) => onSubjectInputsChange(e, 'date')}
          className="subject-input"
          type="text"
          placeholder="Укажите дату"
        />

        <div className="formGroup">
          <form action="">
            <h4 className="formGroup-title">Выберите оценку:</h4>
            {marks.map(mark => (
              <label className="formGroup-control">
                <input
                  type="radio" name="radio" value={mark}
                  onChange={(e) => setSelectedMarkOption(e.target.value)}
                  checked={selectedMarkOption === mark}
                />
                {mark}
              </label>
            ))}
          </form>
          <form action="">
            <h4 className="formGroup-title">Выберите тип:</h4>
            {types.map(type => (
              <label className="formGroup-control">
                <input
                  type="radio" name="radio" value={type}
                  onChange={(e) => setSelectedTypeOption(e.target.value)}
                  checked={selectedTypeOption === type}
                />
                {type}
              </label>
            ))}
          </form>
        </div>
        <Button type="submit" color="inherit" variant="outlined" sx={{ width: 200, m: '0 auto' }}>
          Добавить предмет
        </Button>
      </form>
    </div>
  );
};

export default AddSubject;