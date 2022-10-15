import { ChangeEvent, FC, useState } from "react";
import { toast } from "react-toastify";
import "./Popup.scss";
import { useAppDispatch } from "../../../../hooks";
import { ITodo } from "../../../../redux/todos/types";
import { editTodo } from "../../../../redux/todos/slice";

type PopupProps = ITodo & {
  isEditModalActive: boolean;
  setIsEditModalActive: (v: boolean) => void;
}

const Popup: FC<PopupProps> = ({ id, title, content, isComplete, isEditModalActive, setIsEditModalActive }) => {
  const dispatch = useAppDispatch();
  const [titleEdit, setTitleEdit] = useState(title);
  const [contentEdit, setContentEdit] = useState(content);

  const onUpdateClick = (obj: ITodo) => dispatch(editTodo(obj));
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitleEdit(e.target.value);
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => setContentEdit(e.target.value);
  const handleSubmit = (e: any, isOk: boolean) => {
    e.preventDefault();
    if (isOk) {
      const updatedTodo: ITodo = {
        id,
        title: titleEdit,
        content: contentEdit,
        isComplete
      };
      onUpdateClick(updatedTodo);
      toast.success("Задача успешно отредактирована!");
    }
    setIsEditModalActive(false);
  };

  return (
    <div className={isEditModalActive ? "pop-up pop-up-show" : "pop-up"}>
      <h4 className="pop-up__title">Редактирование записи</h4>
      <form onSubmit={(e) => handleSubmit(e, true)}>
        <input
          maxLength={50}
          value={titleEdit}
          onChange={onTitleChange}
          type="text"
          className="pop-up__input"
        />
        <textarea
          maxLength={75}
          value={contentEdit}
          onChange={onContentChange}
          className="pop-up__content"
        />
        <div className="pop-up__buttons">
          <button type="submit" className="pop-up__button ok">Сохранить</button>
          <button type="submit" className="pop-up__button no" onClick={(e) => handleSubmit(e, false)}>
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

export default Popup;