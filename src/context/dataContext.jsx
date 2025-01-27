import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [categorys, setCategorys] = useState([]);

  const addCategorys = (data) => setCategorys(data);
  const addQuestions = (data) => setQuestions(data);

  return (
    <DataContext.Provider value={{ questions, categorys, addQuestions, addCategorys }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
