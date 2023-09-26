import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Item } from "./components/Item";
import addProduct from "./actions/addProduct";
import { Product } from "./reducers/reduxReducer";

const App: React.FC = () => {
   const [captionValue, setCaptionValue] = useState('');
   const [amountValue, setAmountValue] = useState('');
   const productList = useSelector((state: { products: Product[] }) => state.products);
   const dispatch = useDispatch();

   const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const parsedAmount = parseFloat(amountValue);

      if (!isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= 1000) {
         dispatch(addProduct({
            id: Date.now(),
            caption: captionValue,
            amount: parsedAmount,
         })
         );

         setCaptionValue('');
         setAmountValue('');
      } else {
         alert('Please enter a valid positive number for amount.');
      }
   };

   return (
      <div className="wrapper">
         <h1 className="products">Список покупок</h1>
         <form className="form" onSubmit={handleFormSubmit}>
            <div className="form__caption">
               <label htmlFor="caption">Caption:</label>
               <input
                  type="text"
                  id="caption"
                  value={captionValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCaptionValue(e.target.value)}
                  required />
            </div>
            <div className="form__amount">
               <label htmlFor="amount">Amount:</label>
               <input
                  type="number"
                  id="amount"
                  value={amountValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAmountValue(e.target.value)}
                  required />
            </div>
            <button type="submit" className="form__btn">Add</button>
         </form>
         <ul className="products-list">
            {productList.map(({ caption, amount, id }) => (
               <Item caption={caption} amount={amount} id={id} key={id} />
            ))}
         </ul>
      </div>
   );
}

export default App;
