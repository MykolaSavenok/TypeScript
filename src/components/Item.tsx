import React, { useState } from "react";
import { useDispatch } from "react-redux";
import removeProduct from "../actions/removeProduct";
import editProduct from "../actions/editProduct";

interface ItemProps {
   caption: string;
   amount: number;
   id: number;
}

export const Item: React.FC<ItemProps> = ({ caption, amount, id }) => {
   const [isEditMode, setEditMode] = useState(false);
   const [captionText, setCaptionText] = useState(caption);
   const [amountValue, setAmountValue] = useState(amount);
   const dispatch = useDispatch();

   const deleteHandler = () => {
      dispatch(removeProduct({ id }));
   };

   const editHandler = () => {
      setEditMode(!isEditMode);

      if (isEditMode) {
         dispatch(
            editProduct({
               id,
               caption: captionText,
               amount: amountValue,
            })
         );
      }
   };

   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;

      if (name === "caption") {
         setCaptionText(value);
      } else if (name === "amount") {
         setAmountValue(parseFloat(value));
      }
   };

   return (
      <li className="product-list">
         <div className="product-list__caption">
            {isEditMode ? (
               <input
                  type="text"
                  onChange={changeHandler}
                  value={captionText}
                  className="product-list__input"
                  name="caption"
               />
            ) : (
               <span>{captionText.trim()} </span>
            )}
         </div>
         <div className="product-list__amount">
            {isEditMode ? (
               <input
                  type="number"
                  onChange={changeHandler}
                  value={amountValue}
                  className="product-list__input"
                  name="amount"
               />
            ) : (
               <span>{amountValue}</span>
            )}
         </div>
         <div className="product-list__controls">
            <button className="product-list__button" onClick={editHandler}>
               {isEditMode ? "Save" : "Edit"}
            </button>
            <button className="product-list__button" onClick={deleteHandler}>
               X
            </button>
         </div>
      </li>
   );
};
