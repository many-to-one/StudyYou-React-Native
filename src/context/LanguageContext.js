import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {

    const [Hours, setHours] = useState('')
    const [Minutes, setMinutes] = useState('')
    const [Visits, setVisits] = useState('')
    const [Publications, setPublications] = useState('')
    const [Films, setFilms] = useState('')
    const [Menu_, setMenu] = useState('')
    const [Events_, setEvents] = useState('')
    const [Profile_, setProfile] = useState('')
    const [Timer_, setTimer] = useState('')
    const [Result_, setResult] = useState('')
    const [History_, setHistory] = useState('')
    const [AddEvent_, setAddEvent] = useState('')
    const [UpdateEvent_, setUpdateEvent] = useState('')
    const [AllEvents_, setAllEvents] = useState('')
    const [Logout_, setLogout] = useState('')
    const [Changepassword_, setChangepassword] = useState('')
    const [dayNames, setDaynames] = useState([])
    const [monthNames, setMonthnames] = useState([])
    const [technicalSupport_, setTechnicalSupport] = useState([])
    const [ministryLeaders_, setMinistryLeaders] = useState([])
    const [midweekMeetings_, setMidweekMeetings] = useState([])
    const [weekendMeetings_, setWeekendMeetings] = useState([])
    const [leaderAndIntroductoryRemarks_, setLeaderAndIntroductoryRemarks] = useState([])
    const [firstPrayer_, setFirstPrayer] = useState([])
    const [treasuresFromGodsWord_, setTreasuresFromGodsWord] = useState([])
    const [spiritualGems_, setSpiritualGems] = useState([])


    const setLanguage = async() => {
        let lng = await AsyncStorage.getItem('language')
        if(lng === 'PL'){
            setHours('Godziny')
            setMinutes('Minuty')
            setVisits('Odwiedziny')
            setPublications('Publikacje')
            setFilms('Filmy')
            setMenu('Menu')
            setEvents('Wydarzenia')
            setProfile('Profil')
            setTimer('Tajmer')
            setResult('Wynik')
            setHistory('Historia')
            setAddEvent('Nowe Wydarzenia')
            setUpdateEvent('Edytuj wydarzenie')
            setAllEvents('Wszystkie wydarzenia')
            setLogout('Wyłoguj')
            setChangepassword('Zmienić hasło')
            setDaynames(['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'])
            setMonthnames(['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień  '])
            setTechnicalSupport('Obsługa Techniczna')
            setMinistryLeaders('Zbiórki')
            setMidweekMeetings('Spotkania w środku tygodnia')
            setWeekendMeetings('Spotkania na koniec tygodnia')
            setLeaderAndIntroductoryRemarks('Prowadzący i uwagi wstępne')
            setFirstPrayer('Początkowa modlitwa')
            setTreasuresFromGodsWord('Skarby ze słowa Bożego')
            setSpiritualGems('Duchowe Skarby')
        }else if(lng === 'RU'){
            setHours('Часы')
            setMinutes('Минуты')
            setVisits('Повторы')
            setPublications('Публикации')
            setFilms('Фильмы')
            setMenu('Меню')
            setEvents('События')
            setProfile('Профиль')
            setTimer('Таймер')
            setResult('Результат')
            setHistory('История')
            setAddEvent('Новое событие')
            setUpdateEvent('Редактировать событие')
            setAllEvents('Все события')
            setLogout('Выйти')
            setChangepassword('Изменить пароль')
            setTechnicalSupport('Техническая поддержка')
            setMinistryLeaders('Проповедническое служение')
            setMidweekMeetings('Встречи в середине недели')
            setWeekendMeetings('Встречи конца недели')
            setLeaderAndIntroductoryRemarks('Ведущий и вступление')
            setFirstPrayer('Первая молитва')
            setTreasuresFromGodsWord('Сокровища из Божьего слова')
            setSpiritualGems('Духовные жемчужины')
        }else if(lng === 'UA'){
            setHours('Години')
            setMinutes('Хвилини')
            setVisits('Повтори')
            setPublications('Публiкацiї')
            setFilms('Фiльми')
            setMenu('Меню')
            setEvents('Подiї')
            setProfile('Профiль')
            setTimer('Таймер')
            setResult('Результат')
            setHistory('Iсторiя')
            setAddEvent('Нова подiя')
            setUpdateEvent('Редагувати подiю')
            setAllEvents('Усi подiї')
            setLogout('Вийти')
            setChangepassword('Змiнити гасло')
            setTechnicalSupport('Технічна підтримка')
            setMinistryLeaders('Проповідницьке служіння')
            setMidweekMeetings('Зустрічі у середині тижня')
            setWeekendMeetings('Зустрічі кінця тижня')
            setLeaderAndIntroductoryRemarks('Ведучий і вступ')
            setFirstPrayer('Початкова молитва')
            setTreasuresFromGodsWord('Скарби з Божого слова')
            setSpiritualGems('Духовнi перлини')
        }
      };

      return(
   
        <LanguageContext.Provider value={{
            setLanguage,
            Hours,
            Minutes,
            Visits,
            Publications,
            Films,
            Menu_,
            Events_,
            Profile_,
            Timer_,
            Result_,
            History_,
            AddEvent_,
            UpdateEvent_,
            AllEvents_,
            Logout_,
            Changepassword_,
            dayNames,
            monthNames,
            technicalSupport_,
            ministryLeaders_,
            midweekMeetings_,
            weekendMeetings_,
            leaderAndIntroductoryRemarks_,
            firstPrayer_,
            treasuresFromGodsWord_,
            spiritualGems_,
        }}>
            {children}
        </LanguageContext.Provider>
    )


}