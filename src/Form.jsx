import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import close from '../src/assets/close.svg'
const Form = () => {
    const navigate = useNavigate()
    const [imgs, setImg] = useState('')
    const [ingrimg, setIngrImg] = useState('')
    const [color, setColor] = useState([])
    const [all, setAll] = useState([])
    const [ingredient, setIngredient] = useState([])
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [size, setSize] = useState('')
    const [price, setPrice] = useState('')
    const [country, setCountry] = useState('')
    const [material, setMaterial] = useState('')
    const [person, setPerson] = useState('0')
    const [season, setSeason] = useState('0')
    const [editCLass, setEditClass] = useState('yellowed')
    console.log(all);
    const sendPost = async () => {
        setTimeout(() => {
            setEditClass('yellowed')
        }, 1500);
        if (all.length > 0 && ingredient.length > 0 && name.length > 0 && category.length > 0 && description.length > 0 && size.length > 0 && price.length > 0 && country.length > 0 && material.length > 0) {
            const { data } = await axios.post('https://660a59950f324a9a2884bb7c.mockapi.io/data/category', {
                name: name,
                category: category,
                img: all,
                ingredients: ingredient,
                description: description,
                price: price,
                country: country,
                color: color,
                width: size.split(' '),
                material: material,
                person: person,
                season: season,
                count:0
            })
            setEditClass('success')
        }
        else {
            setEditClass('wrong')
        }
    }
    const delColor = (id) => {
        setColor(color.filter((el, index) => index !== id))
    }
    console.log(color);
    const arrNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    console.log(season);

    return (
        <div>
            <button className='back' onClick={() => navigate(-1)}>Назад</button>
            <div>
                <div className='input-add-data'>
                    <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Название товара' />
                    <input type="text" onChange={(e) => setCategory(e.target.value)} placeholder='Категория товара' />
                    <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder='Описание' />
                    <input type="text" onChange={(e) => setCountry(e.target.value)} placeholder='Страна производства' />
                    <input type="text" onChange={(e) => setMaterial(e.target.value)} placeholder='Ткань' />
                    <input type="text" onChange={(e) => setPrice(e.target.value)} placeholder='Цена' />
                    <input type="text" onChange={(e) => setSize(e.target.value)} placeholder='Размеры товара пожалуйста пишите размеры с пробелом' />
                </div>
                <div className='season-form-male'>
                    <div>
                        <p>Выберите 0 если ваш товар унисекс,</p>
                        <p>Выберите 1 если ваш товар мужской,</p>
                        <p>Выберите 2 если ваш товар женский</p>
                    </div>
                    <select onChange={(e) => setPerson(e.target.value)} name="" id="">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div className='season-form'>
                    <p>Выберите цифру это нам поможет для активного фильтрации</p>
                    <select onChange={(e) => setSeason(e.target.value)} name="" id="">
                        {arrNumber.map(el => (
                            <option key={el} value={el}>{el}</option>
                        ))}
                    </select>
                </div>
                <div className='change-color'>
                    <label>Выбирайте цвет своего товара</label>
                    <input onChange={(e) => {
                        const color = e.target.value
                        setColor(prev => [...prev, color])
                    }} type="color" />
                </div>
                <div className='color-container'>
                    {color.length > 0 && color.map((el, index) => (
                        <div key={index}><p>{el}</p> <img width={24} onClick={() => delColor(index)} src={close} alt="" /></div>
                    ))}
                </div>
                <h3>Загрузите фото своего товара</h3>
                <div>
                    <div className="file-input-container">
                        <input id="file-input" className="file-input" type="file" onChange={(e) => {
                            e.preventDefault()
                            const file = e.target.files[0]
                            if (file && file.type.startsWith('image/')) {
                                const url = URL.createObjectURL(file)
                                setImg(url)
                                setAll(prev => [...prev, url])
                            }
                            else {
                                setImg('Такой тип файл не поддерживается')
                            }
                        }} />
                        <label htmlFor="file-input" className="file-input-label">Загрузите фото товара</label>
                    </div>

                </div>

                <h3>Загрузите фото товара детали</h3>


                <div className="file-input-container">
                    <input id="file-input" className="file-input" type="file" onChange={(e) => {
                        e.preventDefault()
                        const file = e.target.files[0]
                        if (file && file.type.startsWith('image/')) {
                            const url = URL.createObjectURL(file)
                            setIngrImg(url)
                            setIngredient(prev => [...prev, url])
                        }
                        else {
                            setIngrImg('Такой тип файл не поддерживается')
                        }
                    }} />
                    <label htmlFor="file-input" className="file-input-label">Загрузите фото товара</label>
                </div>
                <h3>Фото товара</h3>
                <div className='img-choose-file'>
                    {all.length > 0 && all.map((el, index) => (
                        <img key={index} src={el} />
                    ))}
                </div>
                <h3>Фото детали</h3>

                <div className='img-choose-file'>
                    {ingredient.length > 0 && ingredient.map((el, index) => (
                        <img key={index} src={el} />
                    ))}
                </div>
            </div>
            <button className={`send-button ${editCLass}`} onClick={sendPost}>post</button>
        </div>
    )
}

export default Form