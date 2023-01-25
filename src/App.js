import React, {useEffect, useState} from 'react';
import './index.scss';
import Collection from "./components/Collection";

const nameCategory = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
]

function App() {
    const [collections, setCollections]= useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [categoryId, setCategoryId]  = useState(0);

    useEffect(() => {
        fetch(`https://63d0e0eed5f0fa7fbdbf1cbf.mockapi.io/collection-photo?${categoryId ? `category=${categoryId}` : ''}`)
            .then(res=>res.json())
            .then(json => {
                setCollections(json)
                console.log(json)
            })
            .catch(err => {
                console.warn(err)
                alert('Ошибка при получении данных')
            });
    }, [categoryId])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {nameCategory.map((obj,i) =>
                <li
                    key={i}
                    onClick={()=>setCategoryId(i)}
                    className={categoryId === i ? 'active' : ''}
                >
                    {obj.name}
                </li>
            )}
        </ul>
        <input
            className="search-input"
            placeholder="Поиск по названию"
            value={searchValue}
            onChange={(e)=> setSearchValue(e.target.value)}
        />
      </div>
      <div className="content">
          {
              collections.filter(obj =>obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((obj, index) => (
                  <Collection
                      key = {index}
                      name={obj.name}
                      images={obj.photos}
                  />
              ))
          }
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
